const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { BasePage } = require("./BasePage.js");

class RecruitmentPage extends BasePage {
  constructor(page) {
    super(page);
    this.recruitmentTabs = page.locator(".oxd-topbar-body a");
    this.addVacancyButton = page.locator(".orangehrm-header-container button");
    this.addVacancyContainer = page.locator(".orangehrm-card-container");
  }

  async verifyRecruitmentPagedVisible() {
    await expect(this.page).toHaveURL(/recruitment/);
  }
}

module.exports = { RecruitmentPage };
