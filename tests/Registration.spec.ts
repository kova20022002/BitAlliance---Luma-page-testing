import { test, expect } from '@playwright/test';
import { locators } from './locators';
import { TestData } from './TestData';

test('Creating New Customer Account', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveTitle(/Create New Customer Account/);

  await page.locator(locators.firstName).fill(TestData.firstName);
  await page.locator(locators.lastName).fill(TestData.lastName);

  function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `user${randomString}@gmail.com`;
  }
  const email = generateRandomEmail();

  await page.locator(locators.email).fill(email);
  await page.locator(locators.password).fill(TestData.password);
  await page.locator(locators.passwordConfirmation).fill(TestData.passwordConfirmation);


  await expect(page.locator(locators.logInButton)).toBeVisible();
  await page.locator(locators.logInButton).click();

  await page.waitForLoadState('domcontentloaded');
  await expect(page).toHaveURL('https://magento.softwaretestingboard.com/customer/account/');
  await expect(page).toHaveTitle(/My Account/);

});

test('Unsupported character in email field', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
  await page.waitForLoadState("domcontentloaded");
  await expect(page).toHaveTitle(/Create New Customer Account/);

  await page.locator(locators.firstName).fill(TestData.firstName);
  await page.locator(locators.lastName).fill(TestData.lastName);

  function generateRandomEmail() {
    const randomString = Math.random().toString(36).substring(7);
    return `user${randomString}ç@gmail.com`;
  }
  const email = generateRandomEmail();

  await page.locator(locators.email).fill(email);
  await page.locator(locators.password).fill(TestData.password);
  await page.locator(locators.passwordConfirmation).fill(TestData.passwordConfirmation);


  await expect(page.locator(locators.logInButton).first()).toBeVisible();
  await page.locator(locators.logInButton).click();

  await expect(page.locator(locators.messageBox)).toBeVisible();

  

});
