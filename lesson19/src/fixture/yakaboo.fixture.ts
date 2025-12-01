
import { test as base } from '@playwright/test';
import { YakabooMainPage } from '../pages/yakaboo-main.page';
import { YakabooSearchResultsPage } from '../pages/yakaboo-search-result.page';

interface YakabooFixture {
    mainPage: YakabooMainPage;
    searchResultPage: YakabooSearchResultsPage;
}

export const test = base.extend<YakabooFixture>({
    mainPage: async ({ page }, use) => {
        const mainPage = new YakabooMainPage(page);
        await mainPage.goTo();
        await use(mainPage);
    },

    searchResultPage: async ({ page }, use) => {
        const searchResultPage = new YakabooSearchResultsPage(page);
        await use(searchResultPage);
    }
});

