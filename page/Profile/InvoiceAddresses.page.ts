import { expect, type Locator, type Page } from '@playwright/test';
import { CommonPage } from '../Common.page';

export class InvoiceAddressesPage extends CommonPage {
    readonly addNewInvoiceAddressButton: Locator;
    readonly invoiceModalAddressName: Locator;
    readonly invoiceModalCompanyName: Locator;
    readonly invoiceModalNIP: Locator;
    readonly invoiceModalUserName: Locator;
    readonly invoiceModalUserSurname: Locator;
    readonly invoiceModalUserPostalCode: Locator;
    readonly invoiceModalUserCity: Locator;
    readonly invoiceModalUserStreet: Locator;
    readonly invoiceModalUserHouseNumber: Locator;
    readonly invoiceModalUserFlatNumber: Locator;
    readonly invoiceAddressPageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.addNewInvoiceAddressButton = page.getByRole('button', { name: 'Dodaj nowy podmiot' });
        this.invoiceModalAddressName = page.locator('#invoice_address_name');
        this.invoiceModalCompanyName = page.locator('#invoice_address_company_name');
        this.invoiceModalNIP = page.locator('#invoice_address_nip');
        this.invoiceModalUserName = page.locator('#invoice_address_first_name');
        this.invoiceModalUserSurname = page.locator('#invoice_address_last_name');
        this.invoiceModalNIP = page.locator('#invoice_address_tax');
        this.invoiceModalUserPostalCode = page.locator('#invoice_address_postal');
        this.invoiceModalUserCity = page.locator('#invoice_address_city');
        this.invoiceModalUserStreet = page.locator('#invoice_address_street');
        this.invoiceModalUserHouseNumber = page.locator('#invoice_address_house_number');
        this.invoiceModalUserFlatNumber = page.locator('#invoice_address_flat_number');
        this.invoiceAddressPageTitle = page.locator('div[data-sentry-element="Title"]').getByText('Dane do faktury');
    }

    async clickAddNewInvoiceAddressButton() {
        await expect(this.addNewInvoiceAddressButton).toBeVisible({ timeout: 10000 });
        await this.addNewInvoiceAddressButton.click({ force: true, delay: 300 });
    }

    async clickEditAddressButton(addressName: string) {
        const editButton = this.page.getByText(addressName).locator('..').locator('..').locator('..').locator('div').locator('div').locator('svg[class*="tabler-icon tabler-icon-pencil "]');
        await editButton.click();
    }

    async clickDeleteAddressButton(addressName: string) {
        return this.page.getByText(addressName).locator('..').locator('..').locator('..').locator('div').locator('div').locator('svg[class*="tabler-icon tabler-icon-trash "]').click();
    }

    addressModalDeleteAddressName(addressName: string) {
        return this.modal.locator(`h3[data-sentry-element="AddressName"]:has-text("${addressName}")`);
    }

    async EmptyCompanyInvoicesListNotificationIsVisible() {
        return this.page.getByText('Nie dodano jeszcze żadnych danych do faktury firmowej.').isVisible();
    }
}