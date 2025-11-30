
import { expect } from '@playwright/test';
import { test } from '../src/fixture/yakaboo.fixture';

test.describe('Yakaboo tests', () => {

    test('Verify that every section contains books', async ({ mainPage }) => {
        const sectionNames = await mainPage.getBookSectionsNames();
        sectionNames.forEach(async sectionName => expect((await mainPage.booksBySectionName(sectionName)).length).toBeGreaterThan(0));
    });

    test('Check that search tips are displayed during a search', async ({ mainPage }) => {
        const searchTips = await mainPage.getSearchTipsForQuery('cat');
        expect(searchTips.length).toBeGreaterThan(0);
        searchTips.forEach(tip => expect(tip.toLowerCase()).toContain('cat'));
    });

    test('Check that it is possible to select all \'Yakaboo Collections\' for paper books in the menu', async ({ mainPage, searchResultPage }) => {
        const bookMenuItemName = 'Добірки Yakaboo';
        await mainPage.openBookMenuByBookType('Паперові книги');
        await mainPage.seeAllForBookMenuItemByName(bookMenuItemName);
        await searchResultPage.waitForSearchResults(bookMenuItemName);
    });

    test('Check that books can be filtered by price', async ({ mainPage, searchResultPage }) => {
        const bookMenuItemName = 'Добірки Yakaboo';
        const bookType = 'Паперові книги';
        await mainPage.seeAllForBookMenuItem(bookType, bookMenuItemName);
        await searchResultPage.waitForSearchResults(bookMenuItemName);
        await searchResultPage.applyPriceFilter('0', '50');
        const prices = await searchResultPage.getPricesOfAvailableBooks();
        prices.forEach(price => expect(price).toBeLessThanOrEqual(50));
    });

});

