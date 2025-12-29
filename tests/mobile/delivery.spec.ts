import { test, expect } from '../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../utils/utility-methods';
import messages from '../../test-data/messages.json';

test.describe.configure({ mode: 'serial' });

test.describe('Testy dostawy', async () => {

  let addressName: string = 'Adres Testowy';
  let addressName2: string = 'Adres Fixturowy';
  let addressName3: string = 'Adres Edytowany';

  test.beforeEach(async ({ page }) => {

    await page.goto('/dostawa', { waitUntil: 'load' });

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test.afterEach(async ({ deleteDeliveryAddressViaAPI, detachDeliverySlotViaAPI }) => {

    await deleteDeliveryAddressViaAPI(addressName);
    await deleteDeliveryAddressViaAPI(addressName2);
    await deleteDeliveryAddressViaAPI(addressName3);
    await detachDeliverySlotViaAPI();
  })

  test.fixme('M | Możliwość wyboru formy dostawy', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, addAddressDeliveryViaAPI }) => {

    await allure.tags('Mobilne', 'Dostawa');
    await allure.epic('Mobilne');
    await allure.parentSuite('Dostawa');
    await allure.suite('Testy dostawy');
    await allure.subSuite('');
    await allure.allureId('3870');

    test.setTimeout(150000);

    await addAddressDeliveryViaAPI(addressName, 'alternativeDeliveryAddress');

    await page.goto('/dostawa', { waitUntil: 'load' });

    await page.waitForTimeout(2000);

    await page.waitForSelector(`text=${addressName}`, { state: 'visible' });
    await page.getByText(addressName).click({ force: true, delay: 300 });

    await deliveryPage.deliveryTypeButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await deliveryPage.clickDeliveryType(0);
    await deliveryPage.deliveryDayButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await deliveryPage.clickDeliveryDay(0);
    await deliveryPage.deliverySlotButton.first().waitFor({ state: 'visible', timeout: 10000 });
    const firstFormSlotHours = await deliveryPage.getDeliverySlotHours(0);
    await deliveryPage.clickDeliveryType(1);
    await deliveryPage.deliveryDayButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await deliveryPage.clickDeliveryDay(1);
    await deliveryPage.deliverySlotButton.first().waitFor({ state: 'visible', timeout: 10000 });
    const secondFormSlotHours = await deliveryPage.getDeliverySlotHours(0);
    
    expect(firstFormSlotHours).not.toEqual(secondFormSlotHours);
  })

  test('M | Możliwość wyboru terminu dostawy', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, addAddressDeliveryViaAPI, detachDeliverySlotViaAPI }) => {

    await allure.tags('Mobilne', 'Dostawa');
    await allure.epic('Mobilne');
    await allure.parentSuite('Dostawa');
    await allure.suite('Testy dostawy');
    await allure.subSuite('');
    await allure.allureId('3871');

    test.setTimeout(150000);

    await addAddressDeliveryViaAPI(addressName);

    await page.goto('/dostawa', { waitUntil: 'load' });

    await page.waitForTimeout(2000);

    await page.waitForSelector(`text=${addressName}`, { state: 'visible' });
    await page.getByText(addressName).click({ force: true, delay: 300 });

    await deliveryPage.deliveryTypeButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await deliveryPage.clickDeliveryType(0);
    await deliveryPage.deliveryDayButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await deliveryPage.clickDeliveryDay(0);
    await deliveryPage.deliverySlotButton.first().waitFor({ state: 'visible', timeout: 10000 });
    await expect(deliveryPage.deliverySlotButton.first()).not.toHaveCSS('background-color', 'rgb(142, 190, 78)');
    await deliveryPage.deliverySlotButton.first().click();
    await expect(deliveryPage.deliverySlotButton.first()).toHaveCSS('background-color', 'rgb(142, 190, 78)');
    await deliveryPage.deliverySlotButton.last().click();
    await expect(deliveryPage.deliverySlotButton.first()).not.toHaveCSS('background-color', 'rgb(142, 190, 78)');
    await expect(deliveryPage.deliverySlotButton.last()).toHaveCSS('background-color', 'rgb(142, 190, 78)');

    await detachDeliverySlotViaAPI();
  })

  test.describe('Adres dostawy', async () => {
    
    test('M | Możliwość dodania adresu dostawy', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage }) => {

      await allure.tags('Mobilne', 'Dostawa');
      await allure.epic('Mobilne');
      await allure.parentSuite('Dostawa');
      await allure.suite('Testy dostawy');
      await allure.subSuite('Adres dostawy');
      await allure.allureId('3867');

      test.setTimeout(100000);
      
      await page.goto('/dostawa', { waitUntil: 'load' });

      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await expect(commonPage.modal).toContainText('Dodaj nowy adres');

      await expect(deliveryPage.addressModalAddressName).toBeVisible();
      await deliveryPage.addressModalAddressName.fill(addressName);

      await expect(deliveryPage.addressModalUserName).toBeVisible();
      await deliveryPage.addressModalUserName.fill('Jan');

      await expect(deliveryPage.addressModalUserSurname).toBeVisible();
      await deliveryPage.addressModalUserSurname.fill('Kowalski')

      await expect(deliveryPage.addressModalUserPhoneNumber).toBeVisible();
      await deliveryPage.addressModalUserPhoneNumber.fill('555666777');

      await expect(deliveryPage.addressModalUserPostalCode).toBeVisible();
      await deliveryPage.addressModalUserPostalCode.fill('00-133');

      await expect(deliveryPage.addressModalUserCity).toBeVisible();
      await deliveryPage.addressModalUserCity.fill('Warszawa');

      await expect(deliveryPage.addressModalUserStreet).toBeVisible();
      await deliveryPage.addressModalUserStreet.fill('aleja Jana Pawła II');

      await expect(deliveryPage.addressModalUserHouseNumber).toBeVisible();
      await deliveryPage.addressModalUserHouseNumber.fill('20');

      await expect(deliveryPage.addressModalUserStaircase).toBeVisible();
      await deliveryPage.addressModalUserStaircase.fill('1');

      await expect(deliveryPage.addressModalUserFlatNumber).toBeVisible();
      await deliveryPage.addressModalUserFlatNumber.fill('30');

      await expect(deliveryPage.addressModalUserFloor).toBeVisible();
      await deliveryPage.addressModalUserFloor.fill('2');
                                                                                        
      await expect(deliveryPage.addressModalUserDeliveryNotes).toBeVisible();
      await deliveryPage.addressModalUserDeliveryNotes.fill('Testowa notatka');

      await expect(deliveryPage.addressModalSaveButton).toBeVisible();
      await deliveryPage.clickAddressModalSaveButton();

      await expect(commonPage.messageBox).toHaveText(messages.delivery.addressAdded, { timeout: 15000 });

      await page.waitForSelector(`text=${addressName}`, { state: 'visible' });
    })

    test('M | Możliwość edycji adresu dostawy', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage, addAddressDeliveryViaAPI }) => {

      await allure.tags('Mobilne', 'Dostawa');
      await allure.epic('Mobilne');
      await allure.parentSuite('Dostawa');
      await allure.suite('Testy dostawy');
      await allure.subSuite('Adres dostawy');
      await allure.allureId('3868');

      test.setTimeout(100000);

      await addAddressDeliveryViaAPI(addressName2);

      await page.goto('/dostawa', { waitUntil: 'load' });

      await page.waitForTimeout(2000);

      await page.getByText(addressName2).click({ force: true, delay: 300 });

      await deliveryPage.clickEditAddressButton(addressName2);

      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await expect(commonPage.modal).toContainText('Edytuj adres');

      await expect(deliveryPage.addressModalAddressName).toHaveValue(addressName2)
      await deliveryPage.addressModalAddressName.fill(addressName3);

      await expect(deliveryPage.addressModalUserName).toHaveValue('Jan');
      await deliveryPage.addressModalUserName.fill('Jan1');

      await expect(deliveryPage.addressModalUserSurname).toHaveValue('Kowalski');
      await deliveryPage.addressModalUserSurname.fill('Kowalski1');

      await expect(deliveryPage.addressModalUserPhoneNumber).toHaveValue('555666777');
      await deliveryPage.addressModalUserPhoneNumber.fill('777666555');

      await expect(deliveryPage.addressModalUserPostalCode).toHaveValue('00-828');
      await deliveryPage.addressModalUserPostalCode.fill('05-506');

      await expect(deliveryPage.addressModalUserCity).toHaveValue('Warszawa');
      await deliveryPage.addressModalUserCity.fill('Lesznowola');

      await expect(deliveryPage.addressModalUserStreet).toHaveValue('aleja Jana Pawła II');
      await deliveryPage.addressModalUserStreet.fill('Oficerska');

      await expect(deliveryPage.addressModalUserHouseNumber).toHaveValue('1');
      await deliveryPage.addressModalUserHouseNumber.fill('4');

      await expect(deliveryPage.addressModalUserStaircase).toHaveValue('1');
      await deliveryPage.addressModalUserStaircase.fill('2');

      await expect(deliveryPage.addressModalUserFlatNumber).toHaveValue('30');
      await deliveryPage.addressModalUserFlatNumber.fill('3');

      await expect(deliveryPage.addressModalUserFloor).toHaveValue('2');
      await deliveryPage.addressModalUserFloor.fill('77');
                                                                                    
      await expect(deliveryPage.addressModalUserDeliveryNotes).toHaveValue('Testowa notatka');
      await deliveryPage.addressModalUserDeliveryNotes.fill('Edytowana testowa notatka');

      await expect(deliveryPage.addressModalSaveButton).toBeVisible();
      await deliveryPage.clickAddressModalSaveButton();

      await expect(commonPage.messageBox).toHaveText(messages.delivery.addressUpdated.replace('{{addressName}}', addressName3), { timeout: 15000 });
      await expect(commonPage.messageBox).not.toBeVisible({ timeout: 15000 });

      await deliveryPage.clickEditAddressButton(addressName3);

      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await expect(commonPage.modal).toContainText('Edytuj adres');
      await expect(deliveryPage.addressModalAddressName).toHaveValue(addressName3)
      await expect(deliveryPage.addressModalUserName).toHaveValue('Jan1');
      await expect(deliveryPage.addressModalUserSurname).toHaveValue('Kowalski1');
      await expect(deliveryPage.addressModalUserPhoneNumber).toHaveValue('777666555');
      await expect(deliveryPage.addressModalUserPostalCode).toHaveValue('05-506');
      await expect(deliveryPage.addressModalUserCity).toHaveValue('Lesznowola');
      await expect(deliveryPage.addressModalUserStreet).toHaveValue('Oficerska');
      await expect(deliveryPage.addressModalUserHouseNumber).toHaveValue('4');
      await expect(deliveryPage.addressModalUserStaircase).toHaveValue('2');
      await expect(deliveryPage.addressModalUserFlatNumber).toHaveValue('3');
      await expect(deliveryPage.addressModalUserFloor).toHaveValue('77');                                                                                      
      await expect(deliveryPage.addressModalUserDeliveryNotes).toHaveValue('Edytowana testowa notatka');
    })
    
    test('M | Możliwość usunięcia adresu dostawy', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, deliveryPage, commonPage, addAddressDeliveryViaAPI }) => {

      await allure.tags('Mobilne', 'Dostawa');
      await allure.epic('Mobilne');
      await allure.parentSuite('Dostawa');
      await allure.suite('Testy dostawy');
      await allure.subSuite('Adres dostawy');
      await allure.allureId('3869');

      test.setTimeout(50000);

      await addAddressDeliveryViaAPI(addressName3);

      await page.goto('/dostawa', { waitUntil: 'load' });

      await page.waitForTimeout(2000);

      await deliveryPage.deliveryAddressSectionTitle.waitFor({ state: 'visible', timeout: 10000 })

      await deliveryPage.clickDeleteAddressButton(addressName3);

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
})