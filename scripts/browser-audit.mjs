import { chromium } from 'playwright';

const baseUrl = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173';
const browser = await chromium.launch({ headless: true });
const routes = ['/', '/about', '/work', '/offerings', '/offerings/sacred-fall-reset', '/offerings/kundalini-tantra-yoga', '/retreats', '/journal', '/journal/seasonal-living', '/faq', '/contact', '/privacy', '/terms'];
for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  for (const route of routes) {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const title = await page.title();
    if (!response || response.status() !== 200 || errors.length || overflow) throw new Error(`${viewport.name} ${route}: status=${response?.status()} title=${title} overflow=${overflow} errors=${errors.join('|')}`);
    if (route === '/') await page.screenshot({ path: `/tmp/opencode/airin-${viewport.name}.png`, fullPage: true });
  }
  await page.close();
}

const navigationPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await navigationPage.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await navigationPage.getByRole('link', { name: 'Explore the work' }).click();
await navigationPage.waitForURL('**/offerings');
await navigationPage.getByRole('heading', { name: 'Many paths. One return.' }).waitFor({ state: 'visible' });
await navigationPage.locator('.offering-card').first().scrollIntoViewIfNeeded();
await navigationPage.waitForFunction(() => getComputedStyle(document.querySelector('.offering-card')).opacity === '1');
await navigationPage.locator('.offering-card').first().click();
await navigationPage.waitForURL('**/offerings/intuitive-session');
await navigationPage.getByRole('heading', { name: 'Personal, specific, real.' }).waitFor({ state: 'visible' });
await navigationPage.getByRole('link', { name: 'Offerings', exact: true }).first().click();
await navigationPage.waitForURL('**/offerings');
await navigationPage.getByRole('heading', { name: 'Many paths. One return.' }).waitFor({ state: 'visible' });
await navigationPage.locator('.offering-card').first().scrollIntoViewIfNeeded();
await navigationPage.waitForFunction(() => getComputedStyle(document.querySelector('.offering-card')).opacity === '1');
await navigationPage.close();
await browser.close();
console.log(`Browser audit passed: ${routes.length} direct routes at desktop/mobile and multi-step client navigation.`);
