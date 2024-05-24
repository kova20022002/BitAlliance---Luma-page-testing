import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';
import { updateDataInterface } from '../interfaces/updateDataInterface';


export class HomePage {
    readonly page: Page;
    readonly dropdown: Locator;
    readonly myAccountButton: Locator;
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
    readonly addToCartFromHomePage: Locator;
    readonly addedSuccessfullyBox: Locator;
    readonly itemImage: Locator;
    readonly cartButton: Locator;
    readonly changeQuantity: Locator;
    readonly updateQuantityButton: Locator;
    readonly viewAndEditCart: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('//html/body/div[2]/header/div[1]/div/ul/li[2]/span/button');
        this.myAccountButton = page.locator('//html/body/div[2]/header/div[1]/div/ul/li[2]/div/ul/li[1]/a');
        this.userInfo = page.locator('//html/body/div[2]/main/div[2]/div[1]/div[3]/div[2]/div/div[1]/p');
        this.editButton = page.locator('//html/body/div[2]/main/div[2]/div[1]/div[3]/div[2]/div/div[2]/a[1]');
        this.editFirstName = page.locator('#firstname and @name="firstname""]');
        this.editLastName = page.locator('#lastname and @name="lastname"')
        this.changeEmailCheckbox = page.locator('#change-email');
        this.changePasswordCheckbox = page.locator('#change-password');
        this.changeEmail = page.locator('#email');
        this.changePassword = page.locator('#current-password' );
        this.changeNewPassword = page.locator('#password and @name="password"');
        this.confirmChangedPassword = page.locator('#password-confirmation and @name="password_confirmation"');
        this.errorNewPassword = page.locator('//*[@id="password-error"]');
        this.errorConfirmNewPassword = page.locator('//*[@id="password-confirmation-error"]');
        this.currentPasswordError = page.locator('//*[@id="current-password-error"]');
        this.saveButton = page.locator('.save');
        this.addToCartFromHomePage = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[3]/div/div/ol/li[5]/div/div/div[3]/div/div[1]/form/button');
        this.addedSuccessfullyBox = page.locator('//html/body/div[2]/main/div[2]/div[2]/div/div');
        this.itemImage = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[3]/div/div/ol/li[5]/div/a/span/span/img');
        this.cartButton = page.locator('//html/body/div[2]/header/div[2]/div[1]/a');
        this.changeQuantity = page.locator('//*[@id="cart-80814-qty"]');
        this.updateQuantityButton = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/form/div[2]/button[2]');
        this.viewAndEditCart = page.locator('//html/body/div[2]/header/div[2]/div[1]/div/div/div/div[2]/div[5]/div/a');
        this.proceedToCheckoutButton = page.locator('//html/body/div[2]/main/div[3]/div/div[2]/div[1]/ul/li[1]/button');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
    }

    async clickDropdown(){
        await this.dropdown.click();
    
    }

    async clickToMyAccount(){
        await this.myAccountButton.click();
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

    async addToCart(){
        await this.addToCartFromHomePage.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToCart(){
        await this.cartButton.click();
    }

    async clickViewAndEditCart(){
        await this.viewAndEditCart.click();
    }

    async changeQuant(quantity: string){
        typeof quantity === 'number' && await this.changeQuantity.fill(quantity);
    }

    async updateQuantity(){
        await this.updateQuantityButton.click();
    }

    async clickProceedToCheckout(){
        await this.proceedToCheckoutButton.click();
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