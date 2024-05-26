import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';
import { updateDataInterface } from '../interfaces/updateDataInterface';


export class AccountPage {
    readonly page: Page;
    readonly userInfo: Locator;
    readonly editButton: Locator;
    readonly editFirstName: Locator;
    readonly editLastName: Locator;
    readonly changeEmailCheckbox: Locator;
    readonly changePasswordCheckbox: Locator;
    readonly changeEmail: Locator;
    readonly changePassword: Locator;
    readonly changeNewPassword: Locator;
    readonly confirmChangedPassword: Locator;
    readonly errorNewPassword: Locator;
    readonly currentPasswordError: Locator;
    readonly errorConfirmNewPassword: Locator;
    readonly saveButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.userInfo = page.locator('//html/body/div[2]/main/div[2]/div[1]/div[3]/div[2]/div/div[1]/p');
        this.editButton = page.locator('a[class="action edit"]').filter({hasText: 'Edit'}).nth(0);
        this.editFirstName = page.locator('#firstname and @name="firstname""]');
        this.editLastName = page.locator('#lastname and @name="lastname"')
        this.changeEmailCheckbox = page.locator('#change-email');
        this.changePasswordCheckbox = page.locator('#change-password');
        this.changeEmail = page.locator('#email');
        this.changePassword = page.locator('#current-password' );
        this.changeNewPassword = page.locator('#password and @name="password"');
        this.confirmChangedPassword = page.locator('#password-confirmation and @name="password_confirmation"');
        this.errorNewPassword = page.locator('#password-error');
        this.errorConfirmNewPassword = page.locator('#password-confirmation-error');
        this.currentPasswordError = page.locator('#current-password-error');
        this.saveButton = page.locator('.save');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/customer/account/');
    }

    async checkUserInfo(){
        expect (this.userInfo).toBeVisible();
    }

    async navigateToEditProfile(){
        await this.editButton.click();
    }

    async enterEditFirstName(firstName: string | undefined){
        typeof firstName === 'string' && await this.editFirstName.fill(firstName);
    }

    async enterEditLastName(lastName: string | undefined){
        typeof lastName === 'string' && await this.editLastName.fill(lastName);
    }

    async clickChangeEmail(){
        await this.changeEmailCheckbox.click();
    }

    async clickChangePassword(){
        await this.changePasswordCheckbox.click();
    }

    async enterNewEmail(email: string | undefined){
        typeof email === 'string' && await this.changeEmail.fill(email);
    }
    
    async enterCurrnetPassword(currentPassword: string | undefined){
        typeof currentPassword === 'string' && await this.changePassword.fill(currentPassword);
    }

    async enterNewPassword(newPassword: string | undefined){
        typeof newPassword === 'string' && await this.changeNewPassword.fill(newPassword);
    }

    async enterPasswordConfirmation(passwordConfirmation: string | undefined){
        typeof passwordConfirmation === 'string' && await this.changePasswordCheckbox.fill(passwordConfirmation);
    }

    async clickSaveButton(){
        await this.saveButton.click();
    }

    async fillUpdateInfo(updateInfo: updateDataInterface){
        await this.enterEditFirstName(updateInfo.firstName);
        await this.enterEditFirstName(updateInfo.lastName);
        await this.enterEditFirstName(updateInfo.email);
        await this.enterEditFirstName(updateInfo.password);
        await this.enterEditFirstName(updateInfo.newPassword);
        await this.enterEditFirstName(updateInfo.newPasswordConfirmation);
    }

    

    
}


