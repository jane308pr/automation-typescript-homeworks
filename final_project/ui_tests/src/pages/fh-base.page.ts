import { Page } from '@playwright/test';
import { ForHelpMenuComponent } from '../components/fh-menu.component';
import { ConfigService } from '../services/config.service';

export class ForHelpBasePage {

    public readonly mainMenu: ForHelpMenuComponent;


    public constructor(
        protected readonly page: Page,
        protected readonly configService: ConfigService
    ){
        this.mainMenu = new ForHelpMenuComponent(this.page);
    }

    public async goto(path?: string): Promise<void> {
        const fullUrl = `${this.configService.config.uiForHelp.baseUrl}${path || ''}`;
        await this.page.goto(fullUrl);
        await this.mainMenu.waitForMenuComponent();
    }
}
