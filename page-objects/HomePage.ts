import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';
import { updateDataInterface } from '../interfaces/updateDataInterface';
import { ShoppingCart } from './ShoppingCart';
import { AccountPage } from './AccountPage';
import { ProductDetail } from './ProductDetail';

export class HomePage {
    readonly page: Page;
    readonly dropdown: Locator;
    readonly myAccountButton: Locator;
    readonly addToCartFromHomePage: Locator;
    readonly addedSuccessfullyBox: Locator;
    readonly itemImage: Locator;
    readonly cartButton: Locator;
    readonly viewAndEditCart: Locator;


    constructor(page: Page) {
        this.page = page;
        this.dropdown = page.locator('//html/body/div[2]/header/div[1]/div/ul/li[2]/span/button');
        this.myAccountButton = page.locator('li').filter({hasText: 'My Account'}).nth(0);
        this.addToCartFromHomePage = page.locator('button[class="action tocart primary"][type="submit"]');
        this.itemImage = page.locator('img[class="product-image-photo"][alt="Push It Messenger Bag"][max-width="240"]');
        this.cartButton = page.locator('//html/body/div[2]/header/div[2]/div[1]/a');
        this.viewAndEditCart = page.locator('a[class="action viewcart"]');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/');
        await this.page.waitForTimeout(3000);


    }

    async clickDropdown(){
        await this.dropdown.click({force: true});
    
    }

    async clickToMyAccount(): Promise<AccountPage>{
        await this.myAccountButton.click();
        return new AccountPage(this.page);
    }

    async navigateToProductDetail(): Promise<ProductDetail>{
        await this.itemImage.click();
        return new ProductDetail(this.page);
    }

    async addToCart(){
        await this.page.locator('li').filter({ hasText: 'Push It Messenger Bag Rating' }).getByRole('button').click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToCart(): Promise<ShoppingCart>{
        await this.page.waitForLoadState("domcontentloaded");
        await this.cartButton.click();
        return new ShoppingCart(this.page);
    }

    async clickViewAndEditCart(): Promise<ShoppingCart>{
        await this.viewAndEditCart.click();
        return new ShoppingCart(this.page);
    }



    

    
}