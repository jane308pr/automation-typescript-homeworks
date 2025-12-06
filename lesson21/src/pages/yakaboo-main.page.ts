import { Locator, Page } from '@playwright/test';
import { YakabooBasePage } from './yakaboo-base.page';
import { MainMenuComponent } from 'src/components/main-menu.component';

export class YakabooMainPage extends YakabooBasePage{

    private readonly _url = 'https://www.yakaboo.ua/';

    private get closePopUpIcon(): Locator {
        return this.page.locator('//div[@class=\'cl-dialog-close-icon\']');
    }

    private get booksSections(): Locator {
        return this.page.locator('//div[contains(@class,\'special-products__sticker\')]/div/span');
    }

    private async closeFirstLoginPopUpIfVisible(locator: Locator, timeoutMs = 5000): Promise<void> {
        try {
            await locator.waitFor({ state: 'visible', timeout: timeoutMs });
            await locator.click();
        } catch {
            console.log('continuing test...');
        }
    }

    public readonly mainMenu: MainMenuComponent;

    public constructor(page: Page) {
        super(page);
        this.mainMenu = new MainMenuComponent(this.page);
    }

    public async goTo(): Promise<void> {
        await this.page.goto(this._url);
        await this.yakabooLogo.waitFor();
        await this.closeFirstLoginPopUpIfVisible(this.closePopUpIcon);
    }

    public async getBookSectionsNames(): Promise<string[]> {
        return await this.booksSections.allInnerTexts();
    }

    public async getBooksBySectionName(sectionName: string): Promise<Locator[]> {
        return await this.page.locator(`//span[normalize-space(text())='${sectionName}']/ancestor::section//div[@class='listing']/div`).all();
    }

    public async openBookMenuByBookType(bookType: string): Promise<void> {
        await this.mainMenu.openBooksMenuByBookType(bookType);
        await this.bookMenu.baseLocator.waitFor();
    }

}
