import { test as baseTest } from '@playwright/test';
import { ApiHelper } from '../api/ApiHelper';


//define type of API fixtures:
type ApiFixtures = {
    apiHelper: ApiHelper
}

export let test = baseTest.extend<ApiFixtures>({
    apiHelper: async ({ request }, use) => {
        console.log("Come in API FIXTURE PAGE");
        let apiHelper = new ApiHelper(request, process.env.API_BASE_URL!);
        console.log("Come in API FIXTURE PAGE");
        await use(apiHelper);
    }
});

export { expect } from '@playwright/test'