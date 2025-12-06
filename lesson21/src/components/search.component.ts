import { Locator, Page } from '@playwright/test';

export class SearchComponent {

    private readonly _baseLocator = this.page.locator('//div[@class=\'search-compound\']');

    private get input(): Locator {
        return this._baseLocator.locator('//input[@id=\'search-input\']');
    }

    private get tipList(): Locator {
        return this._baseLocator.locator('//ul[@class=\'tips-list\']');
    }

    private get tips(): Locator {
        return this._baseLocator.locator('//ul/div[@class=\'search-tip\']/span');
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async focusSearchInput(): Promise<void> {
        return await this.input.focus();
    }

    public async typeInSearchInput(query: string): Promise<void> {
        return await this.input.fill(query);
    }

    public async getSearchTips(): Promise<string[]> {
        await this.tipList.waitFor();
        return await this.tips.allInnerTexts();
    }

}
