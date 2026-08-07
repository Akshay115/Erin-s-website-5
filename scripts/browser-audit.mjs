import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const routes = ['/', '/about', '/work', '/offerings', '/offerings/sacred-fall-reset', '/offerings/kundalini-tantra-yoga', '/retreats', '/journal', '/journal/seasonal-living', '/faq', '/contact', '/privacy', '/terms'];
for (const viewport of [{ name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }]) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  for (const route of routes) {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    const title = await page.title();
    if (!response || response.status() !== 200 || errors.length || overflow) throw new Error(`${viewport.name} ${route}: status=${response?.status()} title=${title} overflow=${overflow} errors=${errors.join('|')}`);
    if (route === '/') await page.screenshot({ path: `/tmp/opencode/airin-${viewport.name}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log(`Browser route audit passed: ${routes.length} routes at desktop and mobile widths.`);
