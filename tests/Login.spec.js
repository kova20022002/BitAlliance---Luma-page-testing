import { test, expect } from '@playwright/test';
import { TestData } from './TestData';
import { LogIn } from '../page-objects/LoginPage/LogIn';
import { loginPageInterface } from '../interfaces/login';

test('Log In test', async ({ page }) => {
    const login = new LogIn(page);
  
    const registrationData: loginPageInterface = {
        email: 'john.doe@example.com',
        password: 'password123',
    };

    await login.goto();
    await login.fillLoginForm(registrationData);
    await login.clickSignIn();
  });