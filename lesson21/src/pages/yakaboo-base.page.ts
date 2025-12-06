import { SearchComponent } from 'src/components/search.component';
import { BookMenuComponent } from '../components/book-menu.component';
import { Locator, Page } from '@playwright/test';

export class YakabooBasePage {

    protected get yakabooLogo(): Locator {
        return this.page.locator('//header//div[@itemscope=\'itemscope\']');
    }

    protected get catalogButton(): Locator {
        return this.page.locator('//button[contains(@class, \'ui-btn-book-categories\')]');
    }

    public readonly bookMenu: BookMenuComponent;
    public readonly search: SearchComponent;

    public constructor(
        protected readonly page: Page
    ) {
        this.bookMenu = new BookMenuComponent(this.page);
        this.search = new SearchComponent(this.page);
    }

    public async clickCatalogButton(): Promise<void> {
        await this.catalogButton.click();
    }
}
