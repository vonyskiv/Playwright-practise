class DashboardPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.profileIcon = page.getByAltText('profile picture').first();
    this.logoutButton = page.getByText('Logout');
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