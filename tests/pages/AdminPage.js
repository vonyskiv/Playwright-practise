const { expect } = require('@playwright/test');
const { appContent } = require('../../src/data/appContent.js')

class AdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.headerMenu = page.locator('.oxd-topbar-body [role="navigation"] ul li');
    this.systetUsers = page.locator('.oxd-table-filter');
    this.fieldsRow = page.locator('.oxd-form-row');
    this.userNameField = page.locator('(//div[contains(@class, "oxd-input-group")]//input)[1]');
    this.userRoleDropdown = page.locator('(//div[@class="oxd-select-wrapper"])[1]');
    this.employeeNameField = page.locator('(//div[contains(@class, "oxd-input-group")]//input)[2]');
    this.statusDropdown = page.locator('');
    this.headerAdmin = page.locator('(//header//h6)[1]');
    this.headerUser = page.locator('(//header//h6)[2]');

  }

  async verifyAdminPagedVisible() {
    await this.page.waitForURL(/admin/);
  }

  async verifyAdminPageHeader() {
    await expect(this.headerAdmin).toHaveText('Admin');
    await expect(this.headerUser).toHaveText('User Management');

  }

async verifyAdminHeaderFields() {
  const adminExpectedHeaderFields = appContent.adminPageHeaderMenu;

  const headerItems = this.headerMenu; 
  const count = await headerItems.count();
  expect(count).toBe(adminExpectedHeaderFields.length);

  for (let i = 0; i < count; i++) {
    const item = headerItems.nth(i);
    await expect(item).toBeVisible();
    const text = await item.textContent();
    expect(text.trim()).toBe(adminExpectedHeaderFields[i]);
}
}
async verifyUserManagementDropdown() {
    
}
}

module.exports = { AdminPage };