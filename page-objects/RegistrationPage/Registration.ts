import { expect, type Locator, type Page } from '@playwright/test';
import { registrationPageInterface } from '../../interfaces/registration';

export class Registration {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly createButton: Locator;
    readonly nameErrorBox: Locator;
    readonly passwordConfirmationError: Locator;
    readonly passwordError: Locator;

  
    constructor(page: Page) {
      this.page = page;
      this.firstName = page.locator('#firstname');
      this.lastName = page.locator('#lastname');
      this.email = page.locator('#email_address');
      this.password = page.locator('#password');
      this.confirmPassword = page.locator('#password-confirmation');
      this.createButton = page.locator('//html/body/div[2]/main/div[3]/div/form/div/div[1]/button');
      this.nameErrorBox = page.locator('#firstname-error');
      this.passwordConfirmationError = page.locator('#password-confirmation-error');
      this.passwordError = page.locator('#password-error');


    }


  
    async goto() {
      await this.page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
    }
  
    async enterFirstName(firstName : string | undefined) {
        typeof firstName === 'string' && await this.firstName.fill(firstName);
    }
  
    async enterLastName(lastName : string | undefined) {
      typeof lastName === 'string' && await this.lastName.fill(lastName);
    }

    async enterEmail(email : string | undefined) {
        typeof email === 'string' && await this.email.fill(email);
      }

      async enterPassword(password : string | undefined) {
        typeof password === 'string' && await this.password.fill(password);
      }

      async enterPasswordConfirmation(passConfirmation : string | undefined) {
        typeof passConfirmation === 'string' && await this.confirmPassword.fill(passConfirmation);
      }

      async clickCreateButton(){
        await this.createButton.click();
      }

      async getErrorMessage(errorType: string, errorTypeMessage: string){
       
        await expect(this.page.locator('#'+ errorType)).toContainText(errorTypeMessage);
        console.log(errorType, errorTypeMessage)
        
      }

      async fillRegistration(registrationData: registrationPageInterface){
        await this.enterFirstName(registrationData.firstName);
        await this.enterLastName(registrationData.lastName);
        await this.enterEmail(registrationData.email);
        await this.enterPassword(registrationData.password);
        await this.enterPasswordConfirmation(registrationData.passwordConfirmation);
        

      }
  }