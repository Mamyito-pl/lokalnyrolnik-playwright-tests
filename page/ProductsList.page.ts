import { type Locator, type Page } from '@playwright/test';

export class ProductsListPage {
    private readonly page: Page;
    readonly productCardAddButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productCardAddButton = page.locator('div[data-sentry-component="ProductCard"]').getByText('Do koszyka');
    }

    productCategoryTitle(titleName: string): Locator {
        return this.page.getByRole('heading', { name: titleName }).first();
    }
}