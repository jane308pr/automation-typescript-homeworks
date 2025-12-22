import { Locator, Page } from '@playwright/test';

export class ForHelpHeaderComponent {

    private get signInButton(): Locator {
        return this.page.locator('//button[contains(@class, \'signin-button\')]');
    }

    private get registerButton(): Locator {
        return this.page.locator('//button[contains(@class, \'register-button\')]');
    }

    private get loggedInAsText(): Locator {
        return this.page.locator('//span[contains(text(), \'Вітаємо\')]');
    }

    private get deleteAccButton(): Locator {
        return this.page.locator('//button[text()=\'Видалити акаунт\']');
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async clickOnSignInButton(): Promise<void> {
        await this.signInButton.click();
    }

    public async clickOnRegisterButton(): Promise<void> {
        await this.registerButton.click();
    }

    public async waitForLoggedIn(): Promise<void> {
        await this.loggedInAsText.waitFor({ state: 'visible', timeout: 5000 });
    }

    public async waitForLoggedOut(): Promise<void> {
        await this.loggedInAsText.waitFor({ state: 'detached' });
    }

    public async deleteAccount(): Promise<void> {
        await this.deleteAccButton.click();
        this.page.once('dialog', async (dialog) => {
            //expect(dialog.message()).toContain('Are you sure you want to delete your account?');
            await dialog.accept();
        });
        await this.waitForLoggedOut();
    }
}
