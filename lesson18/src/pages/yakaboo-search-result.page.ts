import { expect, Locator, Page } from '@playwright/test';

export class YakabooSearchResultsPage {

    private get searchPageTitle(): Locator {
        return this.page.locator('//div[@class=\'category__top\']//h1');
    }

    private get foundBooks(): Locator {
        return this.page.locator('//div[@class=\'category__cards\']/div/div');
    }

    private get filters(): Locator {
        return this.page.locator('//div[@class=\'filter__content\']/div//span[@class=\'generic-selector-title\']');
    }

    private get priceFilterFrom(): Locator {
        return this.page.locator('//div[@class=\'filter__price\']//span[contains(text(), \'від\')]/parent::div/input');
    }

    private get priceFilterTo(): Locator {
        return this.page.locator('//div[@class=\'filter__price\']//span[contains(text(), \'до\')]/parent::div/input');
    }

    private get applyFiltersButton(): Locator {
        return this.page.locator('//span[@class=\'apply-filters\']/button');
    }

    private get appliedPriceFilter(): Locator {
        return this.page.locator('//div[@class=\'active-filter\']/span[contains(text(), \'грн\')]');
    }

    private get pricesOfAvailableBooks(): Locator {
        return this.page.locator('//div[@class=\'category__cards\']/div/div//span[@id=\'product-price\']');
    }

    private async verifyThatBooksAreFound(): Promise<void> {
        expect((await this.foundBooks.all()).length).toBeGreaterThan(0);
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async waitForSearchResults(search: string): Promise<void> {
        await this.searchPageTitle.waitFor();
        expect(await this.searchPageTitle.innerText()).toContain(search);
        await this.verifyThatBooksAreFound();
    }

    public async applyPriceFilter(from: string, to: string): Promise<void> {
        await this.priceFilterFrom.fill(from);
        await this.priceFilterTo.fill(to);
        await this.applyFiltersButton.click();
        await this.appliedPriceFilter.waitFor();
        await this.verifyThatBooksAreFound();
    }

    public async getPricesOfAvailableBooks(): Promise<number[]> {
        const prices = await this.pricesOfAvailableBooks.allInnerTexts();
        return prices.map(price => Number(price.replace(/\D/g, '')));
    }

}
