import { test as base } from '@playwright/test';
import { LoginPage } from '../page/Login.page.ts';
import { CommonPage } from '../page/Common.page.ts';
import { SearchbarPage } from '../page/Searchbar.page.ts';
import { CartPage } from '../page/Cart.page.ts';
import { DeliveryPage } from '../page/Delivery.page.ts';
import { DeliveryAddressesPage } from '../page/Profile/DeliveryAddresses.page.ts';
import { MainPage } from '../page/Main.page.ts';
import { ProfilePage } from '../page/Profile/Profile.page.ts';
import { NonLoggedUserPage } from '../page/NonLoggedUser.page.ts';
import { ProductsListPage } from '../page/ProductsList.page.ts';
import { PaymentsPage } from '../page/Payments.page.ts';
import { OrderDetailsPage } from '../page/Profile/OrderDetails.page.ts';
import { OrdersListPage } from '../page/Profile/OrdersList.page.ts';

type PageObjectsFixtures = {
    loginPage: LoginPage;
    commonPage: CommonPage;
    searchbarPage: SearchbarPage;
    cartPage: CartPage;
    deliveryPage: DeliveryPage;
    deliveryAddressesPage: DeliveryAddressesPage;
    mainPage: MainPage;
    profilePage: ProfilePage;
    nonLoggedUserPage: NonLoggedUserPage;
    productsListPage: ProductsListPage;
    paymentsPage: PaymentsPage;
    orderDetailsPage: OrderDetailsPage;
    ordersListPage: OrdersListPage;
};

export const test = base.extend<PageObjectsFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
    commonPage: async ({ page }, use) => { await use(new CommonPage(page)); },
    searchbarPage: async ({ page }, use) => { await use(new SearchbarPage(page)); },
    cartPage: async ({ page }, use) => { await use(new CartPage(page)); },
    deliveryPage: async ({ page }, use) => { await use(new DeliveryPage(page)); },
    deliveryAddressesPage: async ({ page }, use) => { await use(new DeliveryAddressesPage(page)); },
    mainPage: async ({ page }, use) => { await use(new MainPage(page)); },
    profilePage: async ({ page }, use) => { await use(new ProfilePage(page)); },
    nonLoggedUserPage: async ({ page }, use) => { await use(new NonLoggedUserPage(page)); },
    productsListPage: async ({ page }, use) => { await use(new ProductsListPage(page)); },
    paymentsPage: async ({ page }, use) => { await use(new PaymentsPage(page)); },
    orderDetailsPage: async ({ page }, use) => { await use(new OrderDetailsPage(page)); },
    ordersListPage: async ({ page }, use) => { await use(new OrdersListPage(page)); }
});

export { expect } from '@playwright/test';