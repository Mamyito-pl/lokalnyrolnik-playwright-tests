import { expect, type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class NonLoggedUserPage {
    private readonly mobile: boolean;
    readonly addDeliveryAddressButton: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.addDeliveryAddressButton = this.mobile ? page.locator('div[data-sentry-element="TabletContent"] [data-cy="delivery-no-user-icon"]').getByText('Adres', { exact: true }) : page.locator('div[data-sentry-element="WebContent"] [data-cy="delivery-no-user-icon"]').getByText('Dodaj adres dostawy', { exact: true });
    }
}