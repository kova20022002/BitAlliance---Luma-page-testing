import { test, expect } from '@playwright/test';
import { Registration } from '../page-objects/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { afterEach } from 'node:test';


const filePath = path.join(__dirname, '../data/data.csv');
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
test(`User Registration - ${data.testNumber}`, async ({ page, browser },testInfo) => {
  afterEach(async () =>{
    await page.screenshot({path: Date.now() + 'screenshot.png'});
  })
  const context = await browser.newContext({ recordVideo: { dir: 'test-results' } });
const registrationPage = new Registration(page);

const registrationData: registrationPageInterface = {
  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  password: data.password,
  passwordConfirmation: data.passwordConfirmation,
  errorType: data.errorType,
  errorTypeMessage: data.errorTypeMessage,

};

await registrationPage.goto();
await expect(registrationPage.form).toBeVisible();
await expect(registrationPage.firstName).toBeVisible();
await expect(registrationPage.lastName).toBeVisible();
await expect(registrationPage.email).toBeVisible();
await expect(registrationPage.password).toBeVisible();
await expect(registrationPage.confirmPassword).toBeVisible();
await registrationPage.fillRegistration(registrationData);
await registrationPage.clickCreateButton();
await registrationPage.getError(registrationData.errorType, registrationData.errorTypeMessage);

await testInfo.attach("", {
  body: await page.screenshot(),
  contentType: "image/png"
})
await context.close();

}); 
}