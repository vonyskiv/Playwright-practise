const { BasePage } = require("./BasePage.js");

class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.profileIcon = page.getByAltText("profile picture").first();
    this.logoutButton = page.getByText("Logout");
  }

  async logout() {
    await this.profileIcon.click();
    await this.logoutButton.click();
  }

  async verifyDashboardVisible() {
    await this.page.waitForURL(/dashboard/);
  }
}

module.exports = { DashboardPage };
