import { Locator, Page } from '@playwright/test';
import { FiltersComponent } from '../components/filters.component';

export class YakabooSearchResultsPage {

    private get searchPageTitle(): Locator {
        return this.page.locator('//div[@class=\'category__top\']//h1');
    }

    private get foundBooks(): Locator {
        return this.page.locator('//div[@class=\'category__cards\']/div/div');
    }

    private get pricesOfAvailableBooks(): Locator {
        return this.page.locator('//div[@class=\'category__cards\']/div/div//span[@id=\'product-price\']');
    }

    public readonly filters: FiltersComponent;

    public constructor(
        private readonly page: Page
    ) {
        this.filters = new FiltersComponent(this.page);
    }

    public async waitForSearchPageTitle(): Promise<string> {
        await this.searchPageTitle.waitFor();
        return await this.searchPageTitle.innerText();
    }

    public async getAllFoundBooksCount(): Promise<number> {
        return (await this.foundBooks.all()).length;
    }

    public async applyPriceFilter(from: string, to: string): Promise<void> {
        await this.filters.applyPriceFilter(from, to);
        await this.filters.appliedPriceFilter.waitFor();
    }

    public async getPricesOfFoundAvailableBooks(): Promise<number[]> {
        const prices = await this.pricesOfAvailableBooks.allInnerTexts();
        return prices.map(price => Number(price.replace(/\D/g, '')));
    }

}
