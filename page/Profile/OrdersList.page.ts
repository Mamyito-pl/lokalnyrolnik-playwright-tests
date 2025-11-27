import { type Locator, type Page } from '@playwright/test';
import { isMobile } from '../../utils/utility-methods';

export class OrdersListPage {
    readonly mobile: boolean;
    readonly orderDetailsButton: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.orderDetailsButton = page.locator(this.mobile ? '#profile_order_details_button' : 'svg[class*="tabler-icon tabler-icon-eye"]');
    }
}