import { Locator, Page } from '@playwright/test';
import { BasePage } from './0BasePage';

export class ProductInfoPage extends BasePage {
    //private locator
    private readonly header: Locator;
    private readonly prductImages: Locator;
    private readonly productMetaData: Locator;
    private readonly productPricig: Locator;
    private productInfoMap: Map<string, string | number>;

    //constructor to initilize the locator
    constructor(page: Page) {
        super(page)
        this.header = page.getByRole('heading', { level: 1 });
        this.prductImages = page.locator('div#content li img');
        this.productMetaData = page.locator('div#content ul.list-unstyled:nth-of-type(1) li');
        this.productPricig = page.locator('div#content ul.list-unstyled:nth-of-type(2) li');
        this.productInfoMap = new Map<string, string | number>();
    }

    //page Action / methods
    async getProductHeader(): Promise<string> {
        return await this.header.innerText();
    }

    async getProductImagesCount(): Promise<number> {
       await this.prductImages.first().waitFor({ state: 'visible' });
        return await this.prductImages.count();
    }

    async getProductInfo(): Promise<Map<string, string | number>> {
        this.productInfoMap.set('productheader', await this.getProductHeader());
        this.productInfoMap.set('productimagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPriceData();
        return this.productInfoMap;
    }

    private async getProductMetaData(): Promise<void> {
        let metaData = await this.productMetaData.allInnerTexts();
        for (let data of metaData) {
            let meta = data.split(':');
            let metaKey = meta[0].trim();
            let metaValue = meta[1].trim();
            this.productInfoMap.set(metaKey, metaValue);
        }
    }

    private async getProductPriceData(): Promise<void> {
        let priceData = await this.productPricig.allInnerTexts();
        let productPrice = priceData[0].trim();
        let exTaxPrice = priceData[1].split(':')[1].trim();
        this.productInfoMap.set('productprice', productPrice);
        this.productInfoMap.set('extaxprice', exTaxPrice);
    }
}