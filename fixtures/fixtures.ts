import { test as base } from './pages.fixture';
import addressData from '../test-data/addresses.json';

type MyFixtures = {
    addProduct: (prodctName: string) => Promise<void>;
    addBiggerAmountProduct: (productName: string) => Promise<void>;
    clearCartViaAPI: () => Promise<void>;
    addAddressDeliveryViaAPI: (addressName: string, addressType?: 'defaultDeliveryAddress' | 'alternativeDeliveryAddress') => Promise<void>;
    deleteDeliveryAddressViaAPI: (addressName: string) => Promise<void>;
    addInvoiceAddressViaAPI: (addressName: string, addressType?: 'defaultInvoiceAddress' | 'alternativeInvoiceAddress') => Promise<void>;
    deleteInvoiceAddressViaAPI: (addressName: string) => Promise<void>;
    addInvoiceAddress: (addressName: string, addressType?: 'defaultInvoiceAddress' | 'alternativeInvoiceAddress') => Promise<void>;
    detachDeliverySlotViaAPI: () => Promise<void>;
    addProductsByValue: (maxValue: number) => Promise<void>;
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

  addBiggerAmountProduct: async ({ page, searchbarPage, commonPage }, use) => {
    await use(async (product: string) => {
      await searchbarPage.clickSearchbar();
      await page.waitForTimeout(1000);
      await searchbarPage.enterProduct(product);
      await expect(commonPage.getLoader).toBeHidden({ timeout: 15000 });
      await page.waitForTimeout(1000);
      await searchbarPage.productSearchAddButton.first().click({ force: true, delay: 300 });
      await page.waitForTimeout(4000);
      await searchbarPage.productItemCount.click();
      await page.waitForTimeout(1000);
      await searchbarPage.productItemCount.type('1');
      await commonPage.cartButton.click();
      await page.waitForTimeout(1000);
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

  addAddressDeliveryViaAPI: async ({ request }, use) => {
    const addAddressDeliveryViaAPI = async (addressName: string, addressType: 'defaultDeliveryAddress' | 'alternativeDeliveryAddress' = 'defaultDeliveryAddress'): Promise<void> => {
    
      const { data: { token } } = await (await request.post(`${process.env.APIURL}/api/login`, {
        headers: { Accept: 'application/json' },
        data: { email: process.env.EMAIL, password: process.env.PASSWORD },
      })).json();

      const selectedAddress = addressData[addressType];
      
      const addDeliveryResponse = await request.post(`${process.env.APIURL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          ...selectedAddress,
          name: addressName,
        },
      });

      expect(addDeliveryResponse.status()).toBe(201);
    };
    
    await use(addAddressDeliveryViaAPI);
  },

  deleteDeliveryAddressViaAPI: async ({ request }, use) => {
    const deleteDeliveryAddressViaAPI = async (addressName: string): Promise<void> => {
      
      const tokenResponse = await request.post(`${process.env.APIURL}/api/login`, {
        headers: {
          'Accept': 'application/json'
      },
        data: {
          email: `${process.env.EMAIL}`,
          password: `${process.env.PASSWORD}`,
        },
      });

      const responseBodyToken = await tokenResponse.json();

      const token = responseBodyToken.data.token;

      const deliveryAddressesResponse = await request.get(`${process.env.APIURL}/api/addresses/delivery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const responseBodyAddresses = await deliveryAddressesResponse.json();
      const addresses = responseBodyAddresses.data;

      const addressToDelete = addresses.find(address => address.name === addressName);

      if (!addressToDelete) {
        return;
      }

      const deliveryAddress_id = addressToDelete.id;

      const deleteDeliveryAddress = await request.delete(`${process.env.APIURL}/api/addresses/${deliveryAddress_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(deleteDeliveryAddress.status()).toBe(204);
    };
    
    await use(deleteDeliveryAddressViaAPI);
  },

  detachDeliverySlotViaAPI: async ({ request }, use) => {
    const detachDeliverySlotViaAPI = async (): Promise<void> => {

      const { data: { token } } = await (await request.post(`${process.env.APIURL}/api/login`, {
        headers: { Accept: 'application/json' },
        data: {
          email: process.env.EMAIL,
          password: process.env.PASSWORD,
        },
      })).json();
  
      const { data: { id: cartId, items } } = await (await request.post(`${process.env.APIURL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      })).json();
  
      if (!items?.length) return;
  
      const detachResponse = await request.patch(`${process.env.APIURL}/api/cart/${cartId}/detach`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      expect(detachResponse.status()).toBe(200);
    };
  
    await use(detachDeliverySlotViaAPI);
  },

  addInvoiceAddressViaAPI: async ({ request }, use) => {
    const addInvoiceAddressViaAPI = async (addressName: string, addressType: 'defaultInvoiceAddress' | 'alternativeInvoiceAddress' = 'defaultInvoiceAddress'): Promise<void> => {
    
      const { data: { token } } = await (await request.post(`${process.env.APIURL}/api/login`, {
        headers: { Accept: 'application/json' },
        data: { email: process.env.EMAIL, password: process.env.PASSWORD },
      })).json();

      const selectedAddress = addressData[addressType];
      
      const addInvoiceResponse = await request.post(`${process.env.APIURL}/api/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
        data: {
          ...selectedAddress,
          name: addressName,
        },
      });

      expect(addInvoiceResponse.status()).toBe(201);
    };
    
    await use(addInvoiceAddressViaAPI);
  },

  addInvoiceAddress: async ({ page, invoiceAddressesPage, deliveryPage, commonPage }, use) => {

    const addPersonalInvoiceAddressDelivery = async (addressName: string, addressType: 'defaultInvoiceAddress' | 'alternativeInvoiceAddress' = 'defaultInvoiceAddress') => {
      
      const selectedAddress = addressData[addressType];


      await expect(commonPage.cartButton).toBeVisible({ timeout: 10000 });
      await invoiceAddressesPage.clickAddNewInvoiceAddressButton();
      await page.waitForSelector('div[data-sentry-element="Modal"]', { state: 'visible', timeout: 10000 });
      
      await invoiceAddressesPage.invoiceModalAddressName.fill(addressName);
      await invoiceAddressesPage.invoiceModalUserName.fill(selectedAddress.first_name);
      await invoiceAddressesPage.invoiceModalUserSurname.fill(selectedAddress.last_name);
      await invoiceAddressesPage.invoiceModalCompanyName.fill(selectedAddress.company_name);
      await invoiceAddressesPage.invoiceModalNIP.fill(selectedAddress.nip);
      await invoiceAddressesPage.invoiceModalUserPostalCode.fill(selectedAddress.postal_code);
      await invoiceAddressesPage.invoiceModalUserCity.fill(selectedAddress.city);
      await invoiceAddressesPage.invoiceModalUserStreet.fill(selectedAddress.street);
      await invoiceAddressesPage.invoiceModalUserHouseNumber.fill(selectedAddress.house_number);
      await invoiceAddressesPage.invoiceModalUserFlatNumber.fill(selectedAddress.flat_number);
      await deliveryPage.clickAddressModalSaveButton();
      await page.waitForTimeout(3000)

      await page.getByText(addressName).isVisible();
    };
    await use(addPersonalInvoiceAddressDelivery);
  },

  deleteInvoiceAddressViaAPI: async ({ request }, use) => {
    const deleteInvoiceAddressViaAPI = async (addressName: string): Promise<void> => {
      
      const tokenResponse = await request.post(`${process.env.APIURL}/api/login`, {
        headers: {
          'Accept': 'application/json'
      },
        data: {
          email: `${process.env.EMAIL}`,
          password: `${process.env.PASSWORD}`,
        },
      });

      const responseBodyToken = await tokenResponse.json();

      const token = responseBodyToken.data.token;

      const invoiceAddressesResponse = await request.get(`${process.env.APIURL}/api/addresses/invoice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const responseBodyAddresses = await invoiceAddressesResponse.json();
      const addresses = responseBodyAddresses.data;

      const addressToDelete = addresses.find(address => address.name === addressName);

      if (!addressToDelete) {
        return;
      }

      const invoiceAddress_id = addressToDelete.id;

      const deleteInvoiceAddress = await request.delete(`${process.env.APIURL}/api/addresses/${invoiceAddress_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      expect(deleteInvoiceAddress.status()).toBe(204);
    };
    
    await use(deleteInvoiceAddressViaAPI);
  },

  addProductsByValue: async ({ page, productsListPage }, use) => {

    const addProductsByValue = async (maxValue: number): Promise<void> => {
      let currentValue = 0;
      let addedCount = 0;
      
      if (`${process.env.URL}` == 'https://lokalnyrolnik.pl') {
        await page.goto(`${process.env.URL}/dania-gotowe`, { waitUntil: 'load' });
      } else {
        await page.goto(`${process.env.URL}/dania-gotowe-4`, { waitUntil: 'load' });
      }
      await productsListPage.productCategoryTitle('Dania gotowe').waitFor({ state: 'visible', timeout: 15000 });
      await page.waitForTimeout(10000);

      const productPriceElements = await page.locator('[data-cy="product-card-current-price"]').all();
      const limitedElements = productPriceElements.slice(0, 12);
      const productPrices: number[] = [];
      
      for (let i = 0; i < limitedElements.length; i++) {
        const priceText = await limitedElements[i].textContent();
        if (priceText !== null) {
          const priceValue = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));
          if (!isNaN(priceValue)) {
            productPrices.push(priceValue);
          }
        }
      }
      
      console.log(`Dostępne ceny produktów: ${productPrices.join(', ')}zł`);

      for (let i = 0; i < productPrices.length && currentValue < maxValue; i++) {
        const priceValue = productPrices[i];
        
        if ((currentValue + priceValue) <= maxValue) {
          await productsListPage.productCardAddButton.first().click({ force: true, delay: 300 });
          await page.waitForTimeout(3000);
          currentValue += priceValue;
          addedCount++;
          
          console.log(`Dodano produkt za ${priceValue}zł, łączna wartość: ${currentValue}zł`);
        } else {
          console.log(`Pominięto produkt za ${priceValue}zł (suma ${currentValue + priceValue}zł przekroczyłaby maksimum ${maxValue}zł)`);
        }
      }
      
      if (currentValue >= 150) {
        console.log(`✅ Dodano ${addedCount} produktów na łączną wartość: ${currentValue}zł (przedział 150-${maxValue}zł)`);
      } else {
        console.log(`❌ Dodano ${addedCount} produktów na łączną wartość: ${currentValue}zł - nie osiągnięto minimum 150zł`);
      }
    };

    await use(addProductsByValue);
  }
});

export const expect = test.expect;