import { Locator, Page } from '@playwright/test';
import { ForHelpBasePage } from './fh-base.page';
import { ConfigService } from 'src/services/config.service';

export class ForHelpTaxesPage extends ForHelpBasePage {

    private readonly _path = '/taxes';

    private get taxesTable(): Locator {
        return this.page.locator('//div[@class=\'taxes-table-page\']');
    }

    private get emptyTaxesTable(): Locator {
        return this.page.locator('//div[@class=\'empty-state\']');
    }

    public constructor(page: Page, configService: ConfigService) {
        super(page, configService);
    }

    public async goTo(): Promise<void> {
        const fullUrl = `${this.configService.config.uiForHelp.baseUrl}${this._path}`;
        await this.page.goto(fullUrl);
        await this.taxesTable.waitFor();
    }

    public async waitForEmptyTaxesTable(): Promise<void> {
        await this.emptyTaxesTable.waitFor();
    }
}
