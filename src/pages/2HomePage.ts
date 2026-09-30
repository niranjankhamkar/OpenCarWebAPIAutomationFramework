import { Locator, Page } from '@playwright/test';
import { BasePage } from './0BasePage';

export class HomePage extends BasePage {
    //private locator
    private readonly logoutLink: Locator;
    private readonly headers: Locator;
    protected readonly searchBox: Locator;
    protected readonly searchIcon: Locator;

    //constructor to initilize the locator
    constructor(page: Page) {
        super(page)
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.headers = page.getByRole('heading', { level: 2 });
        this.searchBox = page.getByRole('textbox',{name:'Search'});
        this.searchIcon = page.locator('#search button');
    }

    //methods
    async getHomePageTitle(): Promise<string> {
        return await this.page.title();
    }

    async isLogoutLinkExist():Promise<boolean>{
        return this.logoutLink.isVisible();
    }

    async getHomePageHeaders():Promise<string[]>{
        return this.headers.allInnerTexts();
    }

    async doSearch(serachKey:string):Promise<void>{
        console.log('search key :', serachKey);
        await this.searchBox.fill(serachKey);
        await this.searchIcon.click();
    }
}