import { test, expect } from '../../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../../utils/utility-methods';

test.setTimeout(80000);

test.describe('Testy profilu', async () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'load' });
    await utility.addGlobalStyles(page);

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test('W | Możliwość przejścia do szczegółów zamówienia z listy zamówień', { tag: ['@ProdSmoke', '@Beta', '@Test'] }, async ({ page, ordersListPage, orderDetailsPage, baseURL }) => {
    
    await allure.tags('Web', 'Profil');
    await allure.epic('Webowe');
    await allure.parentSuite('Profil');
    await allure.suite('Testy szczegółów zamówienia');
    await allure.subSuite('');
    await allure.allureId('3948');
        
    await page.goto('/profil/zamowienia', { waitUntil: 'load'});

    await expect(ordersListPage.orderDetailsButton.first()).toBeVisible({ timeout: 20000 });
    await ordersListPage.orderDetailsButton.first().click();
    await expect(page).toHaveURL(new RegExp(`${baseURL}` + '/profil/zamowienia\\?order=.*'), { timeout: 30000 });
    await expect(orderDetailsPage.backToOrdersButton).toBeVisible({ timeout: 15000 });
  })   
})
