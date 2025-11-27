import { type Locator, type Page } from '@playwright/test';

export class ProfilePage {
    readonly profileMenuLogoutButton: Locator;
    readonly profileMenuTitle: Locator;

    constructor(page: Page) {
        this.profileMenuLogoutButton = page.locator('#profile_logout_button');
        this.profileMenuTitle = page.locator('#profile-menu').getByText('Profil');
    }
}