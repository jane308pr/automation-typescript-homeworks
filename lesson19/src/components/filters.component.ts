import { Locator, Page } from '@playwright/test';

export class FiltersComponent {

    private get filters(): Locator {
        return this.page.locator('//div[@class=\'filter__content\']/div//span[@class=\'generic-selector-title\']');
    }

    public get priceFilterFrom(): Locator {
        return this.page.locator('//div[@class=\'filter__price\']//span[contains(text(), \'від\')]/parent::div/input');
    }

    public get priceFilterTo(): Locator {
        return this.page.locator('//div[@class=\'filter__price\']//span[contains(text(), \'до\')]/parent::div/input');
    }

    public get applyFiltersButton(): Locator {
        return this.page.locator('//span[@class=\'apply-filters\']/button');
    }

    public get appliedPriceFilter(): Locator {
        return this.page.locator('//div[@class=\'active-filter\']/span[contains(text(), \'грн\')]');
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async applyPriceFilter(from: string, to: string): Promise<void> {
        await this.priceFilterFrom.fill(from);
        await this.priceFilterTo.fill(to);
        await this.applyFiltersButton.click();
    }
}
