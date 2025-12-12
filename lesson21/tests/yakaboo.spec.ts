
import { expect } from '@playwright/test';
import { test } from '../src/fixture/yakaboo.fixture';

test.describe('Yakaboo tests', () => {

    test('Verify that every section contains books', async ({ mainPage }) => {

        const sectionNames = await test.step('Get book\'s section names', async () => {
            return await mainPage.getBookSectionsNames();
        });


        await test.step('Validate each section has at least one book', async () => {
            for (const sectionName of sectionNames) {
                const books = await mainPage.getBooksBySectionName(sectionName);
                expect(books.length, `Section "${sectionName}" should contain books`).toBeGreaterThan(0);
            }
        });
    });

    test('Check that search tips are displayed during a search', async ({ mainPage }) => {
        await test.step('Focus search input', async () => {
            await mainPage.search.focusSearchInput();
        });

        await test.step('Type search query "cat"', async () => {
            await mainPage.search.typeInSearchInput('cat');
        });

        const searchTips = await test.step('Fetch search tips', async () => {
            return await mainPage.search.getSearchTips();
        });

        await test.step('Assert tips are shown and include the query', () => {
            expect(searchTips.length).toBeGreaterThan(0);
            for (const tip of searchTips) {
                expect(tip.toLowerCase()).toContain('cat');
            }
        });
    });

    test('Check selecting "Yakaboo Collections" for paper books from book menu', async ({ mainPage, searchResultPage }) => {
        const bookType = 'Паперові книги';
        const bookCategory = 'Добірки Yakaboo';

        await test.step(`Open book menu by type: ${bookType}`, async () => {
            await mainPage.openBookMenuByBookType(bookType);
        });

        await test.step('Verify book type filter is applied', async () => {
            const selectedBookTypeFilter = await mainPage.bookMenu.getSelectedFilter();
            expect(bookType).toContain(selectedBookTypeFilter);
        });

        await test.step(`Click "See all" for category: ${bookCategory}`, async () => {
            await mainPage.bookMenu.clickSeeAllButtonForBookCategory(bookCategory);
        });

        await test.step('Wait for search results title and validate it', async () => {
            const searchResultPageTitle = await searchResultPage.waitForSearchPageTitle();
            expect(searchResultPageTitle).toBe(bookCategory);
        });

        await test.step('Ensure there is at least one found book', async () => {
            expect(await searchResultPage.getAllFoundBooksCount()).toBeGreaterThan(0);
        });
    });

    test('Check that books can be filtered by price', async ({ mainPage, searchResultPage }) => {
        const bookCategory = 'Добірки Yakaboo';
        const bookType = 'Паперові книги';

        await test.step(`Open book menu by type: ${bookType}`, async () => {
            await mainPage.openBookMenuByBookType(bookType);
        });

        await test.step(`Navigate to category: ${bookCategory}`, async () => {
            await mainPage.bookMenu.clickSeeAllButtonForBookCategory(bookCategory);
        });

        await test.step('Apply price filter 0–50', async () => {
            await searchResultPage.applyPriceFilter('0', '50');
        });

        await test.step('Verify results exist after filtering', async () => {
            expect(await searchResultPage.getAllFoundBooksCount()).toBeGreaterThan(0);
        });

        await test.step('Assert all available book prices are ≤ 50', async () => {
            const prices = await searchResultPage.getPricesOfFoundAvailableBooks();
            for (const price of prices) {
                expect(price).toBeLessThanOrEqual(50);
            }
        });
    });

});
