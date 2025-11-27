import { type Locator, type Page } from '@playwright/test';
import { DeliveryAddressesPage } from './Profile/DeliveryAddresses.page';

export class DeliveryPage extends DeliveryAddressesPage {
    readonly deliveryTypeButton: Locator;
    readonly deliveryDayButton: Locator;
    readonly deliverySlotButton: Locator;
    readonly deliverySlotHours: Locator;
    readonly deliveryAddressSectionTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryTypeButton = page.locator('div[aria-label="Metody dostawy"] label');
        this.deliveryDayButton = page.locator('div[data-sentry-element="DaysWrapper"] label');
        this.deliverySlotButton = page.locator('div[role="radio"] span');
        this.deliverySlotHours = page.locator('div[role="radio"] label');
        this.deliveryAddressSectionTitle = page.getByRole('heading', { name: 'Adres dostawy' });
    }

    async clickDeliveryType(number: number) {
        await this.deliveryTypeButton.nth(number).click();
    }

    async clickDeliveryDay(number: number) {
        await this.deliveryDayButton.nth(number).click();
    }

    async getDeliverySlotHours(number: number) {
        return await this.deliverySlotHours.nth(number).textContent();
    }
}