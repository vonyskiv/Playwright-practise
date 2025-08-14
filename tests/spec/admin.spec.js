const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { LeftMenuPage } = require("../pages/LeftMenu");
const { AdminPage } = require("../pages/AdminPage");
const { AdminPageFlows } = require("../steps/adminSteps.js");

test("Verify Admin Page", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftMenuPage = new LeftMenuPage(page);
  const adminPage = new AdminPage(page);
  const adminStepsFlow = new AdminPageFlows(page);

  await loginPage.goto();
  await loginPage.login("admin", "admin123");
  await leftMenuPage.clickAdminTab();
  await adminPage.verifyAdminPagedVisible();
  await adminPage.verifyAdminPageHeader();
  await adminPage.verifyAdminHeaderFields();
  await adminStepsFlow.verifyUserManagementDropdown();
  await adminStepsFlow.verifyJobDropdown();
  await adminStepsFlow.verifyOrganizationDropdwon();
  await adminStepsFlow.verifyQualificationDropdown();
  await adminStepsFlow.verifyConfigurationDropdown();
  await adminStepsFlow.verifyValidUserSearch("Admin", "Admin", "Enabled");
  await adminStepsFlow.verifyResetButton();
});
