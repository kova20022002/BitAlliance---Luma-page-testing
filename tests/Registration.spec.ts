import { test, expect } from '@playwright/test';
import { Registration } from '../page-objects/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';


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
test(`Registration Test - ${data.testNumber}`, async ({ page }) => {
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
}); 
}