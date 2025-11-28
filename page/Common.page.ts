import { type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class CommonPage {
    readonly page: Page;
    readonly mobile: boolean;
    readonly messageBox: Locator;
    readonly alertBox: Locator;
    readonly cartProductsPrice: Locator;
    readonly getLoader: Locator;
    readonly notificationButton: Locator;
    readonly cartButton: Locator;
    readonly modal: Locator;
    readonly productCartList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mobile = isMobile(page);
        this.messageBox = page.locator('div[role="status"]').first();
        this.alertBox = page.locator('div[role="alert"]').first();
        this.cartProductsPrice = page.locator(this.mobile ? "div[data-sentry-element='TabletContent'] #cart_button_mobile div[data-sentry-element='IconLabel']" : "div[data-sentry-element='WebContent'] div[data-sentry-element='Amount']");
        this.getLoader = page.locator("svg[class*='MuiCircularProgress-svg']");
        this.notificationButton = page.getByText('Produkty dodane do koszyka nie są zarezerwowane').locator('..').locator('..').locator('button');
        this.cartButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #cart_button_mobile' : 'div[data-sentry-element="WebContent"] #cart_button');
        this.modal = page.locator('div[data-sentry-element="Modal"]');
        this.productCartList = page.locator('div[data-sentry-element="InsideWrapper"]');
    }

    async clickNotificationButton() {
        const notificationButtonIsVisible = await this.notificationButton.isVisible();
        if (notificationButtonIsVisible) {
          await this.notificationButton.click();
        } else {
          return;
        }
    }

    async waitForProductsInCart() {
      await this.page.waitForSelector('div[data-sentry-element="InsideWrapper"]', { timeout: 10000 });
    }
}