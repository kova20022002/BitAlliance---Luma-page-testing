import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';

export class LogIn {
    readonly page: Page;
    readonly realEmail: Locator;
    readonly password: Locator;
    readonly signInButton: Locator;
    readonly forgotPasswordButton: Locator;
    readonly loginError: Locator;
    readonly passError: Locator;
    readonly emailCheck: Locator;

    constructor(page: Page) {
        this.page = page;
        this.realEmail = page.locator('//*[@id="email"]');
        this.password = page.locator('//*[@id="pass" and @type="password" and @title="Password"]');
        this.signInButton = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[1]/div[2]/form/fieldset/div[4]/div[1]/button/span');
        this.forgotPasswordButton = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[1]/div[2]/form/fieldset/div[4]/div[2]/a/span');
        this.loginError = page.locator('//html/body/div[2]/main/div[2]/div[2]/div/div');
        this.passError = page.locator('//*[@id="pass-error"]');
        this.emailCheck = page.locator('//html/body/div[2]/main/div[2]/div[1]/div[3]/div[2]/div/div[1]/p');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/login/referer/aHR0cHM6Ly9tYWdlbnRvLnNvZnR3YXJldGVzdGluZ2JvYXJkLmNvbS9jdXN0b21lci9hY2NvdW50L2xvZ291dFN1Y2Nlc3Mv/');
    }

    async gotoAccount(){
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/');
    }

    async checkEmail(emaill: string){
        await expect(this.emailCheck).toContainText(emaill);
    }

    async enterEmail(email: string | undefined){
        typeof email === 'string' && await this.realEmail.fill(email);
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

    async getError(errorType: string, errorTypeMessage: string){
        if(errorType === 'pass-error' || errorType === 'email-error'){
            await expect(this.page.locator('#'+ errorType)).toContainText(errorTypeMessage);
        }else{
           await expect(this.page.locator(errorType)).toContainText(errorTypeMessage);  
        } 
      }

    

    async fillLoginForm(loginData: loginPageInterface){
        await this.enterEmail(loginData.email);
        await this.enterPassword(loginData.password);
    }
}