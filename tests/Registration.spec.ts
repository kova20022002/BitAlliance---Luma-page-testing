import { test, expect } from '@playwright/test';
import { TestData } from './TestData';
import { Registration } from '../page-objects/RegistrationPage/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path'


const testData = parse(fs.readFileSync(path.join(__dirname, 'data.csv')),{
  columns: true,
  skip_empty_lines: true
});


for (const data of testData) {
test(`Registration Test - ${data.errorType}`, async ({ page }) => {
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
await registrationPage.fillRegistration(registrationData);
await registrationPage.clickCreateButton();
await registrationPage.getErrorMessage(registrationData.errorType, registrationData.errorTypeMessage);

}); 
}

/* test('Creating New Customer Account', async ({ page }) => {
  const registrationPage = new Registration(page);

  await registrationPage.goto();
  await registrationPage.fillRegistration(TestData);
  await registrationPage.clickCreateButton();
});

test('Omiting First name in registration form', async ({ page }) => {
  const registrationPage = new Registration(page);

  const registrationData: registrationPageInterface = {
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    passwordConfirmation: 'password123'
};
  await registrationPage.goto();
  await registrationPage.fillRegistration(registrationData);
  await registrationPage.clickCreateButton();
  await expect(registrationPage.errorBox).toBeVisible();

});  */


/* test('Using too weak password', async ({ page }) => {
  const registrationPage = new Registration(page);

  const registrationData: registrationPageInterface = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doeç@example.com',
    password: 'john',
    passwordConfirmation: 'john'
};
  await registrationPage.goto();
  await registrationPage.fillRegistration(registrationData);
  await registrationPage.clickCreateButton();
  await expect(registrationPage.passwordError).toBeVisible();

});
 */