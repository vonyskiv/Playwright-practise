const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { BasePage } = require("./BasePage.js");

class LeftMenuPage extends BasePage {
  constructor(page) {
    super(page);
    this.AdminTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuAdmin}"]`
    );
    this.PIMTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuPim}"]`
    );
    this.LeaveTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuLeave}"]`
    );
    this.TimeTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuTime}"]`
    );
    this.RecruitmentTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuRecruitment}"]`
    );
    this.MyInfoTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuMyInfo}"]`
    );
    this.PerformanceTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuPerformance}"]`
    );
    this.DashboardTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuDashoard}"]`
    );
    this.DirectoryTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuDirectory}"]`
    );
    this.MaintenanceTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuMaintenance}"]`
    );
    this.ClaimTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuClaim}"]`
    );
    this.BuzzTab = page.locator(
      `//div[@class="oxd-sidepanel-body"]//span[text()= "${appContent.leftMenuBuzz}"]`
    );
  }

  async clickAdminTab() {
    await this.AdminTab.click();
    expect(this.page).toHaveURL(/admin/);
  }

  async clickBuzzTab() {
    await this.BuzzTab.click();
    expect(this.page).toHaveURL(/buzz/);
  }

  async clickRecruitmentTab() {
    await this.RecruitmentTab.click();
    expect(this.page).toHaveURL(/recruitment/);
  }
}

module.exports = { LeftMenuPage };
