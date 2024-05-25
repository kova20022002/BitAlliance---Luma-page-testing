import { expect, type Locator, type Page } from '@playwright/test';
import { loginPageInterface } from '../interfaces/login';
import { updateDataInterface } from '../interfaces/updateDataInterface';
import { Checkout } from './Checkout';
import { reviewInterface } from '../interfaces/review';

export class ProductDetail {
    readonly page: Page;
    readonly addReview: Locator;
    readonly nickname: Locator;
    readonly summary: Locator;
    readonly review: Locator;
    readonly submit: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addReview = page.locator('.add');
        this.nickname = page.locator('input[id="nickname_field"][name="nickname"]');
        this.summary = page.locator('input[id="summary_field"][name="title"]');
        this.review = page.locator('textarea[id="review_field"][name="detail"]');
        this.submit = page.locator('button[class="action submit primary"][type="submit"]');
  
      }

    async goto() {
        await this.page.goto('https://magento.softwaretestingboard.com/push-it-messenger-bag.html');
    }

    async addReviewButton(){
        await this.addReview.click();
    }

    async giveRating(rate: number){
        if(rate>0 && rate<6){
        await this.page.locator(`label[id="Rating_${rate}_label"]`).click({ force: true });
        }
    }

    async enterNickname(nickname: string){
        await this.nickname.fill(nickname);
    }

    async enterSummary(summary: string){
        await this.summary.fill(summary);
    }

    async enterReview(review: string){
        await this.review.fill(review);
    }

    async submitReview(){
        await this.submit.click();
    }

    async fillReview(reviewData: reviewInterface){
        await this.giveRating(reviewData.rating);
        await this.enterNickname(reviewData.nickname);
        await this.enterSummary(reviewData.summary);
        await this.enterReview(reviewData.review);

    }


    

    
}