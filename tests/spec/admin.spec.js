const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { LeftMenuPage } = require("../pages/LeftMenu");
const { AdminPage } = require("../pages/AdminPage");
const { AdminPageFlows } = require("../steps/adminSteps.js");
const { appContent } = require("../../src/data/appContent.js");

test("Verify Admin Page Functionality", async ({ page }) => {
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
  await adminStepsFlow.verifyOrganizationDropdown();
  await adminStepsFlow.verifyQualificationDropdown();
  await adminStepsFlow.verifyConfigurationDropdown();
  await adminStepsFlow.verifyValidUserSearch("Admin", "Admin", "Enabled");
  await adminStepsFlow.verifyResetButton();
  await adminStepsFlow.addingNewUser(
    "Admin",
    "Disabled",
    "New USER!",
    "Playwrights2025"
  );
});
