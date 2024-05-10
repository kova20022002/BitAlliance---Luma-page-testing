import { test, expect } from '@playwright/test';
import { locators } from './locators';

test('Visit BitAlliance page via Google search', async ({ page }) => {
  await page.goto('https://google.com/ncr');

  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveTitle(/Google/);

  await page.locator(locators.search).fill('BitAlliance');
  await page.locator(locators.search).press("Enter");

  await page.waitForURL('https://www.google.com/search?*');
  const pageLocator = page.locator('#search');
  await expect(pageLocator.locator(locators.pageLink)).toBeVisible();
  await pageLocator.locator(locators.pageLink).click();

  await expect(page).toHaveTitle(/Bit Alliance/);
  await page.waitForLoadState("domcontentloaded");
});
