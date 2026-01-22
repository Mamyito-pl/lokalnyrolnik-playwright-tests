import { expect, type Locator, type Page } from '@playwright/test';
import { DeliveryPage } from './Delivery.page';

export class PaymentsPage extends DeliveryPage {
    readonly page: Page;
    readonly baseURL: string;
    readonly orderDetailsButton: Locator;
    readonly repeatOrderButton: Locator;
    readonly backHomeButton: Locator;
    readonly statueCheckbox: Locator;
    readonly blikCodeInput: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.baseURL = page.url();
        this.orderDetailsButton = page.getByRole('button', { name: 'Szczegóły zamówienia' });
        this.repeatOrderButton = page.getByRole('button', { name: 'Zamów ponownie' });
        this.backHomeButton = page.locator('button:has-text("Wróć do sklepu")');
        this.statueCheckbox = page.getByText('Akceptuję').locator('..').locator('span');
        this.blikCodeInput = page.locator('input[name="blikCode"]');
    }

    async clickOrderDetailsButton() {
        await this.orderDetailsButton.click();
    }

    async checkStatue() {
        await this.statueCheckbox.check();
    }

    async enterBlikCode(blikCode: string) {
        await this.page.getByText('Kod BLIK', { exact: true }).click({ force: true });
        await this.blikCodeInput.fill(blikCode);
    }

    async selectDpay() {
        await this.page.locator('#Dpay').click({ force: true });
    }

    async selectCardPayment() {
        await this.page.locator('input[name="Płatność kartą online"]').click({ force: true });
    }

    async setDeliveryFormAndSlot(addressName: string) {
        await this.page.waitForSelector(`text=${addressName}`, { state: 'visible' });
        await this.page.getByText(addressName).click({ force: true, delay: 300 });
        await this.deliveryTypeButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.clickDeliveryType(0);
        await this.deliveryDayButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.clickDeliveryDay(0);
        await this.deliverySlotButton.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.deliverySlotButton.first().click();
    }

    async verifySummaryFields() {
        await expect(this.page).toHaveURL(new RegExp(`${this.baseURL}` + 'podsumowanie'), { timeout: 20000 });
        await expect(this.page.getByText('Przetwarzanie płatności....')).toBeVisible({ timeout: 20000 });
        await expect(this.page.getByText('Nr zamówienia: ')).toBeVisible();
        await expect(this.orderDetailsButton).toBeVisible();
        await expect(this.repeatOrderButton).toBeVisible();
        
        if (this.mobile === true) {
            await this.page.evaluate(async () => {
                window.scrollBy(0, 300)
                await new Promise(r => setTimeout(r, 700));
            })
        } else {
            return;
        };

        await expect(this.backHomeButton).toBeVisible();
    }

    async statusIsVisible() {
        const statusBeforeCancelIsVisible = await this.page.locator('div[data-sentry-element="HeaderOrderDetails"]').evaluate((element) => {
            const textContent = element.textContent || '';
            return textContent.includes('Oczekuje na płatność') || textContent.includes('Nowe');
        });

        expect(statusBeforeCancelIsVisible).toBe(true);
    }

    async canceledStatusIsVisible() {
        const statusAfterCancelIsVisible = await this.page.locator('#ordersHeadline').locator('..').last().first().evaluate((element) => {
            const textContent = element.textContent || '';
            return textContent.includes('Anulowane');
        });

        expect(statusAfterCancelIsVisible).toBe(true);
    }

    async verifyDpayUrl() {
        if (`${process.env.URL}` == 'https://lokalnyrolnik.pl') {
            await expect(this.page).toHaveURL(new RegExp('^https://gateway.dpay.pl/pl/pay/.*'), { timeout: 20000 });
        } else {
            await expect(this.page).toHaveURL(new RegExp('^https://secure.dpay.pl/transfer@pay@.*'), { timeout: 20000 });
        };
    }
}