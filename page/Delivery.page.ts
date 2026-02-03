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
        this.deliveryTypeButton = page.locator('[name="deliveryMethod"]');
        this.deliveryDayButton = page.locator('[name="delivery-days"]');
        this.deliverySlotButton = page.locator('[name="delivery-slots"]');
        this.deliverySlotHours = page.locator('[name="delivery-slots"]').locator('..');
        this.deliveryAddressSectionTitle = page.getByRole('heading', { name: 'Adres dostawy' });
    }

    async clickDeliveryType(number: number) {
        await this.deliveryTypeButton.nth(number).click({ force: true, delay: 300 });
    }

    async clickDeliveryDay(number: number) {
        await this.deliveryDayButton.nth(number).click({ force: true, delay: 300 });
    }

    async getDeliverySlotHours(number: number) {
        return await this.deliverySlotHours.nth(number).textContent();
    }
}