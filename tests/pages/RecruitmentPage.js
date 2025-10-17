const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");

class RecruitmentPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.recruitmentTabs = page.locator(".oxd-topbar-body a");
    this.addVacancyButton = page.locator(".orangehrm-header-container button");
    this.addVacancyContainer = page.locator(".orangehrm-card-container");
  }

  async verifyRecruitmentPagedVisible() {
    await this.page.waitForURL(/recruitment/);
  }
}

module.exports = { RecruitmentPage };
