import { expect, type Locator, type Page } from '@playwright/test';
import { checkoutInterface } from '../interfaces/checkout';
import { Payment } from './Payment';

export class Checkout {
    readonly page: Page;
    readonly street: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zip: Locator;
    readonly country: Locator;
    readonly phoneNumber: Locator;
    readonly nextButton: Locator;
    readonly savedInfo: Locator;
    readonly radioInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.street = page.locator('input[name="street[0]"][aria-required="true"][aria-invalid="false"]');
        this.city = page.locator('input[name="city"][aria-required="true"][aria-invalid="false"]');
        this.state = page.locator('select[name="region_id"][class="select"]');
        this.zip = page.locator('input[name="postcode"][class="input-text"]');
        this.country = page.locator('select[name="country_id"][class="select"]');
        this.phoneNumber = page.locator('input[name="telephone"][class="input-text"][aria-required="true"][aria-invalid="false"]');
        this.nextButton = page.locator('//html/body/div[2]/main/div[2]/div/div[2]/div[4]/ol/li[2]/div/div[3]/form/div[3]/div/button');
        this.savedInfo = page.locator('div[class="shipping-address-item selected-item"]');
        this.radioInput = page.locator('input[type="radio"][name="ko_unique_1"]');

      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/checkout/#shipping');
    }

    async enterStreet(street: string){
         await this.street.fill(street);
    }

    async enterCity(city: string){
        await this.city.fill(city);
    }

    async enterState(state: string){
        await this.state.selectOption(state);
    }

    async enterZip(zip: string){
        await this.zip.fill(zip);
    }

    async enterCountry(country: string){
        await this.country.selectOption(country);
    }

    async enterNumber(number: string){
       await this.phoneNumber.fill(number);
    }

    async continuePayment(): Promise<Payment>{
        await this.nextButton.click();
        return new Payment(this.page);
    }

    async chooseShippingMethod(){
        await this.radioInput.click();
    }

    async fillCheckout(data: checkoutInterface){
        await this.enterStreet(data.street);
        await this.enterCity(data.city);
        await this.enterState(data.state);
        await this.enterZip(data.zip);
        await this.enterCountry(data.country);
        await this.enterNumber(data.number);

    }


    

    
}