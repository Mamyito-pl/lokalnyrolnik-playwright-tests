import { test, expect } from '../../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../../utils/utility-methods';
import messages from '../../../test-data/messages.json';

test.describe.configure({ mode: 'serial' });

test.describe('Testy dane do faktury', async () => {

  let addressName: string = 'Testowa nazwa podmiotu';
  let addressName2: string = 'Fixturowa nazwa podmiotu';
  let addressName3: string = 'Edytowana nazwa podmiotu';

  test.beforeEach(async ({ page }) => {

    await page.goto('/', { waitUntil: 'networkidle' });

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });

    await page.goto('/profil/dane-faktury', { waitUntil: 'load' });

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test.afterEach(async ({ deleteInvoiceAddressViaAPI }) => {
    await deleteInvoiceAddressViaAPI(addressName);
    await deleteInvoiceAddressViaAPI(addressName2);
    await deleteInvoiceAddressViaAPI(addressName3);
  })
    
  test('M | Możliwość dodania danych do faktury', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage, invoiceAddressesPage }) => {

    await allure.tags('Mobilne', 'Profil');
    await allure.epic('Mobilne');
    await allure.parentSuite('Profil');
    await allure.suite('Testy dane do faktury');
    await allure.subSuite('');
    await allure.allureId('4015');

    test.setTimeout(100000);

    await expect(commonPage.cartButton).toBeVisible({ timeout: 10000 });

    await expect(invoiceAddressesPage.invoiceAddressPageTitle).toBeVisible();

    await invoiceAddressesPage.EmptyCompanyInvoicesListNotificationIsVisible();

    await invoiceAddressesPage.clickAddNewInvoiceAddressButton();

    await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
    await expect(commonPage.modal).toContainText('Dodaj nowy podmiot');

    await expect(invoiceAddressesPage.invoiceModalAddressName).toBeVisible();
    await invoiceAddressesPage.invoiceModalAddressName.fill(addressName);

    await expect(invoiceAddressesPage.invoiceModalUserName).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserName.fill('Jan');

    await expect(invoiceAddressesPage.invoiceModalUserSurname).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserSurname.fill('Kowalski')

    await expect(invoiceAddressesPage.invoiceModalCompanyName).toBeVisible();
    await invoiceAddressesPage.invoiceModalCompanyName.fill('Testowa nazwa firmy');

    await expect(invoiceAddressesPage.invoiceModalNIP).toBeVisible();
    await invoiceAddressesPage.invoiceModalNIP.fill('8140667487');

    await expect(invoiceAddressesPage.invoiceModalUserPostalCode).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserPostalCode.fill('00-133');

    await expect(invoiceAddressesPage.invoiceModalUserCity).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserCity.fill('Warszawa');

    await expect(invoiceAddressesPage.invoiceModalUserStreet).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserStreet.fill('aleja Jana Pawła II');

    await expect(invoiceAddressesPage.invoiceModalUserHouseNumber).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserHouseNumber.fill('10');

    await expect(invoiceAddressesPage.invoiceModalUserHouseNumber).toBeVisible();
    await invoiceAddressesPage.invoiceModalUserHouseNumber.fill('12');

    await expect(deliveryPage.addressModalSaveButton).toBeVisible();
    await deliveryPage.clickAddressModalSaveButton();

    await expect(commonPage.messageBox).toHaveText(messages.delivery.addressAdded, { timeout: 15000 });

    await page.waitForSelector(`text=${addressName}`, { state: 'visible' });
  })

  test('M | Możliwość edycji danych do faktury', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage, invoiceAddressesPage, addInvoiceAddress }) => {

    await allure.tags('Mobilne', 'Profil');
    await allure.epic('Mobilne');
    await allure.parentSuite('Profil');
    await allure.suite('Testy dane do faktury');
    await allure.subSuite('');
    await allure.allureId('4016');

    test.setTimeout(100000);

    await addInvoiceAddress(addressName2, 'defaultInvoiceAddress');

    await expect(invoiceAddressesPage.invoiceAddressPageTitle).toBeVisible();

    await page.getByText(addressName2).click({ force: true, delay: 300 });

    await invoiceAddressesPage.clickEditAddressButton(addressName2);

    await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
    await expect(commonPage.modal).toContainText('Edytuj podmiot');

    await expect(invoiceAddressesPage.invoiceModalAddressName).toHaveValue(addressName2)
    await invoiceAddressesPage.invoiceModalAddressName.fill(addressName3);

    await expect(invoiceAddressesPage.invoiceModalUserName).toHaveValue('Jan');
    await invoiceAddressesPage.invoiceModalUserName.fill('Anna');

    await expect(invoiceAddressesPage.invoiceModalUserSurname).toHaveValue('Kowalski');
    await invoiceAddressesPage.invoiceModalUserSurname.fill('Nowak');

    await expect(invoiceAddressesPage.invoiceModalCompanyName).toHaveValue('Testowa firma');
    await invoiceAddressesPage.invoiceModalCompanyName.fill('Edytowana nazwa firmy');

    await expect(invoiceAddressesPage.invoiceModalNIP).toHaveValue('8140667487');
    await invoiceAddressesPage.invoiceModalNIP.fill('1085179548');

    await expect(invoiceAddressesPage.invoiceModalUserPostalCode).toHaveValue('00-828');
    await invoiceAddressesPage.invoiceModalUserPostalCode.fill('05-506');

    await expect(invoiceAddressesPage.invoiceModalUserCity).toHaveValue('Warszawa');
    await invoiceAddressesPage.invoiceModalUserCity.fill('Lesznowola');

    await expect(invoiceAddressesPage.invoiceModalUserStreet).toHaveValue('aleja Jana Pawła II');
    await invoiceAddressesPage.invoiceModalUserStreet.fill('Oficerska');

    await expect(invoiceAddressesPage.invoiceModalUserHouseNumber).toHaveValue('1');
    await invoiceAddressesPage.invoiceModalUserHouseNumber.fill('2');

    await expect(invoiceAddressesPage.invoiceModalUserFlatNumber).toHaveValue('30');
    await invoiceAddressesPage.invoiceModalUserFlatNumber.fill('4');

    await expect(deliveryPage.addressModalSaveButton).toBeVisible();
    await deliveryPage.clickAddressModalSaveButton();

    await expect(commonPage.messageBox).toHaveText(messages.delivery.addressUpdated.replace('{{addressName}}', addressName3), { timeout: 15000 });
    await expect(commonPage.messageBox).not.toBeVisible({ timeout: 15000 });

    await deliveryPage.clickEditAddressButton(addressName3);

    await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
    await expect(commonPage.modal).toContainText('Edytuj podmiot');
    await expect(invoiceAddressesPage.invoiceModalAddressName).toHaveValue(addressName3)
    await expect(invoiceAddressesPage.invoiceModalUserName).toHaveValue('Anna');
    await expect(invoiceAddressesPage.invoiceModalUserSurname).toHaveValue('Nowak');
    await expect(invoiceAddressesPage.invoiceModalCompanyName).toHaveValue('Edytowana nazwa firmy');
    await expect(invoiceAddressesPage.invoiceModalNIP).toHaveValue('1085179548');
    await expect(invoiceAddressesPage.invoiceModalUserPostalCode).toHaveValue('05-506');
    await expect(invoiceAddressesPage.invoiceModalUserCity).toHaveValue('Lesznowola');
    await expect(invoiceAddressesPage.invoiceModalUserStreet).toHaveValue('Oficerska');
    await expect(invoiceAddressesPage.invoiceModalUserHouseNumber).toHaveValue('2');
    await expect(invoiceAddressesPage.invoiceModalUserFlatNumber).toHaveValue('4');
  })
  
  test('M | Możliwość usunięcia danych do faktury', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage, invoiceAddressesPage, addInvoiceAddress }) => {

    await allure.tags('Mobilne', 'Profil');
    await allure.epic('Mobilne');
    await allure.parentSuite('Profil');
    await allure.suite('Testy dane do faktury');
    await allure.subSuite('');
    await allure.allureId('4017');

    test.setTimeout(50000);

    await page.waitForTimeout(2000);

    await invoiceAddressesPage.invoiceAddressPageTitle.waitFor({ state: 'visible', timeout: 10000 })

    await addInvoiceAddress(addressName3, 'defaultInvoiceAddress');

    await invoiceAddressesPage.clickDeleteAddressButton(addressName3);

    await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
    await expect(commonPage.modal).toContainText('Potwierdź usunięcie adresu');
    await expect(deliveryPage.addressModalDeleteAddressName(addressName3)).toContainText(addressName3);
    await expect(deliveryPage.addressModalCancelButton).toBeVisible();
    await expect(deliveryPage.addressModalConfirmationButton).toBeVisible();
    await deliveryPage.addressModalConfirmationButton.click();
    await expect(commonPage.messageBox).toHaveText(messages.delivery.addressDeleted.replace('{{addressName}}', addressName3), { timeout: 15000 })
    await expect(commonPage.messageBox).not.toBeVisible({ timeout: 15000 });

    await page.waitForSelector(`text=${addressName3}`, { state: 'hidden' });
  })
})