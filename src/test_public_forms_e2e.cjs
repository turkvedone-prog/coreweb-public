const { spawn } = require('child_process');
const http = require('http');
const puppeteer = require('../../CoreWeb WEB PORTAL/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');
const admin = require('../../CoreWeb WEB PORTAL/functions/node_modules/firebase-admin');

const PORT = 5188;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOT_DIR = path.resolve(__dirname, 'screenshots/public_forms');
const RESULTS_FILE = path.resolve(__dirname, 'smoke_public_forms_results.json');

// Ensure screenshot directory exists
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Initialize Admin SDK to seed data (it bypasses rules)
try {
  admin.initializeApp({
    projectId: 'coreweb-panel'
  });
} catch (err) {
  // ignore if already initialized
}
const adminDb = admin.firestore();

let devServerProcess = null;
const consoleErrors = [];
const consoleWarnings = [];
let overallStatus = 'SUCCESS';
const testResults = [];

function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log(`🚀 Spawning Vite dev server on port ${PORT}...`);
    devServerProcess = spawn('npx', ['vite', '--port', PORT.toString()], {
      cwd: path.resolve(__dirname, '../'),
      stdio: 'pipe',
      shell: true
    });

    devServerProcess.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('ready in')) {
        resolve();
      }
    });

    devServerProcess.stderr.on('data', (data) => {
      console.error(`[Vite Error] ${data.toString()}`);
    });

    devServerProcess.on('error', (err) => {
      reject(err);
    });

    // Timeout fallback after 10s
    setTimeout(resolve, 10000);
  });
}

function stopDevServer() {
  if (devServerProcess) {
    console.log('🔌 Killing Vite dev server...');
    devServerProcess.kill();
  }
}

function setupConsoleTracker(page, pageName) {
  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    
    if (type === 'warning' || type === 'warn') {
      consoleWarnings.push({ page: pageName, text, url: page.url() });
      return;
    }

    const lowerText = text.toLowerCase();
    const isPermissionError = lowerText.includes('permission-denied') || 
                              lowerText.includes('missing or insufficient permissions') ||
                              lowerText.includes('permission_denied');
    const isJsError = lowerText.includes('referenceerror') || 
                      lowerText.includes('typeerror') || 
                      lowerText.includes('unhandled promise rejection') ||
                      lowerText.includes('unhandledrejection') ||
                      lowerText.includes('react crash');

    if (isPermissionError || isJsError || type === 'error') {
      consoleErrors.push({
        page: pageName,
        type: (isPermissionError || isJsError) ? 'CRITICAL_ERROR' : 'CONSOLE_ERROR',
        text,
        url: page.url(),
        isPermissionError,
        isJsError,
        isCritical: isPermissionError || isJsError
      });
      
      if (isPermissionError || isJsError) {
        overallStatus = 'FAILED';
      }
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push({
      page: pageName,
      type: 'JS_EXCEPTION',
      text: err.toString(),
      url: page.url(),
      isJsError: true,
      isCritical: true
    });
    overallStatus = 'FAILED';
  });
}

async function seedTestData() {
  console.log('🌱 Seeding Firestore emulator with tenant & siteMapping data...');
  
  // Seed tenant document
  await adminDb.collection('tenants').doc('TEN-243').set({
    tenantId: 'TEN-243',
    tenantSlug: 'kreatiffikirler',
    customerId: 'CUST-3111',
    formApiStatus: true,
    publishStatus: 'yayinda',
    recaptchaStatus: true
  });

  // Seed siteMapping
  await adminDb.collection('siteMappings').doc('TEN-243').set({
    tenantId: 'TEN-243',
    tenantSlug: 'kreatiffikirler',
    status: 'active',
    publishStatus: 'published',
    defaultLanguage: 'tr',
    enabledLanguages: ['tr'],
    themeKey: 'default',
    subdomain: 'kreatiffikirler.coreweb.tr',
    customDomain: null
  });

  // Seed settings/company
  await adminDb.doc('tenants/TEN-243/settings/company').set({
    companyName: 'Kreatif Fikirler',
    contact: {
      phone: '+90 216 555 55 55',
      email: 'info@kreatiffikirler.com',
      address: 'Moda, Kadıköy, İstanbul'
    },
    workingHours: {
      weekdays: '09:00 - 18:00',
      saturday: '10:00 - 15:00',
      sunday: 'Kapalı'
    }
  });

  // Seed navigation menu
  await adminDb.doc('tenants/TEN-243/navigation/header_tr').set({
    tenantId: 'TEN-243',
    location: 'header',
    lang: 'tr',
    items: [
      { title: 'Anasayfa', targetUrl: '/' },
      { title: 'Ürünler', targetUrl: '/urunler' },
      { title: 'İletişim', targetUrl: '/iletisim' }
    ]
  });

  console.log('✅ Seeding completed.');
}

