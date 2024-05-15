import { expect, type Locator, type Page } from '@playwright/test';
import { locators } from './locators';
import { loginPageInterface } from '../../interfaces/login';

export class Registration {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;

    readonly signInButton: Locator;
    readonly forgotPasswordButton: Locator;
    readonly passwordConfirmationError: Locator;
    readonly passwordError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.locator(locators.email);
        this.password = page.locator(locators.password);
        this.signInButton = page.locator(locators.signInButton);
        this.forgotPasswordButton = page.locator(locators.forgotPasswordButton);
  
      }

    async enterEmail(email: string | undefined){
        typeof email === 'string' && await this.email.fill(email);
    }

    async enterPassword(password: string | undefined){
        typeof password === 'string' && await this.password.fill(password);
    }

    async clickSignIn(){
        await this.signInButton.click();
    }

    async forgotPassword(){
        await this.forgotPasswordButton.click();
    }

    async fillLoginForm(loginData: loginPageInterface){
        await this.enterEmail(loginData.email);
        await this.enterPassword(loginData.password);
    }
}