import { test, expect } from '../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../utils/utility-methods';

test.describe.configure({ mode: 'serial' });

test.describe('Testy koszyka', () => {

  let product: string = 'dorsz';

  test.beforeEach(async ({ page, commonPage }) => {
    await page.goto('/', { waitUntil: 'load' });
    await commonPage.cartProductsPrice.waitFor({ state: 'visible', timeout: 10000 });
    await utility.addGlobalStyles(page);
    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test.afterEach(async ({ clearCartViaAPI }) => {
    await clearCartViaAPI();
  })

  test('W | Możliwość zwiększenia ilości produktu w koszyku', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, cartPage, addProduct }) => {

    await allure.tags('Web', 'Koszyk');
    await allure.epic('Webowe');
    await allure.parentSuite('Koszyk');
    await allure.suite('Testy koszyka');
    await allure.subSuite('');
    await allure.allureId('3831');

    await addProduct(product);

    await page.goto('/koszyk', { waitUntil: 'load'});
    await cartPage.productList.waitFor({ state: 'visible', timeout: 10000 });
    const productCount = await cartPage.productList.count();
    expect(productCount).toBe(1);
    await expect(cartPage.productItemCount).toHaveValue('1');
    await cartPage.clickIncreaseProductButton();
    await page.waitForTimeout(5000);
    await expect(cartPage.productItemCount).toHaveValue('2');
  })

  test('W | Możliwość zmniejszenia ilości produktu w koszyku', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, cartPage, addProduct }) => {

    await allure.tags('Web', 'Koszyk');
    await allure.epic('Webowe');
    await allure.parentSuite('Koszyk');
    await allure.suite('Testy koszyka');
    await allure.subSuite('');
    await allure.allureId('3832');

    await addProduct(product);

    await page.goto('/koszyk', { waitUntil: 'load'});
    await cartPage.productList.waitFor({ state: 'visible', timeout: 10000 });
    const productCount = await cartPage.productList.count();
    expect(productCount).toBe(1);
    await expect(cartPage.productItemCount).toHaveValue('1');
    for (let i = 0; i < 2; i++) {
      await cartPage.clickIncreaseProductButton();
      await page.waitForTimeout(5000);
    };
    await expect(cartPage.productItemCount).toHaveValue('3');
    for (let i = 0; i < 2; i++) {
      await cartPage.clickDecreaseProductButton();
      await page.waitForTimeout(5000);
    };
    await expect(cartPage.productItemCount).toHaveValue('1');
  })

  test('W | Możliwość usunięcia produktu z koszyka', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, cartPage, addProduct }) => {

    await allure.tags('Web', 'Koszyk');
    await allure.epic('Webowe');
    await allure.parentSuite('Koszyk');
    await allure.suite('Testy koszyka');
    await allure.subSuite('');
    await allure.allureId('3833');

    await addProduct(product);

    await page.goto('/koszyk', { waitUntil: 'load'});
    await cartPage.productList.waitFor({ state: 'visible', timeout: 10000 });
    const productCount = await cartPage.productList.count();
    expect(productCount).toBe(1);
    await expect(cartPage.productItemCount).toHaveValue('1');
    await cartPage.clickDeleteProductCartIcon();
    await cartPage.clickDeleteProductCartConfirmButton();
    await page.waitForTimeout(2000);
    const productCountAfterDelete = await cartPage.productList.count();
    expect(productCountAfterDelete).toBe(0);
  })

  test('W | Możliwość dodania produktu w ilości > 1 do koszyka', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, searchbarPage, cartPage, commonPage }) => {

    await allure.tags('Web', 'Koszyk');
    await allure.epic('Webowe');
    await allure.parentSuite('Koszyk');
    await allure.suite('Testy koszyka');
    await allure.subSuite('');
    await allure.allureId('3834');

    await searchbarPage.clickSearchbar();
    await page.waitForTimeout(1000);
    await searchbarPage.enterProduct(product);
    await searchbarPage.productSearchAddButton.first().click();
    await page.waitForTimeout(5000);
    await searchbarPage.clickIncreaseProductButton();
    await page.waitForTimeout(5000);
    await expect(searchbarPage.productItemCount).toHaveValue('2');
    await page.goto('/koszyk', { waitUntil: 'load'});
    await cartPage.productList.waitFor({ state: 'visible', timeout: 10000 });
    await commonPage.clickNotificationButton();
    const productCount = await cartPage.productList.count();
    expect(productCount).toBe(1);
    await expect(cartPage.productItemCount).toHaveValue('2');
  })
})