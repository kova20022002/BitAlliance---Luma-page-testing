import { test, expect } from '@playwright/test';
import { Registration } from '../page-objects/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../page-objects/HomePage';
import { checkoutInterface } from '../interfaces/checkout';
import { afterEach } from 'node:test';


const filePath = path.join(__dirname, '../data/checkoutData.csv');
const fileContent = fs.readFileSync(filePath, 'utf8');

const testDataArray  = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: '"',
  relax_quotes: true,
});

const testData = testDataArray[0];

test(`Shopping on Website`, async ({ page, browser }, testInfo) => {
  afterEach(async () =>{
    await page.screenshot({path: Date.now() + 'screenshot.png'});
  })
  const context = await browser.newContext({ recordVideo: { dir: 'test-results' } });
    const data: checkoutInterface ={
    street: testData.street,
    city: testData.city,
    state: testData.state,
    zip: testData.zip,
    country: testData.country,
    number: testData.number
    };

    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.itemImage.hover();    
    await homePage.addToCart();

    await page.waitForLoadState("networkidle");

    await homePage.navigateToCart();   

    const shoppingCart = await homePage.clickViewAndEditCart();
    await shoppingCart.changeQuant('2');
    await shoppingCart.updateQuantity();
    await page.waitForLoadState("networkidle");
    const checkout = await shoppingCart.clickProceedToCheckout();
        await page.waitForSelector('input[type="radio"][name="ko_unique_1"]');

      await checkout.chooseShippingMethod();
      const payment = await checkout.continuePayment();
      await page.waitForSelector('button[class="action primary checkout"][title="Place Order"]');

      
      await payment.placeOrder();
    

    await testInfo.attach("", {
      body: await page.screenshot(),
      contentType: "image/png"
    })
    await context.close();
});
