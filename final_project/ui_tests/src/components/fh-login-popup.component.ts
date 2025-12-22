import { Locator, Page } from '@playwright/test';

export class ForHelpLoginPopupComponent {

    private get loginForm(): Locator {
        return this.page.locator('//form[@class=\'login-modal-form\']');
    }

    private get emailInput(): Locator {
        return this.page.locator('//input[@id=\'login-email\']');
    }

    private get passwordInput(): Locator {
        return this.page.locator('//input[@id=\'login-password\']');
    }

    private get submitButton(): Locator {
        return this.page.locator('//button[@type=\'submit\']');
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async waitForVisibleLoginForm(): Promise<void> {
        await this.loginForm.waitFor({ state: 'visible' });
    }

    public async signIn(email: string, password: string): Promise<void> {
        await this.waitForVisibleLoginForm();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

}
