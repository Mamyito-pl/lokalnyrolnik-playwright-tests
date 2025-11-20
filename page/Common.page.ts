import { expect, type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class CommonPage {
    private readonly mobile: boolean;
    readonly messageBox: Locator;
    readonly cartProductsPrice: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.messageBox = page.locator('div[role="alert"]').first();
        this.cartProductsPrice = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #cart_button_mobile div[data-sentry-element="IconLabel"]' : 'div[data-sentry-element="WebContent"] div[data-sentry-element="Amount"]');
    }
}