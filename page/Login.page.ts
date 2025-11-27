import { type Locator, type Page } from '@playwright/test';
import { isMobile } from '../utils/utility-methods';

export class LoginPage {
    private readonly mobile: boolean;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    readonly registerButton: Locator;

    constructor(page: Page) {
        this.mobile = isMobile(page);
        this.emailInput = page.getByRole('textbox', { name: 'Email *' });
        this.passwordInput = page.getByRole('textbox', { name: 'Hasło *' });
        this.loginButton = page.getByRole('button', { name: 'Zaloguj się' });
        this.registerButton = page.getByRole('button', { name: 'Zarejestruj się' });
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.waitFor({ state: 'visible' });
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}