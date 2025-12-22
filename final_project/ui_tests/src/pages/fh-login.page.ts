import { Page } from '@playwright/test';
import { ForHelpLoginPopupComponent } from '../components/fh-login-popup.component';
import { ForHelpBasePage } from './fh-base.page';
import { ForHelpHeaderComponent } from '../components/fh-header.component';
import { ConfigService } from '../services/config.service';

export class ForHelpLoginPage extends ForHelpBasePage {

    public readonly loginPopup: ForHelpLoginPopupComponent;
    public readonly header: ForHelpHeaderComponent;

    public constructor(page: Page, configService: ConfigService) {
        super(page, configService);
        this.loginPopup = new ForHelpLoginPopupComponent(this.page);
        this.header = new ForHelpHeaderComponent(this.page);
    }


    public async login(): Promise<void> {
        const email = this.configService.config.uiForHelp.email;
        const password = this.configService.config.uiForHelp.password;

        await this.header.clickOnSignInButton();
        await this.loginPopup.signIn(email, password);
        await this.header.waitForLoggedIn();
    }

}
