const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../pages/LoginPage");
const { LeftMenuPage } = require("../pages/LeftMenu");
const { BuzzPage } = require("../pages/BuzzPage");
const { BuzzPageFlows } = require("../steps/buzzSteps.js");

test("Verify Buzz Page Functionality", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const leftMenuPage = new LeftMenuPage(page);
  const buzzPage = new BuzzPage(page);
  const buzzStepsFlow = new BuzzPageFlows(page);

  await loginPage.goto();
  await loginPage.login("admin", "admin123");
  await leftMenuPage.clickBuzzTab();

  await buzzPage.verifyBuzzPagedVisible();
  await buzzPage.verifyBuzzNewsFeedTitle();
  await buzzStepsFlow.verifyAddingNewPost(
    "Practise writing Playwright UI tests"
  );
  await buzzStepsFlow.verifyLikingPost();
  await buzzStepsFlow.verifyEditingPost("New learning text");
  await buzzStepsFlow.verifyDeletingPost();
});
