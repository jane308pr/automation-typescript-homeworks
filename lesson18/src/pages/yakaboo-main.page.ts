import { expect, Locator, Page } from '@playwright/test';

export class YakabooMainPage {

    private readonly _url = 'https://www.yakaboo.ua/';

    private get yakabooLogo(): Locator {
        return this.page.locator('//header//div[@itemscope=\'itemscope\']');
    }

    private get closePopUpIcon(): Locator {
        return this.page.locator('//div[@class=\'cl-dialog-close-icon\']');
    }

    private get booksSections(): Locator {
        return this.page.locator('//div[contains(@class,\'special-products__sticker\')]//span');
    }

    private get searchInput(): Locator {
        return this.page.locator('//input[@id=\'search-input\']');
    }

    private get searchTipList(): Locator {
        return this.page.locator('//ul[@class=\'tips-list\']');
    }

    private get searchTips(): Locator {
        return this.page.locator('//ul/div[@class=\'search-tip\']/span');
    }

    private get booksTypeMenuItems(): Locator {
        return this.page.locator('//section[@class=\'home-sidebar\']//button');
    }

    private get booksMenu(): Locator {
        return this.page.locator('//div[@data-testid="sidebar"]/section[contains(@class,\'books-menu\')]');
    }

    private get selectedFilterInBooksMenu(): Locator {
        return this.page.locator('//div[@class=\'books-menu-filters\']//button[contains(@class, \'selected\')]');
    }

    private get seeAllButton(): Locator {
        return this.page.locator('//div[@class=\'books-list\']/div/div[@style=\'\']/div/a[contains(text(), \'Дивитися всі\')]');
    }

    private menuItemByBookType(bookType: string): Locator {
        return this.page.locator(`//section[@class='home-sidebar']//button[.//span[contains(text(), '${bookType}')]]`);
    }

    private booksMenuItemByName(itemName: string): Locator {
        return this.page.locator(`//div[@class='books-list']/div//span[contains(text(), '${itemName}')]`);
    }

    private async closeFirstLoginPopUpIfVisible(locator: Locator, timeoutMs = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: timeoutMs });
            await locator.click();
        } catch {
            console.log('continuing test...');
        }
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async goTo(): Promise<void> {
        await this.page.goto(this._url);
        await this.yakabooLogo.waitFor();
        await this.closeFirstLoginPopUpIfVisible(this.closePopUpIcon);
    }

    public async booksBySectionName(sectionName: string): Promise<Locator[]> {
        return await this.page.locator(`//span[normalize-space(text())='${sectionName}']/ancestor::section//div[@class='listing']/div`).all();
    }

    public async getBookSectionsNames(): Promise<string[]> {
        return await this.booksSections.allInnerTexts();
    }

    public async getSearchTipsForQuery(query: string): Promise<string[]> {
        await this.searchInput.fill(query);
        await this.searchTipList.waitFor();
        return await this.searchTips.allInnerTexts();
    }

    public async getBookTypesNames(): Promise<string[]> {
        const booksTypesNames: string[] = [];
        const booksTypes = await this.booksTypeMenuItems.all();
        for (const booksType of booksTypes) {
            const name = await booksType.locator('/span').innerText();
            booksTypesNames.push(name);
        }
        return booksTypesNames;
    }

    public async openBookMenuByBookType(bookType: string): Promise<void> {
        await this.menuItemByBookType(bookType).click();
        await this.booksMenu.waitFor();
        const selectedBookTypeFilter = await this.selectedFilterInBooksMenu.innerText();
        expect(bookType).toContain(selectedBookTypeFilter);
    }

    public async seeAllForBookMenuItemByName(bookMenuItemName: string): Promise<void> {
        await this.booksMenuItemByName(bookMenuItemName).hover();
        await this.seeAllButton.click();
    }

    public async seeAllForBookMenuItem(bookType: string, bookMenuItemName: string): Promise<void> {
        await this.openBookMenuByBookType(bookType);
        await this.seeAllForBookMenuItemByName(bookMenuItemName);
    }

}
