import { test, expect, Browser, chromium, Page } from '@playwright/test';

test(`Login`, async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS8%2C/');
  await page.locator('//*[@id="email"]').fill('emir@gmail.com');
  await page.locator('//*[@id="pass" and @type="password" and @title="Password"]').fill('Emir1234!');
  await page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[1]/div[2]/form/fieldset/div[4]/div[1]/button/span').click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://magento.softwaretestingboard.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.locator('//html/body/div[2]/header/div[1]/div/ul/li[2]/span/button')).toBeVisible();
  
  await page.context().storageState({ path: './userAuth.json' });
  
  
  
})