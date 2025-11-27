import { type Locator, type Page } from '@playwright/test';

export class OrderDetailsPage {
    readonly page: Page;
    readonly cancelOrderButton: Locator;
    readonly cancelConfirmationButton: Locator;
    readonly backToOrdersButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cancelOrderButton = page.getByRole('button', { name: 'Anuluj' });
        this.cancelConfirmationButton = page.locator('#modal-portal div div').getByRole('button', { name: 'Potwierdź'});
        this.backToOrdersButton = page.locator('#profile_order_back_button');
    }

    async clickCancelOrderButton() {
        await this.cancelOrderButton.click();
    }

    async clickCancelConfirmationButtonUntilVisible() {
        let tries = 0;
        while (tries < 3) {
          if (!(await this.cancelConfirmationButton.isVisible({ timeout: 3000 }))) {
            break;
          }
          await this.cancelConfirmationButton.click({ force: true, delay: 300 });
          await this.page.waitForTimeout(7000);
          tries++;
        }
    }
}