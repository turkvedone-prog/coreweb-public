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
    // TEST 1: Capilon custom theme renders on /capilon/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 1: Verifying Capilon customer route (/capilon/tr)...');
    await page.goto('http://localhost:5173/capilon/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000)); // wait for rendering

    const hasCapilonTheme = await page.evaluate(() => {
      return document.querySelector('.capilon-theme') !== null;
    });

    const isFallbackVisible = await page.evaluate(() => {
      return document.body.textContent.includes('CoreWeb Dünyasına Hoş Geldiniz');
    });

    const mainH1 = await page.evaluate(() => {
      const h1 = document.querySelector('.capilon-theme h1');
      return h1 ? h1.textContent.trim() : null;
    });

    const pageTitle = await page.title();

    const robotsMetaCapilon = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    const assetStatus = await page.evaluate(async () => {
      const img = document.querySelector('.logo__img');
      if (!img) return 'No logo found';
      try {
        const res = await fetch(img.src, { method: 'HEAD' });
        return res.status === 200 ? '200 OK' : `Status: ${res.status}`;
      } catch (e) {
        return `Failed: ${e.message}`;
      }
    });

    console.log(`- Theme Wrapper (.capilon-theme) Present: ${hasCapilonTheme ? '✅ YES' : '❌ NO'}`);
    console.log(`- Fallback "CoreWeb Dünyasına Hoş Geldiniz" Hidden: ${!isFallbackVisible ? '✅ YES' : '❌ NO (Found fallback text!)'}`);
    console.log(`- Main H1 Heading: "${mainH1}"`);
    console.log(`- Page Title: "${pageTitle}"`);
    console.log(`- Robots Meta tag (Staging noindex): "${robotsMetaCapilon}"`);
    console.log(`- Logo Asset Loading Status (/assets/capilon/...): "${assetStatus}"`);

    if (!hasCapilonTheme || isFallbackVisible || !mainH1 || !mainH1.includes('Zamanın Ötesinde') || !pageTitle.includes('Capilon') || !robotsMetaCapilon || !robotsMetaCapilon.includes('noindex') || assetStatus !== '200 OK') {
      console.error('❌ TEST 1 FAILED!');
      testPassed = false;
    } else {
      console.log('✅ TEST 1 PASSED.');
    }

    // ----------------------------------------------------
    // TEST 2: Burobig custom theme renders correctly on /burobig/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 2: Verifying Burobig route (/burobig/tr) for regression...');
    await page.goto('http://localhost:5173/burobig/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    const hasBurobigTheme = await page.evaluate(() => {
      return document.querySelector('.burobig-theme') !== null;
    });

    const capilonThemeLeakedToBurobig = await page.evaluate(() => {
      return document.querySelector('.capilon-theme') !== null;
    });

    const burobigMainH1 = await page.evaluate(() => {
      const h1 = document.querySelector('.burobig-theme h1');
      return h1 ? h1.textContent.trim() : null;
    });

    console.log(`- Burobig Theme Wrapper (.burobig-theme) Present: ${hasBurobigTheme ? '✅ YES' : '❌ NO'}`);
    console.log(`- Capilon CSS sızıntısı yok (.capilon-theme absent): ${!capilonThemeLeakedToBurobig ? '✅ YES' : '❌ NO'}`);
    console.log(`- Burobig Main H1: "${burobigMainH1}"`);

    if (!hasBurobigTheme || capilonThemeLeakedToBurobig || !burobigMainH1 || !burobigMainH1.includes('İnka')) {
      console.error('❌ TEST 2 FAILED!');
      testPassed = false;
    } else {
      console.log('✅ TEST 2 PASSED.');
    }

    // ----------------------------------------------------
    // TEST 3: CoreWeb template remains generic on /coreweb/tr
    // ----------------------------------------------------
    console.log('\n🔍 TEST 3: Verifying CoreWeb route (/coreweb/tr) for regression...');
    await page.goto('http://localhost:5173/coreweb/tr', { waitUntil: 'networkidle2', timeout: 10000 });
    await new Promise(r => setTimeout(r, 1000));

    const corewebHasCapilonTheme = await page.evaluate(() => {
      return document.querySelector('.capilon-theme') !== null;
    });

    const corewebHasGenericContent = await page.evaluate(() => {
      return document.body.textContent.includes('Biz Kimiz?');
    });

    const robotsMetaCoreweb = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="robots"]');
      return meta ? meta.getAttribute('content') : null;
    });

    console.log(`- Theme Wrapper (.capilon-theme) Absent: ${!corewebHasCapilonTheme ? '✅ YES' : '❌ NO (Capilon theme leaked to CoreWeb!)'}`);
    console.log(`- Generic "Biz Kimiz?" Section Present: ${corewebHasGenericContent ? '✅ YES' : '❌ NO (CoreWeb generic layout lost!)'}`);
    console.log(`- Robots Meta (CoreWeb should be indexable): "${robotsMetaCoreweb}"`);

    if (corewebHasCapilonTheme || !corewebHasGenericContent || (robotsMetaCoreweb && robotsMetaCoreweb.includes('noindex'))) {
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
