import { Locator, Page } from '@playwright/test';

export class MainMenuComponent {

    private get booksMenuItems(): Locator {
        return this.page.locator('//section[@class=\'home-sidebar\']//button');
    }

    private booksMenuItemByType(bookType: string): Locator {
        return this.page.locator(`//section[@class='home-sidebar']//button[.//span[contains(text(), '${bookType}')]]`);
    }

    public async openBooksMenuByBookType(bookType: string): Promise<void> {
        await this.booksMenuItemByType(bookType).click();
    }

    public constructor(
        private readonly page: Page
    ) {}
}
