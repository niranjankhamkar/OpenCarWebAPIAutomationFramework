import { Locator, Page } from '@playwright/test';
import { BasePage } from './0BasePage';

export class SearchResultsPage extends BasePage {
    //private locator
    private readonly searchResults;

    //constructor to initilize the locator
    constructor(page: Page) {
        super(page)
        this.searchResults = page.locator('div.product-layout');
    };

    //page action
    async getProductSearchResultCount():Promise<number>{
        return await this.searchResults.count();
    }

    async selectProduct(productName:string):Promise<void>{
        console.log('product name', productName);
        await this.page.getByRole('link',{name : productName, exact:true}).first().click();
    }
}