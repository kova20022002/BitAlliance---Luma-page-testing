import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';
import { updateDataInterface } from '../interfaces/updateDataInterface';
import { Checkout } from './Checkout';

export class ShoppingCart {
    readonly page: Page;
    readonly cartButton: Locator;
    readonly changeQuantity: Locator;
    readonly updateQuantityButton: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartButton = page.locator('//html/body/div[2]/header/div[2]/div[1]/a');
        this.changeQuantity = page.locator('//*[@id="cart-80814-qty"]');
        this.updateQuantityButton = page.locator('button[class="action update"][name="update_cart_action"]');
        this.proceedToCheckoutButton = page.locator('button[class="action primary checkout"][data-role="proceed-to-checkout"]');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
    }

    async changeQuant(quantity: string){
        typeof quantity === 'number' && await this.changeQuantity.fill(quantity);
    }

    async updateQuantity(){
        await this.updateQuantityButton.click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async clickProceedToCheckout(): Promise<Checkout>{
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.waitForTimeout(4000);
        await this.proceedToCheckoutButton.click();
        await this.page.waitForTimeout(4000);
        return new Checkout(this.page);

    }


    

    
}