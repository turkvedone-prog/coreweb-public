import test, { describe, before, after } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { initializeTestEnvironment, assertSucceeds, assertFails } from '@firebase/rules-unit-testing';
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const PROJECT_ID = 'coreweb-panel';

describe('Firestore Security Rules Integration Tests', () => {
  let testEnv;

  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: '127.0.0.1',
        port: 8080,
        rules: fs.readFileSync('firestore.rules', 'utf8')
      }
    });

    // Seed mock data bypass rules
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();

      // Seed Site Mappings
      await setDoc(doc(adminDb, 'siteMappings', 'TEN-A'), {
        status: 'active',
        publishStatus: 'published',
        isStaging: false,
        tenantId: 'TEN-A',
        tenantSlug: 'viola'
      });
      await setDoc(doc(adminDb, 'siteMappings', 'TEN-B'), {
        status: 'active',
        publishStatus: 'preview',
        isStaging: true,
        tenantId: 'TEN-B',
        tenantSlug: 'capilon'
      });
      await setDoc(doc(adminDb, 'siteMappings', 'TEN-C'), {
        status: 'passive',
        publishStatus: 'draft',
        isStaging: false,
        tenantId: 'TEN-C',
        tenantSlug: 'passive-tenant'
      });

      // Seed User Profiles
      await setDoc(doc(adminDb, 'users', 'uid_super'), {
        role: 'super_admin',
        isSuperAdmin: true,
        status: 'active'
      });
      await setDoc(doc(adminDb, 'users', 'uid_tenant_a_admin'), {
        role: 'tenant_admin',
        tenantId: 'TEN-A',
        tenantSlug: 'viola',
        status: 'active'
      });
      await setDoc(doc(adminDb, 'users', 'uid_tenant_a_editor'), {
        role: 'tenant_editor',
        tenantId: 'TEN-A',
        tenantSlug: 'viola',
        status: 'active'
      });
      await setDoc(doc(adminDb, 'users', 'uid_tenant_a_viewer'), {
        role: 'tenant_viewer',
        tenantId: 'TEN-A',
        tenantSlug: 'viola',
        status: 'active'
      });
      await setDoc(doc(adminDb, 'users', 'uid_tenant_b_admin'), {
        role: 'tenant_admin',
        tenantId: 'TEN-B',
        tenantSlug: 'capilon',
        status: 'active'
      });

      // Seed Tenants
      await setDoc(doc(adminDb, 'tenants', 'TEN-A'), {
        tenantId: 'TEN-A',
        tenantSlug: 'viola',
        status: 'active',
        defaultLanguage: 'tr'
      });
      await setDoc(doc(adminDb, 'tenants', 'TEN-B'), {
        tenantId: 'TEN-B',
        tenantSlug: 'capilon',
        status: 'active',
        defaultLanguage: 'tr'
      });

      // Seed Subcollection Data
      await setDoc(doc(adminDb, 'tenants/TEN-A/sliders', 'slider_active'), {
        status: 'active',
        title: 'Active Slider'
      });
      await setDoc(doc(adminDb, 'tenants/TEN-A/sliders', 'slider_passive'), {
        status: 'passive',
        title: 'Passive Slider'
      });
    });
  });

  after(async () => {
    if (testEnv) {
      await testEnv.cleanup();
    }
  });

  // 1. Super Admin access
  test('1. Super Admin can read and write to all tenant and siteMappings documents', async () => {
    const db = testEnv.authenticatedContext('uid_super').firestore();
    
    // Read siteMappings & tenants
    await assertSucceeds(getDoc(doc(db, 'siteMappings/TEN-A')));
    await assertSucceeds(getDoc(doc(db, 'tenants/TEN-B')));

    // Write to siteMappings
    await assertSucceeds(setDoc(doc(db, 'siteMappings/TEN-NEW'), {
      status: 'active',
      publishStatus: 'published',
      isStaging: false,
      tenantId: 'TEN-NEW',
      tenantSlug: 'new'
    }));

    // Write to tenants
    await assertSucceeds(setDoc(doc(db, 'tenants/TEN-A'), {
      tenantId: 'TEN-A',
      tenantSlug: 'viola',
      status: 'active',
      defaultLanguage: 'en'
    }));
  });

  // 2. Tenant Admin own path write
  test('2. Tenant Admin can write to their own tenantId path', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_a_admin').firestore();
    
    // Write in own subcollection
    await assertSucceeds(setDoc(doc(db, 'tenants/TEN-A/sliders/slider_new'), {
      status: 'active',
      title: 'New Tenant A Slider'
    }));

    // Update own tenant configuration (non-restricted field)
    await assertSucceeds(updateDoc(doc(db, 'tenants/TEN-A'), {
      defaultLanguage: 'en'
    }));
  });

  // 3. Tenant Admin cross-tenant write
  test('3. Tenant Admin cannot write to another tenant path', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_a_admin').firestore();

    // Try writing in tenant B subcollection
    await assertFails(setDoc(doc(db, 'tenants/TEN-B/sliders/slider_malicious'), {
      status: 'active',
      title: 'Malicious Slider'
    }));
  });

  // 4. Tenant Editor allowed write
  test('4. Tenant Editor can write only to allowed content collections', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_a_editor').firestore();

    // Write to sliders (allowed)
    await assertSucceeds(setDoc(doc(db, 'tenants/TEN-A/sliders/slider_editor'), {
      status: 'active',
      title: 'Editor Slider'
    }));
  });

  // 5. Tenant Editor sensitive tenant document update
  test('5. Tenant Editor cannot update any fields on main tenant document', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_a_editor').firestore();

    // Try updating tenant config
    await assertFails(updateDoc(doc(db, 'tenants/TEN-A'), {
      defaultLanguage: 'de'
    }));
  });

  // 6. Tenant Viewer read/write
  test('6. Tenant Viewer can read their own tenant data but cannot write', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_a_viewer').firestore();

    // Read allowed
    await assertSucceeds(getDoc(doc(db, 'tenants/TEN-A')));

    // Write denied
    await assertFails(setDoc(doc(db, 'tenants/TEN-A/sliders/slider_viewer'), {
      status: 'active',
      title: 'Viewer Slider'
    }));
  });

  // 7. Anonymous visitor read active/published
  test('7. Anonymous user can read active/published public content', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    // Read active slider on active/published tenant (TEN-A)
    await assertSucceeds(getDoc(doc(db, 'tenants/TEN-A/sliders/slider_active')));
  });

  // 8. Anonymous visitor read draft/passive
  test('8. Anonymous user cannot read draft/passive/hidden content', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    // Read passive slider
    await assertFails(getDoc(doc(db, 'tenants/TEN-A/sliders/slider_passive')));
  });

  // 9. Cross-tenant write attack
  test('9. Cross-tenant write attempt returns PERMISSION_DENIED', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_b_admin').firestore();

    // Tenant B admin trying to write into Tenant A
    await assertFails(setDoc(doc(db, 'tenants/TEN-A/sliders/slider_attack'), {
      status: 'active',
      title: 'Cross Tenant Attack'
    }));
  });

  // 10. Cross-tenant protected read attack
  test('10. Cross-tenant protected read attempt returns PERMISSION_DENIED', async () => {
    const db = testEnv.authenticatedContext('uid_tenant_b_admin').firestore();

    // Tenant B admin trying to read Tenant A's private admin profile
    await assertFails(getDoc(doc(db, 'users/uid_tenant_a_admin')));
  });
});
