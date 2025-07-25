const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

test('Valid login and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin123');

  await expect(page).toHaveURL(/dashboard/);
  await dashboardPage.verifyDashboardVisible();

  await dashboardPage.logout();
  await expect(page).toHaveURL(/auth/);
});

test('Invalid login and error message verification', async ({ page }) => {
     const loginPage = new LoginPage(page);

     await loginPage.goto();
     await loginPage.login('admin', 'ADMIN!');

     await loginPage.verifyErrorMessage();

});