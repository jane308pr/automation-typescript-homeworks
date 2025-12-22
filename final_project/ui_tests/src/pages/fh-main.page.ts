import { Page } from '@playwright/test';
import { ForHelpBasePage } from './fh-base.page';
import { ConfigService } from 'src/services/config.service';

export class ForHelpMainPage extends ForHelpBasePage {

    public constructor(page: Page, configService: ConfigService) {
        super(page, configService);
    }
}
