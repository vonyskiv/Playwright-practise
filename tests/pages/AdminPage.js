const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { log } = require("console");
const { stat } = require("fs/promises");

class AdminPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.headerMenu = page.locator(
      '.oxd-topbar-body [role="navigation"] ul li'
    );
    this.userManagementDropdown = page.locator(
      ".oxd-topbar-body ul li:first-child"
    );
    this.jobDropdown = page.locator(".oxd-topbar-body ul li:nth-child(2)");
    this.organizationDropdown = page.locator(
      '//nav[@aria-label="Topbar Menu"]//span[contains(text(), "Organization")]'
    );
    this.organizationDropdownOptions = page.locator(
      ".oxd-topbar-body ul li:nth-child(3) ul"
    );
    this.qualificationsDropdown = page.locator(
      '//nav[@aria-label="Topbar Menu"]//span[contains(text(), "Qualifications")]'
    );
    this.qualificationsDropdownOptions = page.locator(
      ".oxd-topbar-body ul li:nth-child(4) ul"
    );
    this.nationalitiesDropdown = page.locator(
      ".oxd-topbar-body ul li:nth-child(5)"
    );
    this.corporateBrandingField = page.locator(
      ".oxd-topbar-body ul li:nth-child(6)"
    );
    this.configurationsDropdown = page.locator(
      '//nav[@aria-label="Topbar Menu"]//span[contains(text(), "Configuration")]'
    );
    this.configurationsDropdownOptions = page.locator(
      ".oxd-topbar-body ul li:nth-child(7) ul"
    );
    this.dropDownJobMenu = page.locator(
      ".oxd-topbar-body ul li:nth-child(2) ul"
    );
    this.usersOption = page.getByRole("menuitem", { name: "Users" });
    this.systemUsers = page.locator(".oxd-table-filter");
    this.fieldsRow = page.locator(".oxd-form-row");
    this.userNameField = page.locator(
      '(//div[contains(@class, "oxd-input-group")]//input)[1]'
    );
    this.userRoleDropdown = page.locator(
      '(//div[@class="oxd-select-wrapper"])[1]'
    );
    this.employeeNameField = page.locator(
      '(//div[contains(@class, "oxd-input-group")]//input)[2]'
    );
    this.statusDropdown = page.locator(
      '(//div[@class="oxd-select-wrapper"])[2]'
    );
    this.headerAdmin = page.locator("(//header//h6)[1]");
    this.headerUser = page.locator("(//header//h6)[2]");
    this.searchButton = page.locator('button[type="submit"]');
    this.resetButton = page.locator('.oxd-form-actions [type="button"]');
    this.recordFoundStripe = page.locator(".orangehrm-horizontal-padding");
    this.resultsTableRows = page.locator('.oxd-table-card [role="row"]');
    this.resultsTableCell = page.locator('[role="cell"]');
  }

  async verifyAdminPagedVisible() {
    await this.page.waitForURL(/admin/);
  }

  async verifyAdminPageHeader() {
    await expect(this.headerAdmin).toHaveText("Admin");
    await expect(this.headerUser).toHaveText("User Management");
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
    await this.userManagementDropdown.click();
    await expect(this.usersOption).toBeVisible();
  }

  async verifySystemUsersTable() {
    await expect(this.systemUsers).toBeVisible();
    await expect(this.userNameField).toBeVisible();
    await expect(this.userRoleDropdown).toBeVisible();
    await expect(this.employeeNameField).toBeVisible();
    await expect(this.statusDropdown).toBeVisible();
  }
}

module.exports = { AdminPage };
