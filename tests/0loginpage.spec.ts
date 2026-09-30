import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/1LoginPage';
import { HomePage } from '../src/pages/2HomePage';

let homePage: HomePage;
let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage();
    homePage = new HomePage(page);

})

test.skip('login page title test', async () => {
    let pageTitle = await loginPage.getLoginPageTitle();
    console.log('Login page title : ', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test.skip('forgot password link exist test', async () => {
    expect(await loginPage.isForgottenPwdLinkExist()).toBeTruthy();
});

test.skip('user is able to login to app test', async () => {
    await loginPage.doLogin('pwapril@pw.com', 'pw123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});