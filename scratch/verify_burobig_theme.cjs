const { spawn } = require('child_process');
const path = require('path');
const puppeteer = require('../../CoreWeb WEB PORTAL/node_modules/puppeteer');

const CWD = path.resolve(__dirname, '..');

async function run() {
  console.log('🚀 Starting local Vite dev server on port 5173...');
  
  const devServer = spawn('npx', ['vite', '--port', '5173', '--strictPort'], {
    cwd: CWD,
    shell: true
  });

  // Wait for the dev server to start
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('Vite dev server failed to start within 10 seconds.'));
    }, 10000);

    devServer.stdout.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Local:') || output.includes('localhost:5173') || output.includes('5173')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    devServer.stderr.on('data', (data) => {
      console.error('Stderr:', data.toString());
    });
  });

  console.log('✅ Vite dev server is running on port 5173.');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.toString());
  });

  let testPassed = true;

  try {
    // ----------------------------------------------------
    // TEST 1: Burobig custom theme renders on /burobig/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 1: Verifying Burobig customer route (/burobig/tr)...');
    await page.goto('http://localhost:5173/burobig/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000)); // wait for rendering

    const hasBurobigTheme = await page.evaluate(() => {
      return document.querySelector('.burobig-theme') !== null;
    });

    const isFallbackVisible = await page.evaluate(() => {
      return document.body.textContent.includes('CoreWeb Dünyasına Hoş Geldiniz');
    });

    const mainH1 = await page.evaluate(() => {
      const h1 = document.querySelector('.burobig-theme h1');
      return h1 ? h1.textContent.trim() : null;
    });

    const robotsMetaBurobig = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`- Theme Wrapper (.burobig-theme) Present: ${hasBurobigTheme ? '✅ YES' : '❌ NO'}`);
    console.log(`- Fallback "CoreWeb Dünyasına Hoş Geldiniz" Hidden: ${!isFallbackVisible ? '✅ YES' : '❌ NO (Found fallback text!)'}`);
    console.log(`- Main H1 Heading: "${mainH1}"`);
    console.log(`- Robots Meta tag (Staging noindex): "${robotsMetaBurobig}"`);

    if (!hasBurobigTheme || isFallbackVisible || !mainH1 || !mainH1.includes('İnka') || !robotsMetaBurobig || !robotsMetaBurobig.includes('noindex')) {
      console.error('❌ TEST 1 FAILED!');
      testPassed = false;
    } else {
      console.log('✅ TEST 1 PASSED.');
    }

    // ----------------------------------------------------
    // TEST 2: CoreWeb template remains generic on /coreweb/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 2: Verifying CoreWeb route (/coreweb/tr) for regression...');
    await page.goto('http://localhost:5173/coreweb/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    const corewebHasBurobigTheme = await page.evaluate(() => {
      return document.querySelector('.burobig-theme') !== null;
    });

    const corewebHasGenericContent = await page.evaluate(() => {
      return document.body.textContent.includes('Biz Kimiz?');
    });

    const robotsMetaCoreweb = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`- Theme Wrapper (.burobig-theme) Absent: ${!corewebHasBurobigTheme ? '✅ YES' : '❌ NO (Burobig theme leaked to CoreWeb!)'}`);
    console.log(`- Generic "Biz Kimiz?" Section Present: ${corewebHasGenericContent ? '✅ YES' : '❌ NO (CoreWeb generic layout lost!)'}`);
    console.log(`- Robots Meta (CoreWeb should be indexable): "${robotsMetaCoreweb}"`);

    if (corewebHasBurobigTheme || !corewebHasGenericContent || (robotsMetaCoreweb && robotsMetaCoreweb.includes('noindex'))) {
      console.error('❌ TEST 2 FAILED!');
      testPassed = false;
    } else {
      console.log('✅ TEST 2 PASSED.');
    }

    // ----------------------------------------------------
    // TEST 3: Capilon template remains placeholder on /capilon/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 3: Verifying Capilon route (/capilon/tr)...');
    await page.goto('http://localhost:5173/capilon/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    const capilonHasBurobigTheme = await page.evaluate(() => {
      return document.querySelector('.burobig-theme') !== null;
    });

    const robotsMetaCapilon = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`- Burobig Theme wrapper absent on Capilon: ${!capilonHasBurobigTheme ? '✅ YES' : '❌ NO (Burobig theme leaked to Capilon!)'}`);
    console.log(`- Robots Meta tag (Staging noindex): "${robotsMetaCapilon}"`);

    if (capilonHasBurobigTheme || !robotsMetaCapilon || !robotsMetaCapilon.includes('noindex')) {
      console.error('❌ TEST 3 FAILED!');
      testPassed = false;
    } else {
      console.log('✅ TEST 3 PASSED.');
    }

    // ----------------------------------------------------
    // TEST 4: Checking Console errors
    // ----------------------------------------------------
    console.log('\n🔍 TEST 4: Checking Console errors & React crashes...');
    console.log(`- Captured Console Errors count: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.error('Captured errors:', consoleErrors);
      testPassed = false;
      console.error('❌ TEST 4 FAILED!');
    } else {
      console.log('✅ TEST 4 PASSED.');
    }

  } catch (err) {
    console.error('❌ Smoke test failed with error:', err);
    testPassed = false;
  } finally {
    console.log('\n🔌 Shutting down Puppeteer browser...');
    await browser.close();

    console.log('🔌 Terminating local dev server...');
    devServer.kill('SIGINT');
    
    if (testPassed) {
      console.log('\n🎉 ALL SMOKE TESTS COMPLETED SUCCESSFULLY!');
      process.exit(0);
    } else {
      console.error('\n❌ SOME SMOKE TESTS FAILED!');
      process.exit(1);
    }
  }
}

run();
