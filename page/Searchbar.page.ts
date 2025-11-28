import { type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class SearchbarPage {
    private readonly mobile: boolean;
    readonly searchbarInput: Locator;
    readonly productSearchAddButton: Locator;
    readonly searchbarProductPrice: Locator;
    readonly increaseProductButton: Locator;
    readonly productItemCount: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.searchbarInput = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #search_hub_search_input' : 'div[data-sentry-element="WebContent"] #search_hub_search_input');
        this.productSearchAddButton = page.locator('div[data-testid="search-results"] div[data-sentry-component="ProductCard"]').getByText('Do koszyka');
        this.searchbarProductPrice = page.locator('div[data-sentry-element="HubContent"] div[data-sentry-element="BuyingContent"] p[data-cy="product-card-current-price"]');
        this.increaseProductButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] div[data-testid="search-results"] svg[class*="tabler-icon tabler-icon-plus"]' : 'div[data-sentry-element="WebContent"] div[data-testid="search-results"] svg[class*="tabler-icon tabler-icon-plus"]');
        this.productItemCount = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] div[data-testid="search-results"] div[data-sentry-element="ProductQuantityInput"] div input' : 'div[data-sentry-element="WebContent"] div[data-testid="search-results"] div[data-sentry-element="ProductQuantityInput"] div input');
    }

    async enterProduct(product: string) {
        await this.searchbarInput.fill(product);
    }

    async clickSearchbar() {
        await this.searchbarInput.click({ force: true });
    }

    async clickIncreaseProductButton() {
        await this.increaseProductButton.click({ delay: 300 });
    }
}