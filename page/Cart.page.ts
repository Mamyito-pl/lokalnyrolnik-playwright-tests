import { expect, type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class CartPage {
    private readonly page: Page;
    private readonly mobile: boolean;
    readonly cartProductsPrice: Locator;
    readonly productItemCount: Locator;
    readonly increaseProductButton: Locator;
    readonly decreaseProductButton: Locator;
    readonly deleteProductCartIcon: Locator;
    readonly deleteProductCartConfirmButton: Locator;
    readonly cartDrawerToCartButton: Locator;
    readonly cartSummaryButton: Locator;
    readonly cartSummaryPaymentButton: Locator;
    readonly cartPaymentConfirmationButton: Locator;
    readonly cartAvailableRebateCodesButton: Locator;
    readonly cartExpandCollapseButton: Locator;
    readonly totalSummaryValue: Locator;
    readonly cartCodesDrawer: Locator;
    readonly summaryDeleteDiscountCodeButton: Locator;
    readonly activeDiscountCodesTitle: Locator;
    readonly discountCodesTitle: Locator;
    readonly activeCodeValue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mobile = isMobile(page);
        this.cartProductsPrice = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #cart_button_mobile div[data-sentry-element="IconLabel"]' : 'div[data-sentry-element="WebContent"] div[data-sentry-element="Amount"]');
        this.productItemCount = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] div[class*="item_count_button"] div[data-sentry-element="ProductQuantityInput"] div input' : 'div[data-sentry-element="InsideWrapper"] div[class*="item_count_button"] div[data-sentry-element="ProductQuantityInput"] div input');
        this.increaseProductButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] svg[class*="tabler-icon tabler-icon-plus"]' : 'div[data-sentry-element="InsideWrapper"] svg[class*="tabler-icon tabler-icon-plus"]');
        this.decreaseProductButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] svg[class*="tabler-icon tabler-icon-minus"]' : 'div[data-sentry-element="InsideWrapper"] svg[class*="tabler-icon tabler-icon-minus"]');
        this.deleteProductCartIcon = page.locator('button[aria-label*="Usuń produkt"]');
        this.deleteProductCartConfirmButton = page.locator('div[data-sentry-element="ModalContent"]').getByText('Potwierdź');
        this.cartDrawerToCartButton = page.locator(this.mobile ? '[data-cy="mobile-drawer-checkout-button"]' : '[data-cy="desktop-drawer-checkout-button"]');
        this.cartSummaryButton = page.locator(this.mobile ? '[data-cy="mobile-cart-checkout-button"]' : '[data-cy="desktop-cart-checkout-button"]');
        this.cartSummaryPaymentButton = page.locator(this.mobile ? '[data-cy="mobile-delivery-checkout-button"]' : '[data-cy="desktop-delivery-checkout-button"]');
        this.cartPaymentConfirmationButton = page.locator(this.mobile ? '[data-cy="mobile-payment-checkout-button"]' : '[data-cy="desktop-payment-checkout-button"]');
        this.cartAvailableRebateCodesButton = page.getByRole('button', { name: 'Sprawdź dostępne kody' });
        this.cartExpandCollapseButton = page.locator('button[data-cy="cart-expand-button"]');
        this.totalSummaryValue = page.locator(this.mobile ? 'div[data-sentry-component="MobileSummary"] [data-cy="cart-summary-total-price"]' : '[data-sentry-element="SummaryColumn"] [data-cy="cart-summary-total-price"]');
        this.cartCodesDrawer = page.getByText('Kody rabatowe nie obejmują napojów alkoholowych.').locator('..');
        this.summaryDeleteDiscountCodeButton = page.getByRole('button', { name: 'Usuń', exact: true });
        this.activeDiscountCodesTitle = page.locator('div[data-cy="active-codes-description"]');
        this.discountCodesTitle = page.locator('div[data-cy="cart-summary-rebate-codes"]');
        this.activeCodeValue = page.locator(this.mobile ? 'div[data-sentry-component="MobileSummary"] [data-cy="active-codes-badge"]' : 'div[data-sentry-element="SummaryColumn"] [data-cy="active-codes-badge"]');
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

    async getTotalSummaryValueFormatted(): Promise<string> {
        const totalSummaryValue = await this.totalSummaryValue.last().textContent();
        return totalSummaryValue?.slice(10, -3) || '';
    }

    parseFormattedPrice(formattedPrice: string): number {
        return parseFloat(formattedPrice.replace(/\s/g, '').replace(',', '.'));
    }

    async openAvailableCodesDrawer() {
        await expect(this.cartAvailableRebateCodesButton).toBeVisible({ timeout: 15000 });
        await this.cartAvailableRebateCodesButton.click({ force: true, delay: 300 });
        await expect(this.cartCodesDrawer).toBeVisible({ timeout: 5000 });
        await this.page.waitForTimeout(1000);
    }

    async validateDiscountApplication(originalPrice: number, expectedDiscount: number, actualDiscountedPrice: number) {
        const discountDifference = originalPrice - actualDiscountedPrice;
        console.log('Obliczona różnica:', discountDifference, 'vs oczekiwany rabat:', expectedDiscount);
        expect(discountDifference).toBe(expectedDiscount);
    }

    async removeDiscountCode() {
        await expect(this.summaryDeleteDiscountCodeButton).toBeVisible();
        await this.summaryDeleteDiscountCodeButton.click();
        await expect(this.summaryDeleteDiscountCodeButton).not.toBeVisible({ timeout: 5000 });
        await expect(this.activeDiscountCodesTitle).not.toBeVisible({ timeout: 5000 });
        await expect(this.discountCodesTitle).not.toBeVisible({ timeout: 5000 });
    }

    async getFirstAvailableCodeDetails() {
        const codeCard = this.cartCodesDrawer.last().first();
        
        const color = await codeCard.locator('div[data-cy="rebate-code-value-wrapper"]').first()
            .evaluate((el) => window.getComputedStyle(el).backgroundColor);
        
        const discountValue = await codeCard.locator('div[data-cy="rebate-code-value-wrapper"] div').first().textContent() || '';
        
        const button = codeCard.locator('div[data-cy="rebate-code-actions-wrapper"] button').first();
        
        const information = codeCard.locator('div[data-cy="rebate-code-value-wrapper"] span').first();
        
        const name = await codeCard.locator('div[data-cy="rebate-code-description-wrapper"] div').first().textContent();

        return {
            color,
            discountValue,
            button,
            information,
            name
        };
    }

    formatDiscountValue(discountValue: string): string {
        if (discountValue.includes('%')) {

            let cleaned = discountValue.replace(/^−/, '').trim();
            
            const percentMatch = cleaned.match(/(\d+%)/);
            if (percentMatch) {
                cleaned = percentMatch[1];
            }
            
            return cleaned;
        }

        return discountValue.slice(1, -2) + ',00 zł';
    }

    async validateCodeCardAppearance(codeDetails: any) {
        expect(codeDetails.color).toBe('rgb(142, 190, 78)');
        await expect(codeDetails.button).toBeVisible();
        await expect(codeDetails.information).toHaveText('Możliwy do zrealizowania');
    }

    async applyDiscountCode(codeButton: any) {
        await codeButton.click();
        await expect(this.cartCodesDrawer).not.toBeVisible({ timeout: 5000 });
        await this.page.waitForTimeout(2000);
    }

    async getActiveCodeDiscountValue(): Promise<string> {
        const codeDiscountValue = await this.activeCodeValue.textContent();
        if (codeDiscountValue === null) {
            throw new Error('codeDiscountValue is null');
        }
        return codeDiscountValue;
    }

    async getDiscountCodeSummaryValue(): Promise<string> {
        const discountCodeSummaryValue = await this.discountCodesTitle.locator('..').last().textContent();
        if (discountCodeSummaryValue === null) {
            throw new Error('discountCodeSummaryValue is null');
        }
        return discountCodeSummaryValue;
    }

    async validatePriceRestoration(originalPrice: number, restoredPrice: number) {
        expect(restoredPrice).toBe(originalPrice);
    }

    isPercentageCode(discountValue: string): boolean {
        return discountValue.includes('%');
    }

    async validateAppliedDiscountCode(formattedDiscountValue: string) {
        await expect(this.activeCodeValue).toBeVisible({ timeout: 5000 });
        const activeCodeValue = await this.getActiveCodeDiscountValue();
        
        const isPercentageCode = this.isPercentageCode(formattedDiscountValue);
        
        let cleanActiveCodeValue: string;
        let cleanFormattedDiscountValue: string;
        
        if (isPercentageCode) {
            cleanActiveCodeValue = activeCodeValue.replace(/\s+/g, '');
            cleanFormattedDiscountValue = formattedDiscountValue.replace(/\s+/g, '');
        } else {
            cleanActiveCodeValue = activeCodeValue.replace(/\s+/g, '').slice(0, -6);
            cleanFormattedDiscountValue = formattedDiscountValue.replace(/\s+/g, '');
        }
        
        expect(cleanActiveCodeValue).toContain(cleanFormattedDiscountValue);
    }

    async validateDiscountCalculation(originalTotalParsed: number, formattedDiscountValue: string) {
        const totalAfterDiscountFormatted = await this.getTotalSummaryValueFormatted();
        const totalAfterDiscountParsed = this.parseFormattedPrice(totalAfterDiscountFormatted);

        console.log('=== WALIDACJA OBLICZENIA RABATU ===');
        console.log('Cena przed rabatem:', originalTotalParsed);
        console.log('Cena po rabacie:', totalAfterDiscountParsed, '(sformatowana:', totalAfterDiscountFormatted + ')');
        console.log('Wartość rabatu:', formattedDiscountValue);

        const isPercentageCode = this.isPercentageCode(formattedDiscountValue);

        if (isPercentageCode) {
            console.log('Typ kodu: PROCENTOWY');
            const difference = originalTotalParsed - totalAfterDiscountParsed;
            console.log('Różnica w cenie:', difference);
            expect(totalAfterDiscountParsed).toBeLessThan(originalTotalParsed);
        } else {
            console.log('Typ kodu: KWOTOWY');
            const discountValueParsed = this.parseFormattedPrice(formattedDiscountValue.slice(0, -2));
            const expectedTotal = originalTotalParsed - discountValueParsed;
            console.log('Oczekiwana cena końcowa:', expectedTotal);
            await this.validateDiscountApplication(originalTotalParsed, discountValueParsed, totalAfterDiscountParsed);
        }
        console.log('=== KONIEC WALIDACJI RABATU ===');
    }
}