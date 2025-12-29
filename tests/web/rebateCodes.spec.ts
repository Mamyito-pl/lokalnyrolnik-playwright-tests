import { test, expect } from '../../fixtures/fixtures.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../utils/utility-methods';

test.describe('Testy kodów rabatowych', async () => {

  let product: string = 'bulion kolagenowy';

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/logowanie`, { waitUntil: 'networkidle' });
    await utility.addGlobalStyles(page);

    page.on('framenavigated', async () => {
      await utility.addGlobalStyles(page);
    });
  })

  test.afterEach(async ({ clearCartViaAPI }) => {

    await clearCartViaAPI();
  })

  test('W | Możliwość dodania kodu rabatowego do koszyka i jego usunięcia', { tag: ['@ProdSmoke'] }, async ({ page, baseURL, commonPage, cartPage, addBiggerAmountProduct }) => {

    await allure.tags('Web', 'Logowanie');
    await allure.epic('Webowe');
    await allure.parentSuite('Kody rabatowe');
    await allure.suite('Testy kodów rabatowych');
    await allure.subSuite('');
    await allure.allureId('3982');

    await addBiggerAmountProduct(product);

    await page.goto('/koszyk', { waitUntil: 'load'});
    await expect(page).toHaveURL(`${baseURL}` + '/koszyk');
    await commonPage.waitForProductsInCart();

    const originalTotalFormatted = await cartPage.getTotalSummaryValueFormatted();
    const originalTotalParsed = cartPage.parseFormattedPrice(originalTotalFormatted);

    await cartPage.openAvailableCodesDrawer();

    const codeDetails = await cartPage.getFirstAvailableCodeDetails();
    const formattedDiscountValue = cartPage.formatDiscountValue(codeDetails.discountValue);

    await cartPage.validateCodeCardAppearance(codeDetails);

    await cartPage.applyDiscountCode(codeDetails.button);

    await cartPage.validateAppliedDiscountCode(formattedDiscountValue);

    const cleanDiscountSummaryFormatted = formattedDiscountValue.replace(/\s+/g, ' ');
    expect(cleanDiscountSummaryFormatted).toContain(formattedDiscountValue);

    await cartPage.validateDiscountCalculation(originalTotalParsed, formattedDiscountValue);

    await cartPage.removeDiscountCode();

    const finalTotalFormatted = await cartPage.getTotalSummaryValueFormatted();
    const finalTotalParsed = cartPage.parseFormattedPrice(finalTotalFormatted);
    
    console.log('Końcowa wartość koszyka:', finalTotalFormatted);
    await cartPage.validatePriceRestoration(originalTotalParsed, finalTotalParsed);
  })
})

