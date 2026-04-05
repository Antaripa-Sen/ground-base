import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER_ERROR:', error));
  
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
  
  const declareBtn = await page.$('button');
  if (declareBtn) {
    await declareBtn.click();
    await new Promise(r => setTimeout(r, 2000));
  } else {
    // Try to find by text
    const elements = await page.$$('button');
    for (const el of elements) {
      const text = await page.evaluate(e => e.textContent, el);
      if (text.includes('DECLARE')) {
        await el.click();
        await new Promise(r => setTimeout(r, 2000));
        break;
      }
    }
  }
  
  await browser.close();
})();
