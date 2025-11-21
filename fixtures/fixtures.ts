import { test as base } from './pages.fixture';

type MyFixtures = {
    addProduct: (prodctName: string) => Promise<void>;
    clearCartViaAPI: () => Promise<void>;
}

export const test = base.extend<MyFixtures>({
  addProduct: async ({ page, searchbarPage, commonPage }, use) => {
    await use(async (product: string) => {
      await searchbarPage.clickSearchbar();
      await page.waitForTimeout(1000);
      await searchbarPage.enterProduct(product);
      await expect(commonPage.getLoader).toBeHidden({ timeout: 15000 });
      await page.waitForTimeout(1000);
      await searchbarPage.productSearchAddButton.first().click({ force: true, delay: 300 });
      await page.waitForTimeout(4000);
    });
  },

  clearCartViaAPI: async ({ request }, use) => {
    const clearCartViaAPI = async (): Promise<void> => {
    
      const { data: { token } } = await (await request.post(`${process.env.APIURL}/api/login`, {
        headers: { Accept: 'application/json' },
        data: { email: process.env.EMAIL, password: process.env.PASSWORD },
      })).json();

      const { data: { id: cartId, items } } = await (await request.post(`${process.env.APIURL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })).json();

      if (!items?.length) return;

      const deleteResponse = await request.delete(`${process.env.APIURL}/api/cart/${cartId}/items`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      expect(deleteResponse.status()).toBe(200);
    };
    
    await use(clearCartViaAPI);
  },
});

export const expect = test.expect;