async function cleanupTestData() {
  console.log('🧹 Cleaning up test leads and subscribers in emulator...');
  try {
    // Delete leads
    const leadsSnap = await adminDb.collection('tenants').doc('TEN-243').collection('leads').get();
    const batch = adminDb.batch();
    leadsSnap.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    // Delete subscribers
    const subsSnap = await adminDb.collection('tenants').doc('TEN-243').collection('subscribers').get();
    const subBatch = adminDb.batch();
    subsSnap.forEach(doc => subBatch.delete(doc.ref));
    await subBatch.commit();

    // Delete securityRateLimits
    const limSnap = await adminDb.collection('securityRateLimits').get();
    const limBatch = adminDb.batch();
    limSnap.forEach(doc => limBatch.delete(doc.ref));
    await limBatch.commit();
  } catch (err) {
    console.error('Cleanup failed:', err);
  }
}

async function run() {
  const startTime = Date.now();
  console.log('\n========================================================================');
  console.log('🧪 COREWEB PUBLIC APP - FAZ 9.2C PUBLIC FORMS E2E INTEGRATION TEST');
  console.log('========================================================================');

  try {
    // 1. Seed
    await seedTestData();
    await cleanupTestData();

    // 2. Spawn Vite
    await startDevServer();
    
    // 3. Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      setupConsoleTracker(page, 'Iletisim');

      // Test Case 1: Load Page & Info Checks
      console.log('🧪 [Test 1] Loading contact page...');
      await page.goto(`${BASE_URL}/kreatiffikirler/tr/iletisim`, { waitUntil: 'networkidle2', timeout: 15000 });
      await new Promise(r => setTimeout(r, 2000));
      
      const content = await page.content();
      const hasPhone = content.includes('+90 216 555 55 55');
      const hasEmail = content.includes('info@kreatiffikirler.com');
      const hasAddress = content.includes('Moda, Kadıköy, İstanbul');
      const hasDevWidget = content.includes('🔧 Local Emulator Test Paneli');

      if (hasPhone && hasEmail && hasAddress && hasDevWidget) {
        console.log('   ✅ PASSED: Details loaded, developer widget is visible in DEV mode.');
        testResults.push({ name: 'Page Load & Dev Widget', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Missing contact details or dev tools widget.');
        testResults.push({ name: 'Page Load & Dev Widget', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 2: Validate client-side error (email missing format)
      console.log('🧪 [Test 2] Submitting with invalid email format...');
      await page.type('input[name="name"]', 'Test Kullanıcı');
      await page.type('input[name="email"]', 'invalidemail');
      await page.type('input[name="phone"]', '1234567');
      await page.type('textarea[name="message"]', 'Merhaba bu bir test mesajıdır.');
      
      // Attempt click while checkbox is not clicked
      const isButtonDisabled = await page.$eval('button[type="submit"]', btn => btn.disabled);
      if (isButtonDisabled) {
        console.log('   ✅ PASSED: Submit button is disabled before consent checkbox is checked.');
        testResults.push({ name: 'Consent check gating', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Submit button is active without consent check.');
        testResults.push({ name: 'Consent check gating', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Click consent
      await page.click('.form-checkbox-container');
      await new Promise(r => setTimeout(r, 200));

      // Click submit (should trigger client-side validation for invalid email)
      await page.click('button[type="submit"]');
      await new Promise(r => setTimeout(r, 500));

      const hasEmailValidationError = await page.evaluate(() => {
        const alert = document.querySelector('.form-alert-error');
        return alert ? alert.textContent.includes('Geçersiz e-posta formatı') : false;
      });

      if (hasEmailValidationError) {
        console.log('   ✅ PASSED: Caught invalid email format validation.');
        testResults.push({ name: 'Email format validation', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Invalid email did not trigger alert.');
        testResults.push({ name: 'Email format validation', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Clear and input valid email
      await page.click('input[name="email"]', { clickCount: 3 });
      await page.keyboard.press('Backspace');
      await page.type('input[name="email"]', 'test@mail.com');

      // Test Case 3: Successful Contact form submission (mock-pass)
      console.log('🧪 [Test 3] Submitting contact form (mock-pass reCAPTCHA)...');
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_before_submit.png') });
      await page.click('button[type="submit"]');
      
      // Wait for success screen
      await page.waitForFunction(
        () => document.body.textContent.includes('Talebiniz başarıyla alındı.'),
        { timeout: 10000 }
      );
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_after_submit_success.png') });

      const formSuccessText = await page.evaluate(() => {
        return document.body.textContent;
      });
      const hasSuccessText = formSuccessText.includes('Talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.');

      if (hasSuccessText) {
        console.log('   ✅ PASSED: Form submitted successfully, success view shown.');
        testResults.push({ name: 'Contact Form Success Submission', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Form submission did not show success message.');
        testResults.push({ name: 'Contact Form Success Submission', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Verify lead document in Firestore Emulator
      const leads = await adminDb.collection('tenants').doc('TEN-243').collection('leads').get();
      if (leads.size === 1) {
        const lead = leads.docs[0].data();
        console.log(`   ✅ PASSED: Document successfully written to emulator Firestore.`);
        console.log(`      Written lead details: name="${lead.name}", email="${lead.email}", type="${lead.type}"`);
        testResults.push({ name: 'Firestore Emulator Lead Write', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Lead document missing from Firestore.');
        testResults.push({ name: 'Firestore Emulator Lead Write', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 4: Newsletter Subscriber success
      console.log('🧪 [Test 4] Testing bülten / newsletter subscription...');
      await page.goto(`${BASE_URL}/kreatiffikirler/tr/`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1500));
      
      await page.type('input[placeholder="E-posta adresiniz"]', 'sub@mail.com');
      // Click consent in footer
      await page.evaluate(() => {
        const checkbox = document.querySelector('footer input[type="checkbox"]');
        if (checkbox) checkbox.parentElement.click();
      });
      await new Promise(r => setTimeout(r, 200));

      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_footer_before_sub.png') });
      await page.click('footer button[type="submit"]');
      await page.waitForFunction(
        () => document.querySelector('footer').textContent.includes('Bülten aboneliğiniz başarıyla oluşturuldu.'),
        { timeout: 10000 }
      );
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_footer_after_sub_success.png') });

      const footerText = await page.evaluate(() => {
        return document.querySelector('footer').textContent;
      });
      const hasSubSuccessText = footerText.includes('Bülten aboneliğiniz başarıyla oluşturuldu.');

      if (hasSubSuccessText) {
        console.log('   ✅ PASSED: Newsletter form submitted successfully, success view shown.');
        testResults.push({ name: 'Newsletter Form Success Submission', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Newsletter submission did not show success message.');
        testResults.push({ name: 'Newsletter Form Success Submission', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Verify subscriber in Firestore Emulator
      const subscribers = await adminDb.collection('tenants').doc('TEN-243').collection('subscribers').get();
      if (subscribers.size === 1) {
        const sub = subscribers.docs[0].data();
        console.log(`   ✅ PASSED: Subscriber successfully written to emulator Firestore.`);
        console.log(`      Written subscriber details: email="${sub.email}", status="${sub.status}"`);
        testResults.push({ name: 'Firestore Emulator Subscriber Write', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Subscriber document missing from Firestore.');
        testResults.push({ name: 'Firestore Emulator Subscriber Write', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 5: Duplicate subscriber check
      console.log('🧪 [Test 5] Testing duplicate newsletter subscription...');
      // Click reset in bülten form to test duplicate
      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('footer button'));
        const resetBtn = btns.find(b => b.textContent.includes('Tekrarla') || b.textContent.includes('Reset'));
        if (resetBtn) resetBtn.click();
      });
      await new Promise(r => setTimeout(r, 500));

      await page.type('input[placeholder="E-posta adresiniz"]', 'sub@mail.com');
      // Click consent in footer again
      await page.evaluate(() => {
        const checkbox = document.querySelector('footer input[type="checkbox"]');
        if (checkbox) checkbox.parentElement.click();
      });
      await new Promise(r => setTimeout(r, 200));
      await page.click('footer button[type="submit"]');
      await page.waitForFunction(
        () => document.querySelector('footer').textContent.includes('Bu e-posta adresi zaten bülten listemizde kayıtlı.'),
        { timeout: 10000 }
      );

      const footerTextDup = await page.evaluate(() => {
        return document.querySelector('footer').textContent;
      });
      const hasSubDupText = footerTextDup.includes('Bu e-posta adresi zaten bülten listemizde kayıtlı.');

      if (hasSubDupText) {
        console.log('   ✅ PASSED: Newsletter correctly reports duplicate email registration.');
        testResults.push({ name: 'Newsletter Duplicate Check', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Duplicate email was not blocked or message was wrong.');
        testResults.push({ name: 'Newsletter Duplicate Check', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 6: Dev widget mock-low-score token test
      console.log('🧪 [Test 6] Testing low score reCAPTCHA token block (mock-low-score)...');
      await page.goto(`${BASE_URL}/kreatiffikirler/tr/iletisim`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1000));

      // Click low score token button in Dev tools
      await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('.mock-recaptcha-btn'));
        const lowScoreBtn = buttons.find(b => b.textContent.includes('mock-low-score'));
        if (lowScoreBtn) lowScoreBtn.click();
      });
      await new Promise(r => setTimeout(r, 200));

      // Fill form
      await page.type('input[name="name"]', 'Spammer Bot');
      await page.type('input[name="email"]', 'spam@mail.com');
      await page.type('input[name="phone"]', '123456');
      await page.click('.form-checkbox-container');
      await new Promise(r => setTimeout(r, 200));
      await page.click('button[type="submit"]');
      await page.waitForFunction(
        () => document.body.textContent.includes('Güvenlik doğrulaması (reCAPTCHA) başarısız oldu'),
        { timeout: 10000 }
      );
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_low_score_submit.png') });

      const contentLow = await page.content();
      const hasLowScoreError = contentLow.includes('Güvenlik doğrulaması (reCAPTCHA) başarısız oldu');

      if (hasLowScoreError) {
        console.log('   ✅ PASSED: reCAPTCHA low score block error successfully shown.');
        testResults.push({ name: 'reCAPTCHA low-score gating', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Form succeeded or displayed wrong error on low-score token.');
        testResults.push({ name: 'reCAPTCHA low-score gating', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 7: Honeypot Trip test
      console.log('🧪 [Test 7] Testing honeypot trip check...');
      await page.goto(`${BASE_URL}/kreatiffikirler/tr/iletisim`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1000));

      // Check honeypot box in Dev tools
      await page.evaluate(() => {
        const checkbox = document.querySelector('.mock-honeypot-checkbox input');
        if (checkbox) checkbox.parentElement.click();
      });
      await new Promise(r => setTimeout(r, 200));

      // Fill form
      await page.type('input[name="name"]', 'Bot Attack');
      await page.type('input[name="email"]', 'bot@mail.com');
      await page.type('input[name="phone"]', '123456');
      await page.click('.form-checkbox-container');
      await new Promise(r => setTimeout(r, 200));
      await page.click('button[type="submit"]');
      await page.waitForFunction(
        () => document.body.textContent.includes('İstek spam filtresine takıldı'),
        { timeout: 10000 }
      );
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_honeypot_trip_submit.png') });

      const contentHoney = await page.content();
      const hasHoneyError = contentHoney.includes('İstek spam filtresine takıldı');

      if (hasHoneyError) {
        console.log('   ✅ PASSED: Honeypot attack blocked and error successfully shown.');
        testResults.push({ name: 'Honeypot protection gating', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Form succeeded or displayed wrong error on honeypot filled.');
        testResults.push({ name: 'Honeypot protection gating', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

      // Test Case 8: Rate Limit 429 check
      console.log('🧪 [Test 8] Testing hourly submit limit (Rate Limiting)...');
      // Clear securityRateLimits collection to make the test independent
      try {
        const limSnap = await adminDb.collection('securityRateLimits').get();
        const limBatch = adminDb.batch();
        limSnap.forEach(doc => limBatch.delete(doc.ref));
        await limBatch.commit();
        console.log('   🧹 Cleared securityRateLimits for Test 8.');
      } catch (err) {
        console.warn('   ⚠️ Failed to clear securityRateLimits:', err.message);
      }
      
      // Submitting 5 times from same IP.
      for (let i = 0; i < 5; i++) {
        await page.goto(`${BASE_URL}/kreatiffikirler/tr/iletisim`, { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 800));
        await page.type('input[name="name"]', `Limit test ${i}`);
        await page.type('input[name="email"]', `limit_${i}@mail.com`);
        await page.type('input[name="phone"]', `1234567_${i}`);
        await page.click('.form-checkbox-container');
        await page.click('button[type="submit"]');
        await page.waitForFunction(
          () => document.body.textContent.includes('Talebiniz başarıyla alındı.'),
          { timeout: 10000 }
        );
        await new Promise(r => setTimeout(r, 500));
      }

      // 6th submission: should return 429 Too Many Requests
      await page.goto(`${BASE_URL}/kreatiffikirler/tr/iletisim`, { waitUntil: 'networkidle2' });
      await new Promise(r => setTimeout(r, 1000));
      await page.type('input[name="name"]', 'Blocked Limit User');
      await page.type('input[name="email"]', 'blocked@mail.com');
      await page.type('input[name="phone"]', '1234567');
      await page.click('.form-checkbox-container');
      await new Promise(r => setTimeout(r, 200));
      await page.click('button[type="submit"]');
      await page.waitForFunction(
        () => document.body.textContent.includes('Çok fazla istek gönderdiniz'),
        { timeout: 10000 }
      );
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_rate_limit_blocked.png') });

      const contentLimit = await page.content();
      const hasLimitError = contentLimit.includes('Çok fazla istek gönderdiniz');

      if (hasLimitError) {
        console.log('   ✅ PASSED: Rate limit block error successfully shown after 5 successful submits.');
        testResults.push({ name: 'Rate limit gating', status: 'PASSED' });
      } else {
        console.log('   ❌ FAILED: Form succeeded or displayed wrong error after limit exceeded.');
        testResults.push({ name: 'Rate limit gating', status: 'FAILED' });
        overallStatus = 'FAILED';
      }

    } finally {
      await browser.close();
    }
  } catch (err) {
    console.error('❌ E2E test execution failed with error:', err);
    overallStatus = 'FAILED';
  } finally {
    stopDevServer();
    await cleanupTestData();
  }

  const duration = Date.now() - startTime;
  console.log('\n========================================================================');
  console.log(`🏁 PUBLIC FORMS INTEGRATION TEST COMPLETED. OVERALL STATUS: ${overallStatus}`);
  console.log(`Duration: ${Math.round(duration / 1000)}s`);
  console.log('========================================================================');

  const resultsData = {
    timestamp: new Date().toISOString(),
    overall_status: overallStatus,
    duration_ms: duration,
    test_results: testResults,
    console_errors: consoleErrors,
    console_warnings: consoleWarnings
  };

  fs.writeFileSync(RESULTS_FILE, JSON.stringify(resultsData, null, 2));
  console.log(`Test results written to: ${RESULTS_FILE}`);

  if (overallStatus === 'FAILED') {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

run();
