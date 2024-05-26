import { expect, type Locator, type Page } from '@playwright/test';

export class Payment {
    readonly page: Page;
    readonly orderButton: Locator;
    readonly password: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.orderButton = page.locator('button[class="action primary checkout"][title="Place Order"]');  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/checkout/#payment');
    }

    async placeOrder(){
        await this.orderButton.click();
    }
}