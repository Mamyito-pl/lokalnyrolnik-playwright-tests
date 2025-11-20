import { test, expect } from '../../fixtures/pages.fixture.ts';
import * as allure from "allure-js-commons";
import * as utility from '../../utils/utility-methods';
import credentials from '../../test-data/credentials.json';
import messages from '../../test-data/messages.json';

test.describe('Testy logowania', async () => {

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/logowanie`);
    await utility.addGlobalStyles(page);
  })

  test.use({ storageState: { cookies: [], origins: [] }})
  test('W | Logowanie z poprawnymi danymi', { tag: ['@ProdSmoke', '@Smoke'] }, async ({ page, baseURL, loginPage }) => {

    await allure.tags('Web', 'Logowanie');
    await allure.epic('Webowe');
    await allure.parentSuite('Logowanie');
    await allure.suite('Testy logowania');
    await allure.subSuite('');
    await allure.allureId('3756');

    await loginPage.login(`${process.env.EMAIL}`, `${process.env.PASSWORD}`);
    await expect(page).toHaveURL(`${baseURL}`, { timeout: 10000 });
    await expect(loginPage.registerButton).toBeHidden({ timeout: 10000 });
  })

  test.use({ storageState: { cookies: [], origins: [] }})
  test('W | Logowanie z niepoprawnym emailem', { tag: ['@Prod', '@Beta', '@Test'] }, async ({ page, baseURL, loginPage, commonPage }) => {

    await allure.tags('Web', 'Logowanie');
    await allure.epic('Webowe');
    await allure.parentSuite('Logowanie');
    await allure.suite('Testy logowania');
    await allure.subSuite('');
    await allure.allureId('3790');

    await loginPage.login(credentials.invalidUser.email, `${process.env.PASSWORD}`);
    await expect(page).toHaveURL(`${baseURL}` + '/logowanie');
    await expect(commonPage.messageBox).toHaveText(messages.login.invalidEmail, { timeout: 10000 });
  })

  test.use({ storageState: { cookies: [], origins: [] }})
  test('W | Logowanie z niepoprawnym hasłem', { tag: ['@Prod', '@Beta', '@Test'] }, async ({ page, baseURL, loginPage, commonPage }) => {

    await allure.tags('Web', 'Logowanie');
    await allure.epic('Webowe');
    await allure.parentSuite('Logowanie');
    await allure.suite('Testy logowania');
    await allure.subSuite('');
    await allure.allureId('3791');
    
    await loginPage.login(`${process.env.EMAIL}`, credentials.invalidUser.password);
    await expect(page).toHaveURL(`${baseURL}` + '/logowanie');
    await expect(commonPage.messageBox).toHaveText(messages.login.invalidPassword, { timeout: 10000 });
  })
})

