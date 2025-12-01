
import { expect } from '@playwright/test';
import { test } from '../src/fixture/yakaboo.fixture';

test.describe('Yakaboo tests', () => {

    test('Verify that every section contains books', async ({ mainPage }) => {

        const sectionNames = await mainPage.getBookSectionsNames();

        sectionNames.forEach(async sectionName => expect((await mainPage.getBooksBySectionName(sectionName)).length).toBeGreaterThan(0));
    });

    test('Check that search tips are displayed during a search', async ({ mainPage }) => {

        await mainPage.search.focusSearchInput();

        await mainPage.search.typeInSearchInput('cat');
        const searchTips = await mainPage.search.getSearchTips();

        expect(searchTips.length).toBeGreaterThan(0);
        searchTips.forEach(tip => expect(tip.toLowerCase()).toContain('cat'));
    });

    test('Check that it is possible to select all \'Yakaboo Collections\' for paper books in the book menu', async ({ mainPage, searchResultPage }) => {
        const bookType = 'Паперові книги';
        const bookCategory = 'Добірки Yakaboo';

        await mainPage.openBookMenuByBookType(bookType);
        const selectedBookTypeFilter = await mainPage.bookMenu.getSelectedFilter();
        expect(bookType).toContain(selectedBookTypeFilter);

        await mainPage.bookMenu.clickSeeAllButtonForBookCategory(bookCategory);
        const searchResultPageTitle = await searchResultPage.waitForSearchPageTitle();
        expect(searchResultPageTitle).toBe(bookCategory);
        expect(await searchResultPage.getAllFoundBooksCount()).toBeGreaterThan(0);
    });

    test('Check that books can be filtered by price', async ({ mainPage, searchResultPage }) => {
        const bookCategory = 'Добірки Yakaboo';
        const bookType = 'Паперові книги';

        await mainPage.openBookMenuByBookType(bookType);
        await mainPage.bookMenu.clickSeeAllButtonForBookCategory(bookCategory);

        await searchResultPage.applyPriceFilter('0', '50');
        expect(await searchResultPage.getAllFoundBooksCount()).toBeGreaterThan(0);
        const prices = await searchResultPage.getPricesOfFoundAvailableBooks();
        prices.forEach(price => expect(price).toBeLessThanOrEqual(50));
    });

});

