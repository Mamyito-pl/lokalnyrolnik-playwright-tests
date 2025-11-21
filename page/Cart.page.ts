import { expect, type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class CartPage {
    private readonly mobile: boolean;
    readonly cartProductsPrice: Locator;
    readonly productList: Locator;
    readonly productItemCount: Locator;
    readonly increaseProductButton: Locator;
    readonly decreaseProductButton: Locator;
    readonly deleteProductCartIcon: Locator;
    readonly deleteProductCartConfirmButton: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.cartProductsPrice = page.locator(this.mobile ? "div[data-sentry-element='TabletContent'] #cart_button_mobile div[data-sentry-element='IconLabel']" : "div[data-sentry-element='WebContent'] div[data-sentry-element='Amount']");
        this.productList = page.locator("div[data-sentry-element='InsideWrapper']");
        this.productItemCount = page.locator(this.mobile ? "div[data-sentry-element='TabletContent'] div[class*='item_count_button'] div[data-sentry-element='ProductQuantityInput'] div input" : "div[data-sentry-element='InsideWrapper'] div[class*='item_count_button'] div[data-sentry-element='ProductQuantityInput'] div input");
        this.increaseProductButton = page.locator(this.mobile ? "div[data-sentry-element='TabletContent'] svg[class*='tabler-icon tabler-icon-plus']" : "div[data-sentry-element='InsideWrapper'] svg[class*='tabler-icon tabler-icon-plus']");
        this.decreaseProductButton = page.locator(this.mobile ? "div[data-sentry-element='TabletContent'] svg[class*='tabler-icon tabler-icon-minus']" : "div[data-sentry-element='InsideWrapper'] svg[class*='tabler-icon tabler-icon-minus']");
        this.deleteProductCartIcon = page.locator("button[aria-label*='Usuń produkt']");
        this.deleteProductCartConfirmButton = page.locator('div[data-sentry-element="ModalContent"]').getByText('Potwierdź');
    }

    async clickIncreaseProductButton() {
        await this.increaseProductButton.click({ force: true, delay: 300 });
    }

    async clickDecreaseProductButton() {
        await this.decreaseProductButton.click({ force: true, delay: 300 });
    }

    async clickDeleteProductCartIcon() {
        await this.deleteProductCartIcon.click();
    }

    async clickDeleteProductCartConfirmButton() {
        await this.deleteProductCartConfirmButton.click({ force: true });
    }
}