import { Locator, Page } from '@playwright/test';
import { MenuItemOption } from '../models/ui/main-menu-item.dto';

export class ForHelpMenuComponent {

    private get menu(): Locator {
        return this.page.locator('//div[@class=\'nav-menu\']');
    }

    private get plainMenuItem(): Locator {
        return this.page.locator('//div[@class=\'nav-item \']/a');
    }

    private get expandableMenuItem(): Locator {
        return this.page.locator('//button[contains(@class, \'nav-link \')]');
    }

    private get nestedItems(): Locator {
        return this.expandableMenuItem.locator('/parent::div/div[contains(@class, \'dropdown-menu \')]/a');
    }

    private getPlainMenuItem(name: string): Locator {
        return this.page.locator(`//div[@class='nav-item ']/a[contains(text(), '${name}')]`);
    }

    private getExpandableMenuItem(name: string): Locator {
        return this.page.locator(`//button[contains(text(), '${name}')]`);
    }

    private getNestedItems(name: string): Locator {
        return this.page.locator(`//button[contains(text(), '${name}')]/following-sibling::div[contains(@class, 'dropdown-menu')]/a`);
    }


    private getNestedItem(name: string, nestedName: string): Locator {
        return this.page.locator(`//button[contains(text(), '${name}')]/following-sibling::div[contains(@class, 'dropdown-menu')]/a[contains(text(), '${nestedName}')]`);
    }

    private async getMenuItems(): Promise<MenuItemOption[]> {
        const menuItems: MenuItemOption[] = [];
        const singleMenuItems = await this.plainMenuItem.all();
        for (const item of singleMenuItems) {
            const menuItemOption: MenuItemOption = {
                itemName: (await item.textContent()) as string,
                isExpandable: false,
                nestedSubmenuItems: []
            };
            menuItems.push(menuItemOption);
        }
        const expandableMenuItems = await this.expandableMenuItem.all();
        for (const item of expandableMenuItems) {
            const full = await item.innerText();
            const itemName = full.split('\n')[0].trim();
            const nestedItems = await this.getAllNestedItemsText(itemName);
            const menuItemOption: MenuItemOption = {
                itemName: itemName,
                isExpandable: true,
                nestedSubmenuItems: nestedItems
            };
            menuItems.push(menuItemOption);
        }

        return menuItems;
    }

    public constructor(
        private readonly page: Page
    ) {}

    public async getAllNestedItemsText(name: string): Promise<string[]> {

        return await this.getNestedItems(name).allTextContents();
    }

    public async clickMenuItem(menuItemName: string, nestedItemName?: string): Promise<void> {
        const menuItems = await this.getMenuItems();
        const menuItem = menuItems.find((item) => item.itemName === menuItemName);

        if (!menuItem) {
            throw new Error(`Menu item "${menuItemName}" not found`);
        }

        if (!menuItem.isExpandable) {
            await this.getPlainMenuItem(menuItemName).click();
        } else {
            if (nestedItemName! && menuItem.nestedSubmenuItems.includes(nestedItemName)) {
                await this.getExpandableMenuItem(menuItemName).hover();
                await this.getNestedItem(menuItemName, nestedItemName).click();
            } else {
                throw new Error(`Nested menu item "${nestedItemName}" not found`);
            }
        }
    }

    public async waitForMenuComponent(): Promise<void> {
        await this.menu.waitFor();
    }

}
