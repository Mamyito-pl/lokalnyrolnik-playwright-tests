import { expect, type Locator, type Page } from '@playwright/test';
import { isMobile } from '../../utils/utility-methods';

export class DeliveryAddressesPage {
    private readonly page: Page;
    private readonly mobile: boolean;
    readonly addressModal: Locator;
    readonly addressModalAddressName: Locator;
    readonly addressModalUserName: Locator;
    readonly addressModalUserSurname: Locator;
    readonly addressModalUserPhoneNumber: Locator;
    readonly addressModalUserPostalCode: Locator;
    readonly addressModalUserCity: Locator;
    readonly addressModalUserStreet: Locator;
    readonly addressModalUserHouseNumber: Locator;
    readonly addressModalUserStaircase: Locator;
    readonly addressModalUserFlatNumber: Locator;
    readonly addressModalUserFloor: Locator;
    readonly addressModalUserDeliveryNotes: Locator;
    readonly addressModalSaveButton: Locator;
    readonly addressModalCancelButton: Locator;
    readonly addressModalConfirmationButton: Locator;
    readonly deliveryAddressSectionTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.mobile = isMobile(page);
        this.addressModal = page.locator('div[data-sentry-element="Modal"]');
        this.addressModalAddressName = page.locator('#delivery_address_name');
        this.addressModalUserName = page.locator('#delivery_address_first_name');
        this.addressModalUserSurname = page.locator('#delivery_address_last_name');
        this.addressModalUserPhoneNumber = page.locator('#delivery_address_phone');
        this.addressModalUserPostalCode = page.locator('#delivery_address_postal');
        this.addressModalUserCity = page.locator('#delivery_address_city');
        this.addressModalUserStreet = page.locator('#delivery_address_street');
        this.addressModalUserHouseNumber = page.locator('#delivery_address_house_number');
        this.addressModalUserStaircase = page.locator('#delivery_address_staircase');
        this.addressModalUserFlatNumber = page.locator('#delivery_address_flat_number');
        this.addressModalUserFloor = page.locator('#delivery_address_floor');
        this.addressModalUserDeliveryNotes = page.locator('#delivery_address_client_delivery_notes');
        this.addressModalSaveButton = page.getByRole('button', { name: 'Zapisz' });
        this.addressModalCancelButton = page.getByRole('button', { name: 'Anuluj' });
        this.addressModalConfirmationButton = page.getByRole('button', { name: 'Potwierdź' });
        this.deliveryAddressSectionTitle = page.locator('#profile_details_delivery_addresses').getByText('Adresy dostaw');
    }

    async clickEditAddressButton(addressName: string) {
        const editButton = this.page.getByText(addressName).locator('..').locator('..').locator('..').locator('div').locator('div').locator('svg[class*="tabler-icon tabler-icon-pencil "]');
        await editButton.click();
    }

    async clickDeleteAddressButton(addressName: string) {
        return this.page.getByText(addressName).locator('..').locator('..').locator('..').locator('div').locator('div').locator('svg[class*="tabler-icon tabler-icon-trash "]').click();
    }

    addressModalDeleteAddressName(addressName: string) {
        return this.addressModal.locator(`div[data-sentry-element="AddressName"]:has-text("${addressName}")`);
    }

    async clickAddressModalSaveButton() {
        await this.addressModalSaveButton.click();
    }
}