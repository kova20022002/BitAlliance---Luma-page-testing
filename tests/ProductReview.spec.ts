import { test, expect } from '@playwright/test';
import { Registration } from '../page-objects/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../page-objects/HomePage';
import { checkoutInterface } from '../interfaces/checkout';
import { reviewInterface } from '../interfaces/review';
import { afterEach } from 'node:test';


const filePath = path.join(__dirname, '../data/reviewData.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

const testDataArray  = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: '"',
  relax_quotes: true,
});

const testData = testDataArray[0];

test.use({ storageState: { cookies: [], origins: [] } });

test(`Adding a Product Review`, async ({ page, browser }, testInfo) => {
    afterEach(async () =>{
        await page.screenshot({path: Date.now() + 'screenshot.png'});
      })
    const context = await browser.newContext({ recordVideo: { dir: 'test-results' } });
    const data: reviewInterface ={
    rating: testData.rating,
    nickname: testData.nickname,
    summary: testData.summary,
    review: testData.review,
    };

    const homePage = new HomePage(page);
    await homePage.goto();
    const productDetail = await homePage.navigateToProductDetail();  
    await productDetail.addReviewButton();
    await productDetail.fillReview(data);
    await productDetail.submitReview();

    await testInfo.attach("", {
        body: await page.screenshot(),
        contentType: "image/png"
      })
    await context.close();
});
