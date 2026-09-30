import { test as baseTest } from '@playwright/test';
import { BasePage } from '../pages/0BasePage';
import { LoginPage } from '../pages/1LoginPage';
import { HomePage } from '../pages/2HomePage';
import { SearchResultsPage } from '../pages/3SearchResultsPage';
import { ProductInfoPage } from '../pages/4ProductInfoPage';

type pageFixtures = {
    basePage: BasePage,
    loginPage: LoginPage,
    homePage: HomePage,
    searchResultsPage: SearchResultsPage
    productInfoPage: ProductInfoPage
    testData:Record<string,string>[];
};

//extend the playwright test : using baseTest.extend: inheritance
export let test = baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {    //page 0
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {   //page 1
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage: async ({ page }, use) => {    //page 2
        let homePage = new HomePage(page);
        await use(homePage);
    },

    searchResultsPage: async ({ page }, use) => {   //page 3
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    productInfoPage: async ({ page }, use) => { //page 4
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },
})

export { expect } from '@playwright/test';