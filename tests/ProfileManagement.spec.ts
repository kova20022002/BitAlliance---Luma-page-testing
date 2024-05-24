import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { loginPageInterface } from '../interfaces/login';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path'
import { updateDataInterface } from '../interfaces/updateDataInterface';

const filePath = path.join(__dirname, '../data/loginData.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

const updatedInfo = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: '"',
  relax_quotes: true,
});

test(`Profile management test - see first name, last name and email`, async ({ page }) => {
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
    await expect(homePage.dropdown).toBeVisible();
    await homePage.clickDropdown();
    await homePage.clickToMyAccount();
    const url = page.url();
    expect(url).toBe('https://magento.softwaretestingboard.com/customer/account/');
    await homePage.navigateToEditProfile();
    const editProfileUrl = page.url();
    expect (editProfileUrl).toBe('https://magento.softwaretestingboard.com/customer/account/edit/');
    expect (homePage.changeEmailCheckbox).toBeVisible();
    expect (homePage.changePasswordCheckbox).toBeVisible();
    await homePage.clickChangeEmail();
    await homePage.clickChangePassword();
    await homePage.fillUpdateInfo(data);
    await homePage.clickSaveButton();
    expect (homePage.currentPasswordError).toBeVisible();
    expect (homePage.errorNewPassword).toBeVisible();
    expect (homePage.errorConfirmNewPassword).toBeVisible();


    
    
    
})