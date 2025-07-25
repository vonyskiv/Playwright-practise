const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { LeftMenuPage } = require('../pages/LeftMenu');
const { AdminPage } = require('../pages/AdminPage');


test ('Verify Admin Page', async ({page}) => {
   const loginPage = new LoginPage(page);
   const leftMenuPage = new LeftMenuPage(page);
   const adminPage = new AdminPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin123');
  await leftMenuPage.clickAdminTab();
  await adminPage.verifyAdminPagedVisible();
  await adminPage.verifyAdminPageHeader();
  await adminPage.verifyAdminHeaderFields();

})