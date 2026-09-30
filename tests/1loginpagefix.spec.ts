import { test, expect } from '../src/fixtures/pagefixtures'
import { CsvHelper } from '../src/utils/CsvHelper'
import { ExcelHelper } from '../src/utils/ExcelHelper'
import { JsonHelper } from '../src/utils/JsonHelper'

import *as allure from "allure-js-commons"
import { meta, log, testData } from 'reporting-labs'


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
})

test('login page title test', async ({ loginPage }) => {

    meta({ priority: "P2", severity: 'minor', owner: 'Niranjan', story: 'US101', epic: 'ep300', feature: 'F30', issue: 'bug34' });

    let pageTitle = await loginPage.getPageTitle();
    console.log('Login page title : ', pageTitle);

    await log('Login page title : ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot password link exist test', async ({ loginPage }) => {

    meta({ priority: "P2", severity: 'critical', owner: 'Shweta', story: 'US102', epic: 'ep300', feature: 'F31', issue: 'bug35' });

    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});


//===========================Allure Report======================================
// test('user is able to login to app with valid credentials test', async ({ loginPage, homePage }) => {
//     await loginPage.doLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
//     expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
//     expect.soft(await homePage.getHomePageTitle()).toBe("My Account");
// });
test('user is able to login to app with valid credentials', async ({ loginPage, homePage }) => {

    meta({ priority: "P1", severity: 'minor', owner: 'Ansh', story: 'US103', epic: 'ep300', feature: 'F32', issue: 'bug35' });
    await testData({ username: process.env.APP_USERNAME!, password: process.env.APP_PASSWORD! }, 'Login');


    await allure.suite("Login Tests");
    await allure.severity("critical");
    await allure.feature("Authentication");
    await allure.story("Valid Login");
    await allure.description("Verify user can login with valid credentials");

    await allure.step("Login with valid creds", async () => {
        // await loginPage.doLogin(process.env.USERNAME!, process.env.PASSWORD!);
        await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    });

    await allure.step("Verify logout link is visible", async () => {
        expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    });

    await allure.step("Verify logout home page title is visible", async () => {
        expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
    });
});
//==============================================================================



//npm install csv-parse  
//1. Data Driver Approch using CSV  using loop wise
//light weight,easy to mantain/read,3rd party lib, No license,flat file, fs,good for larg set of data

let testCSVData = CsvHelper.readCsv('src/testdata/logindata.csv');
for (let row of testCSVData) {
    test(`login to app with invalid credentials with CSV data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

        meta({ priority: "P2", severity: 'major', owner: 'Pravin', story: 'US104', epic: 'ep301', feature: 'F33', issue: 'bug36' });
        await testData(testCSVData, 'Invalid Login Data');

        await loginPage.doLogin(row.username, row.password);
        expect(loginPage.isInvalidLoginErrorDisplayed).toBeTruthy();
    });
}

//npm install xlsx  for excel file
//2. Data Driver Approch using excel file
//hard to maintain, required license
let testExcelData = ExcelHelper.readExcel('src/testdata/opencartdata.xlsx', 'login');
for (let row of testExcelData) {
    test(`login to app with invalid credentials with Excel Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

        meta({ priority: "P2", severity: 'major', owner: 'Pravin', story: 'US104', epic: 'ep301', feature: 'F33', issue: 'bug36' });
        await testData(testExcelData, 'Invalid Login Data');

        await loginPage.doLogin(row.username, row.password);
        expect(loginPage.isInvalidLoginErrorDisplayed).toBeTruthy();

    });
}

//inbuilt method:parse, light weight, not requird 3rd party lib,good for small data
//3. Data Driver Approch using JSON file
let testJSONData = JsonHelper.readJson('src/testdata/logindata.json');
for (let row of testJSONData) {
    test(`login to app with invalid credentials with JSON Data- ${row.username} - ${row.password}`, async ({ loginPage, homePage }) => {

        meta({ priority: "P2", severity: 'major', owner: 'Pravin', story: 'US104', epic: 'ep301', feature: 'F33', issue: 'bug36' });
        await testData(testJSONData, 'Invalid Login Data');

        await loginPage.doLogin(row.username, row.password);
        expect(loginPage.isInvalidLoginErrorDisplayed).toBeTruthy();
    });
};

//common features test:
test('App logo exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('Search Box exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isSearchBoxVisible()).toBeTruthy();
});

test('Cart exists on Login Page', async ({ basePage }) => {
    expect(await basePage.isCartButtonVisible()).toBeTruthy();
});

test('Footers exists on Login Page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
})
