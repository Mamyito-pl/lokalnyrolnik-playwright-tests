import { test as base } from '@playwright/test';
import { LoginPage } from '../page/Login.page.ts';
import { CommonPage } from '../page/Common.page.ts';

type PageObjectsFixtures = {
    loginPage: LoginPage;
    commonPage: CommonPage;
};

export const test = base.extend<PageObjectsFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    commonPage: async ({ page }, use) => { await use(new CommonPage(page)); },
});

export { expect } from '@playwright/test';