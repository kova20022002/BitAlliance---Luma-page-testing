import { test, expect } from '@playwright/test';
import { TestData } from './TestData';
import { Registration } from '../page-objects/RegistrationPage/Registration';
import { registrationPageInterface } from '../interfaces/registration';

test('Creating New Customer Account', async ({ page }) => {
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

}); 

test('Different password written in Confirmation Password Field', async ({ page }) => {
  const registrationPage = new Registration(page);

  const registrationData: registrationPageInterface = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doeç@example.com',
    password: 'password123',
    passwordConfirmation: 'password1234'
};
  await registrationPage.goto();
  await registrationPage.fillRegistration(registrationData);
  await registrationPage.clickCreateButton();
  await expect(registrationPage.passwordConfirmationError).toBeVisible();

}); 

test('Using too weak password', async ({ page }) => {
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
