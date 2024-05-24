import { test, expect } from '@playwright/test';
import { Registration } from '../page-objects/Registration';
import { registrationPageInterface } from '../interfaces/registration';
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { HomePage } from '../page-objects/HomePage';

test(`Shopping cart`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await homePage.itemImage.hover();    
    await homePage.addToCart();
  //  expect (homePage.addedSuccessfullyBox).toBeVisible(); 
    await homePage.navigateToCart();
    const url = page.url();
    if(url === 'https://magento.softwaretestingboard.com/'){
        await homePage.clickViewAndEditCart();
    };
    
    await homePage.changeQuant('2');
    await homePage.updateQuantity();
    await homePage.clickProceedToCheckout();
});
