import { test, expect } from '../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../utils/utility-methods';

test.describe('Testy płatności', async () => {

  test.beforeEach(async ({ page, addAddressDeliveryViaAPI }) => {

    await addAddressDeliveryViaAPI('Adres Testowy', 'defaultDeliveryAddress');
    
    await page.goto('/', { waitUntil: 'load'});
    await utility.addGlobalStyles(page);

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test.afterEach(async ({ clearCartViaAPI, deleteDeliveryAddressViaAPI }) => {

    await deleteDeliveryAddressViaAPI('Adres Testowy');
    await clearCartViaAPI();
  })

  test.describe('Płatność BLIK', () => {
    
    test('W | Zapłata nieprawidłowym kodem BLIK powinna utworzyć zamówienie', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, paymentsPage, orderDetailsPage, cartPage, commonPage, deliveryPage, baseURL, addProductsByValue }) => {

      await allure.tags('Web', 'Płatności');
      await allure.epic('Webowe');
      await allure.parentSuite('Płatności');
      await allure.suite('Testy płatności');
      await allure.subSuite('Płatność BLIK');
      await allure.allureId('3945');
    
      test.setTimeout(230000);
    
      await addProductsByValue(180);
      await commonPage.cartButton.click();
    
      await cartPage.clickCartDrawerToCartButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/koszyk'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForSelector('div[data-sentry-element="InsideWrapper"]', { timeout: 10000 });
      await cartPage.clickCartSummaryButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/dostawa'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      if (await deliveryPage.closeAddressModalButton.isVisible({ timeout: 5000 })) {
        await deliveryPage.clickCloseAddressModalButton();
      }
      await paymentsPage.setDeliveryFormAndSlot('Adres Testowy');
      await cartPage.clickCartSummaryPaymentButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/platnosc'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      await paymentsPage.checkStatue();
      await page.waitForTimeout(1000);
      await paymentsPage.enterBlikCode('123123');
      await cartPage.clickCartPaymentConfirmationButton();
    
      await paymentsPage.verifySummaryFields();
    
      await paymentsPage.clickOrderDetailsButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia\\?order=.*'), { timeout: 30000 });
    
      await paymentsPage.statusIsVisible();
        
      await orderDetailsPage.clickCancelOrderButton();
    
      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await (expect(commonPage.modal.getByText('Anulowanie zamówienia'))).toBeVisible();
      await expect(orderDetailsPage.cancelConfirmationButton).toBeVisible();
        
      await orderDetailsPage.clickCancelConfirmationButtonUntilVisible();
    
      await page.waitForTimeout(2000);
    
      await paymentsPage.canceledStatusIsVisible();
    })
    
    test('W | Zapłata nieprawidłowym kodem BLIK', { tag: ['@ProdSmoke'] }, async ({ page, paymentsPage, orderDetailsPage, cartPage, commonPage, deliveryPage, baseURL, addProductsByValue }) => {

      await allure.tags('Web', 'Płatności');
      await allure.epic('Webowe');
      await allure.parentSuite('Płatności');
      await allure.suite('Testy płatności');
      await allure.subSuite('Płatność BLIK');
      await allure.allureId('4466');
    
      test.setTimeout(230000);
    
      await addProductsByValue(180);
      await commonPage.cartButton.click();
    
      await cartPage.clickCartDrawerToCartButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/koszyk'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForSelector('div[data-sentry-element="InsideWrapper"]', { timeout: 10000 });
      await cartPage.clickCartSummaryButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/dostawa'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      if (await deliveryPage.closeAddressModalButton.isVisible({ timeout: 5000 })) {
        await deliveryPage.clickCloseAddressModalButton();
      }
      await paymentsPage.setDeliveryFormAndSlot('Adres Testowy');
      await cartPage.clickCartSummaryPaymentButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/platnosc'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      await paymentsPage.checkStatue();
      await page.waitForTimeout(1000);
      await paymentsPage.enterBlikCode('123123');
      await cartPage.clickCartPaymentConfirmationButton();
    
      await paymentsPage.verifySummaryFields();
    
      await page.waitForSelector('text="Przetwarzanie płatności...."', { timeout: 145000, state: 'hidden' });
    
      await expect(page.getByText('Wystąpił błąd płatności')).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Sprawdź swój adres email, aby zobaczyć co poszło nie tak')).toBeVisible({ timeout: 5000 });
      await expect(page.getByText('Co chcesz zrobić?')).toBeVisible({ timeout: 5000 });
      await expect(paymentsPage.repeatOrderButton).toBeVisible({ timeout: 5000 });
    })
  })

  test.describe('Płatność kartą online', () => {
    
    test('W | Próba płatności kartą online powinna utworzyć zamówienie', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, paymentsPage, orderDetailsPage, cartPage, commonPage, deliveryPage, baseURL, ordersListPage, addProductsByValue }) => {

      await allure.tags('Web', 'Płatności');
      await allure.epic('Webowe');
      await allure.parentSuite('Płatności');
      await allure.suite('Testy płatności');
      await allure.subSuite('Płatność kartą online');
      await allure.allureId('4465');
    
      test.setTimeout(230000);
    
      await addProductsByValue(180);
      await commonPage.cartButton.click();
    
      await cartPage.clickCartDrawerToCartButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/koszyk'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForSelector('div[data-sentry-element="InsideWrapper"]', { timeout: 10000 });
      await cartPage.clickCartSummaryButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/dostawa'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      if (await deliveryPage.closeAddressModalButton.isVisible({ timeout: 5000 })) {
        await deliveryPage.clickCloseAddressModalButton();
      }
      await paymentsPage.setDeliveryFormAndSlot('Adres Testowy');
      await cartPage.clickCartSummaryPaymentButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/platnosc'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      await paymentsPage.checkStatue();
      await page.waitForTimeout(1000);
      await paymentsPage.selectCardPayment();
      await cartPage.clickCartPaymentConfirmationButton();
    
      await paymentsPage.verifyDpayUrl();
    
      await page.goto('profil/zamowienia', { waitUntil: 'load'});
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia'), { timeout: 20000 });
      await ordersListPage.orderDetailsButton.first().click();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia\\?order=.*'), { timeout: 20000 });
    
      await paymentsPage.statusIsVisible();
        
      await orderDetailsPage.clickCancelOrderButton();
    
      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await (expect(commonPage.modal.getByText('Anulowanie zamówienia'))).toBeVisible();
      await expect(orderDetailsPage.cancelConfirmationButton).toBeVisible();
        
      await orderDetailsPage.clickCancelConfirmationButtonUntilVisible();
    
      await page.waitForTimeout(2000);
    
      await paymentsPage.canceledStatusIsVisible();
    })
  })

  test.describe('Płatność dpay', () => {
    
    test('W | Próba płatności dpay powinna utworzyć zamówienie', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, paymentsPage, ordersListPage, orderDetailsPage, cartPage, commonPage, baseURL, addProductsByValue }) => {

      await allure.tags('Web', 'Płatności');
      await allure.epic('Webowe');
      await allure.parentSuite('Płatności');
      await allure.suite('Testy płatności');
      await allure.subSuite('Płatność dpay');
      await allure.allureId('3946');
    
      test.setTimeout(230000);
    
      await addProductsByValue(180);
      await commonPage.cartButton.click();
    
      await cartPage.clickCartDrawerToCartButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/koszyk'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForSelector('div[data-sentry-element="InsideWrapper"]', { timeout: 10000 });
      await cartPage.clickCartSummaryButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/dostawa'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      await paymentsPage.setDeliveryFormAndSlot('Adres Testowy');
      await cartPage.clickCartSummaryPaymentButton();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/platnosc'), { timeout: 20000 });
      await utility.addTestParam(page);
      await page.waitForTimeout(2000);
      await paymentsPage.checkStatue();
      await page.waitForTimeout(1000);
      await paymentsPage.selectDpay();
      await cartPage.clickCartPaymentConfirmationButton();
    
      await paymentsPage.verifyDpayUrl();
    
      await page.goto('profil/zamowienia', { waitUntil: 'load'});
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia'), { timeout: 20000 });
      await ordersListPage.orderDetailsButton.first().click();
      await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia\\?order=.*'), { timeout: 20000 });
    
      await paymentsPage.statusIsVisible();
        
      await orderDetailsPage.clickCancelOrderButton();
    
      await expect(commonPage.modal).toBeVisible({ timeout: 10000 });
      await (expect(commonPage.modal.getByText('Anulowanie zamówienia'))).toBeVisible();
      await expect(orderDetailsPage.cancelConfirmationButton).toBeVisible();
        
      await orderDetailsPage.clickCancelConfirmationButtonUntilVisible();
    
      await page.waitForTimeout(2000);
    
      await paymentsPage.canceledStatusIsVisible();
    })
  })
})

