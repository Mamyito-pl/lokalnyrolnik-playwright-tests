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

  test.describe('Przekierowania z modala profilu', () => {
  
    test('W | Po kliknięciu "Wyloguj się" w modalu profilu użytkownik jest zostaje wylogowany', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, baseURL, mainPage, profilePage, nonLoggedUserPage }) => {
    
      await allure.tags('Web', 'Profil');
      await allure.epic('Webowe');
      await allure.parentSuite('Profil');
      await allure.suite('Testy profilu');
      await allure.subSuite('Przekierowania z modala profilu');
      await allure.allureId('3910');
        
      await expect(mainPage.profileButton).toBeVisible({ timeout: 10000 });
      await mainPage.profileButton.click();
      await expect(profilePage.profileMenuTitle).toBeVisible();
      await expect(profilePage.profileMenuLogoutButton).toBeVisible();
      await profilePage.profileMenuLogoutButton.click();
      await expect(nonLoggedUserPage.addDeliveryAddressButton).toBeVisible({ timeout: 10000 });
      await expect(nonLoggedUserPage.addDeliveryAddressButton).toBeVisible({ timeout: 10000 });
      await expect(profilePage.profileMenuTitle).not.toBeVisible({ timeout: 10000 });
      await expect(page).toHaveURL(`${baseURL}`, { timeout: 10000 });
    })   
  })
})
