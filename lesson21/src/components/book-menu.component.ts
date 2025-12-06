import { Locator, Page } from '@playwright/test';

export class BookMenuComponent {

    private readonly _baseLocator = this.page.locator('//div[@data-testid="sidebar"]/section[contains(@class,\'books-menu\')]');

    public get baseLocator(): Locator {
        return this._baseLocator;
    }

    private get selectedFilter(): Locator {
        return this._baseLocator.locator('//div[@class=\'books-menu-filters\']//button[contains(@class, \'selected\')]');
    }

    private get seeAllButton(): Locator {
        return this._baseLocator.locator('//div[@class=\'books-list\']/div/div[@style=\'\']/div/a[contains(text(), \'Дивитися всі\')]');
    }

    private booksCategory(itemName: string): Locator {
        return this._baseLocator.locator(`//div[@class='books-list']/div//span[contains(text(), '${itemName}')]`);
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async clickSeeAllButtonForBookCategory(bookCategoryName: string): Promise<void> {
        await this.booksCategory(bookCategoryName).hover();
        await this.seeAllButton.click();
    }

    public async getSelectedFilter(): Promise<string> {
        return await this.selectedFilter.innerText();
    }

}
