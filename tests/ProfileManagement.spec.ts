import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { loginPageInterface } from '../interfaces/login';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path'
import { updateDataInterface } from '../interfaces/updateDataInterface';
import { afterEach } from 'node:test';

const filePath = path.join(__dirname, '../data/loginData.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

const updatedInfo = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: '"',
  relax_quotes: true,
});

test(`Profile management test - see first name, last name and email`, async ({ page, browser }, testInfo) => {
  afterEach(async () =>{
    await page.screenshot({path: Date.now() + 'screenshot.png'});
  })
  const context = await browser.newContext({ recordVideo: { dir: 'test-results' } });
    const homePage = new HomePage(page);

    const data: updateDataInterface ={
        firstName: updatedInfo.firstName,
        lastName: updatedInfo.lastName,
        email: updatedInfo.email,
        password: updatedInfo.password,
        newPassword: updatedInfo.newPassword,
        newPasswordConfirmation: updatedInfo.newPasswordConfirmation
    }

    await homePage.goto();
    await homePage.clickDropdown();
    const account = await homePage.clickToMyAccount();
    await account.navigateToEditProfile();
    expect (account.changeEmailCheckbox).toBeVisible();
    expect (account.changePasswordCheckbox).toBeVisible();
    await account.clickChangeEmail();
    await account.clickChangePassword();
    await account.fillUpdateInfo(data);
    await account.clickSaveButton();
    expect (account.currentPasswordError).toBeVisible();
    expect (account.errorNewPassword).toBeVisible();
    expect (account.errorConfirmNewPassword).toBeVisible();


    await testInfo.attach("", {
      body: await page.screenshot(),
      contentType: "image/png"
    })
    await context.close();
    
})