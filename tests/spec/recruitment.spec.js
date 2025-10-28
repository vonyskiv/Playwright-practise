const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { LeftMenuPage } = require("../pages/LeftMenu");
const { RecruitmentPage } = require("../pages/RecruitmentPage");

test("Verify Recruitment Page Functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftMenuPage = new LeftMenuPage(page);
  const recruitmentPage = new RecruitmentPage(page);

  await loginPage.goto();
  await loginPage.login("admin", "admin123");
  await leftMenuPage.clickRecruitmentTab();
  await recruitmentPage.verifyRecruitmentPagedVisible();
});
