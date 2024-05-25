import { test, expect } from '@playwright/test';
import { LogIn } from '../page-objects/LogIn';
import { loginPageInterface } from '../interfaces/login';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path'
import { log } from 'console';
import { afterEach } from 'node:test';


const filePath = path.join(__dirname, '../data/loginData.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

const testData = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: '"',
  relax_quotes: true,
});


test.use({ storageState: { cookies: [], origins: [] } });

for (const data of testData) {
    test(`User Login - ${data.testNumber}`, async ({ page, browser }, testInfo) => {
      afterEach(async () =>{
        await page.screenshot({path: Date.now() + 'screenshot.png'});
      })
    const context = await browser.newContext({ recordVideo: { dir: 'test-results' } });
    const login = new LogIn(page);
  
    const loginData: registrationPageInterface ={
        email: data.email,
        password: data.password,
        errorType: data.errorType,
        errorTypeMessage: data.errorTypeMessage
    }


    await login.goto();
    await expect(login.realEmail).toBeVisible();
    await expect(login.password).toBeVisible();
    await login.fillLoginForm(loginData);
    await login.clickSignIn();
    
    if (loginData.errorType && loginData.errorTypeMessage) {
      await login.getError(loginData.errorType, loginData.errorTypeMessage);
    } else {
      const url = page.url();
      expect(url).toBe('https://magento.softwaretestingboard.com/customer/account/' || 'https://magento.softwaretestingboard.com/');
      await login.gotoAccount();
      if (loginData.email) {
        await login.checkEmail(loginData.email);
      } else {
        throw new Error('Email is required for successful login test.');
      }
    }

    await testInfo.attach("", {
      body: await page.screenshot(),
      contentType: "image/png"
    })
    await context.close();
  })
};

