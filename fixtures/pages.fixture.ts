import { test as base } from '@playwright/test';
import { LoginPage } from '../page/Login.page.ts';
import { CommonPage } from '../page/Common.page.ts';
import { SearchbarPage } from '../page/Searchbar.page.ts';
import { CartPage } from '../page/Cart.page.ts';

type PageObjectsFixtures = {
    loginPage: LoginPage;
    commonPage: CommonPage;
    searchbarPage: SearchbarPage;
    cartPage: CartPage;
};

export const test = base.extend<PageObjectsFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    commonPage: async ({ page }, use) => { await use(new CommonPage(page)); },
    searchbarPage: async ({ page }, use) => { await use(new SearchbarPage(page)); },
    cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
});

export { expect } from '@playwright/test';