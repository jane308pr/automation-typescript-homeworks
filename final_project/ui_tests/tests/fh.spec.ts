
// import { expect } from '@playwright/test';
import { test } from '../src/fixture/fh.fixture';

test.describe('For help tests', () => {

    test('Verify that taxes are empty', async ({ mainPage, taxesPage }) => {

        await test.step('Go to main page', async () => {
            await mainPage.goto();
        });

        await test.step('Go to "Податки" -> "Усі" from menu', async () => {
            await mainPage.mainMenu.clickMenuItem('Податки', 'Усі');
        });

        await test.step('Verify that taxes table is empty', async () => {
            await taxesPage.waitForEmptyTaxesTable();
        });

    });

    test('Go to taxes page', async ({ taxesPage }) => {

        await test.step('Go to taxes page', async () => {
            await taxesPage.goTo();
        });

    });


});
