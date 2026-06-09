const puppeteer = require('../CoreWeb WEB PORTAL/node_modules/puppeteer');
const path = require('path');

async function run() {
  console.log('🚀 Launching Puppeteer browser to verify Burobig subdomain (burobig.coreweb.tr)...');
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

  const url = 'https://burobig.coreweb.tr/tr';
  console.log(` Visiting customer subdomain URL: ${url}`);
  
  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 2000)); // Allow rendering/settle

    const pageTitle = await page.title();
    console.log(`\n📌 [Verification] Page Title: "${pageTitle}"`);
    
    // Get headers or section elements to verify it resolved Burobig
    const mainHeading = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? h1.textContent.trim() : 'No H1 found';
    });
    console.log(`📌 [Verification] Main H1: "${mainHeading}"`);

    console.log(`📌 [Verification] Console Errors:`, consoleErrors);
    
    const screenshotPath = path.resolve(__dirname, 'verify_burobig_preview.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`📸 Screenshot saved to: ${screenshotPath}`);

  } catch (err) {
    console.error('❌ Verification failed with exception:', err);
  } finally {
    await browser.close();
  }
}

run();
