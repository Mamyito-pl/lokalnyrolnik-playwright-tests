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
    readonly cartDrawerToCartButton: Locator;
    readonly cartSummaryButton: Locator;
    readonly cartSummaryPaymentButton: Locator;
    readonly cartPaymentConfirmationButton: Locator;
    readonly productCartList: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.cartProductsPrice = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #cart_button_mobile div[data-sentry-element="IconLabel"]' : 'div[data-sentry-element="WebContent"] div[data-sentry-element="Amount"]');
        this.productList = page.locator('div[data-sentry-element="InsideWrapper"]');
        this.productItemCount = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] div[class*="item_count_button"] div[data-sentry-element="ProductQuantityInput"] div input' : 'div[data-sentry-element="InsideWrapper"] div[class*="item_count_button"] div[data-sentry-element="ProductQuantityInput"] div input');
        this.increaseProductButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] svg[class*="tabler-icon tabler-icon-plus"]' : 'div[data-sentry-element="InsideWrapper"] svg[class*="tabler-icon tabler-icon-plus"]');
        this.decreaseProductButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] svg[class*="tabler-icon tabler-icon-minus"]' : 'div[data-sentry-element="InsideWrapper"] svg[class*="tabler-icon tabler-icon-minus"]');
        this.deleteProductCartIcon = page.locator('button[aria-label*="Usuń produkt"]');
        this.deleteProductCartConfirmButton = page.locator('div[data-sentry-element="ModalContent"]').getByText('Potwierdź');
        this.cartDrawerToCartButton = page.locator(this.mobile ? '[data-cy="mobile-drawer-checkout-button"]' : '[data-cy="desktop-drawer-checkout-button"]');
        this.cartSummaryButton = page.locator(this.mobile ? '[data-cy="mobile-cart-checkout-button"]' : '[data-cy="desktop-cart-checkout-button"]');
        this.cartSummaryPaymentButton = page.locator(this.mobile ? '[data-cy="mobile-delivery-checkout-button"]' : '[data-cy="desktop-delivery-checkout-button"]');
        this.cartPaymentConfirmationButton = page.locator(this.mobile ? '[data-cy="mobile-payment-checkout-button"]' : '[data-cy="desktop-payment-checkout-button"]');
        this.productCartList = page.locator('div[data-sentry-element="InsideWrapper"]');
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

    async clickCartDrawerToCartButton() {
        await expect(this.cartDrawerToCartButton).toBeVisible({ timeout: 10000 });
        await this.cartDrawerToCartButton.click();
    }

    async clickCartSummaryButton() {
        await expect(this.cartSummaryButton).toHaveCSS('background-color', /rgb\((0, 79, 36|0, 47, 22)\)/);
        await this.cartSummaryButton.click({ force: true, delay: 300 });
    }

    async clickCartSummaryPaymentButton() {
        await expect(this.cartSummaryPaymentButton).toHaveCSS('background-color', /rgb\((0, 79, 36|0, 47, 22)\)/);
        await this.cartSummaryPaymentButton.click({ force: true, delay: 300 });
    }

    async clickCartPaymentConfirmationButton() {
        await expect(this.cartPaymentConfirmationButton).toHaveCSS('background-color', /rgb\((0, 79, 36|0, 47, 22)\)/);
        await this.cartPaymentConfirmationButton.click({ force: true, delay: 300 });
    }
}