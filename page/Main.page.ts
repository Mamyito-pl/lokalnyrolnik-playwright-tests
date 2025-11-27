import { type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class MainPage {
    private readonly mobile: boolean;
    readonly profileButton: Locator;
    readonly profileMenuTitle: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.profileButton = page.locator(this.mobile ? 'div[data-sentry-element="TabletContent"] #navbar_profile_icon' : 'div[data-sentry-element="WebContent"] #navbar_profile_icon');
    }
}