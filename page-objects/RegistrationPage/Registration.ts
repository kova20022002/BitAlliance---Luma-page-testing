import { expect, type Locator, type Page } from '@playwright/test';
import { locators } from './locators';
import { registrationPageInterface } from '../../interfaces/registration';

export class Registration {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly createButton: Locator;
    readonly errorBox: Locator;
    readonly passwordConfirmationError: Locator;
    readonly passwordError: Locator;

  
    constructor(page: Page) {
      this.page = page;
      this.firstName = page.locator(locators.firstName);
      this.lastName = page.locator(locators.lastName);
      this.email = page.locator(locators.email);
      this.password = page.locator(locators.password);
      this.confirmPassword = page.locator(locators.passwordConfirmation);
      this.createButton = page.locator(locators.createButton);
      this.errorBox = page.locator(locators.errorBox);
      this.passwordConfirmationError = page.locator(locators.passwordConfirmationError);
      this.passwordError = page.locator(locators.passwordError);


    }
  
    async goto() {
      await this.page.goto('https://magento.softwaretestingboard.com/customer/account/create/');
    }
  
    async enterFirstName(firstName : string | undefined) {
        typeof firstName === 'string' && await this.firstName.fill(firstName);
        /* typeof firstName === 'string' ? await this.firstName.fill(firstName) : undefined;  */   
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

      async fillRegistration(registrationData: registrationPageInterface){
        await this.enterFirstName(registrationData.firstName);
        await this.enterLastName(registrationData.lastName);
        await this.enterEmail(registrationData.email);
        await this.enterPassword(registrationData.password);
        await this.enterPasswordConfirmation(registrationData.passwordConfirmation);

      }
  }