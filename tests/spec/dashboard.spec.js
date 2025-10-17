const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { DashboardPage } = require("../pages/DashboardPage");

test("Verify Dashboard Page Functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "admin123");
  await dashboardPage.verifyDashboardVisible();
});
