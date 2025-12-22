
import { test as base, Browser } from '@playwright/test';
import * as fs from 'fs';
import { ForHelpLoginPage } from '../pages/fh-login.page';
import { ForHelpMainPage } from '../pages/fh-main.page';
import { ConfigService } from '../services/config.service';
import { ForHelpTaxesPage } from '../pages/fh-taxes.page';

interface ForHelpFixture {
    loginPage: ForHelpLoginPage;
    mainPage: ForHelpMainPage;
    taxesPage: ForHelpTaxesPage;
    configService: ConfigService;
}

const storageState = (workerId: number): string => `.auth/fh-storage-state-${workerId}.json`;

export const test = base.extend<ForHelpFixture>({

    configService: async ({ browserName }, use) => {
        console.log(browserName);
        const configService = new ConfigService();
        await use(configService);
    },

    contextOptions: async ({ browser, configService }, use) => {
        const workerId = base.info().workerIndex;
        await authenticateForHelp(browser, workerId, configService);
        await use({ storageState: storageState(workerId) });
    },

    loginPage: async ({ page, configService }, use) => {
        await use(new ForHelpLoginPage(page, configService));
    },

    mainPage: async ({ page, configService }, use) => {
        await use(new ForHelpMainPage(page, configService));
    },

    taxesPage: async ({ page, configService }, use) => {
        await use(new ForHelpTaxesPage(page, configService));
    }
});

async function authenticateForHelp(browser: Browser, workerId: number, configService: ConfigService): Promise<void> {
    if (fs.existsSync(storageState(workerId))) return;

    const context = await browser.newContext();
    const page = await context.newPage();
    const loginPage = new ForHelpLoginPage(page, configService);

    await loginPage.goto();
    await loginPage.login();

    await page.context().storageState({ path: storageState(workerId) });
    await context.close();
}
