const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { AdminPage } = require("../pages/AdminPage.js");

class AdminPageFlows {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.adminPage = new AdminPage(page);
  }

  async verifyUserManagementDropdown() {
    await this.adminPage.userManagementDropdown.click();
    const userOptions = await this.adminPage.usersOption;
    await expect(userOptions).toBeVisible();
  }

  async verifyDropdownOptions(
    clickableLocator,
    optionsLocator,
    expectedOptions
  ) {
    await clickableLocator.click();
    const items = optionsLocator.locator("li");
    const count = await items.count();
    expect(count).toBe(expectedOptions.length);

    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      expect(text.trim()).toBe(expectedOptions[i]);
    }
  }

  async verifyJobDropdown() {
    await this.verifyDropdownOptions(
      this.adminPage.jobDropdown,
      this.adminPage.dropDownJobMenu,
      appContent.JobOptions
    );
  }
  async verifyOrganizationDropdown() {
    await this.verifyDropdownOptions(
      this.adminPage.organizationDropdown,
      this.adminPage.organizationDropdownOptions,
      appContent.OrganizationOptions
    );
  }

  async verifyQualificationDropdown() {
    await this.verifyDropdownOptions(
      this.adminPage.qualificationsDropdown,
      this.adminPage.qualificationsDropdownOptions,
      appContent.QualificationsOptions
    );
  }
  async verifyConfigurationDropdown() {
    await this.verifyDropdownOptions(
      this.adminPage.configurationsDropdown,
      this.adminPage.configurationsDropdownOptions,
      appContent.ConfigurationOptions
    );
  }

  async verifyValidUserSearch(name, role, status) {
    await this.adminPage.userNameField.fill(name);
    await this.adminPage.userRoleDropdown.click();

    const dropdownLocator = this.page.locator(".oxd-select-dropdown");
    await dropdownLocator.waitFor({ state: "visible" });
    await dropdownLocator.getByText(role).click();

    await this.adminPage.statusDropdown.click();
    await dropdownLocator.waitFor({ state: "visible" });
    await dropdownLocator.getByText(status).click();

    await this.adminPage.searchButton.click();
    await this.page.waitForTimeout(500);

    const firstRow = await this.adminPage.resultsTableRows.first();
    await expect(firstRow.locator("[role=cell]")).toContainText([
      name,
      role,
      status,
    ]);

    const rowCounts = await this.adminPage.resultsTableRows.count();
    const expectedTitle = `(${rowCounts}) Record Found`;
    await expect(this.adminPage.recordFoundStripe).toHaveText(expectedTitle);

    await expect(this.adminPage.resultsTableCell.nth(1)).toHaveText(name);
    await expect(this.adminPage.resultsTableCell.nth(2)).toHaveText(role);
    await expect(this.adminPage.resultsTableCell.nth(4)).toHaveText(status);
  }

  async verifyResetButton() {
    const searchResultRowCounts = await this.adminPage.resultsTableRows.count();

    await this.adminPage.resetButton.click();
    await this.page.waitForTimeout(500);

    const newResultsCount = await this.adminPage.resultsTableRows.count();
    expect(newResultsCount).toBeGreaterThan(searchResultRowCounts);

    expect(this.adminPage.userNameField).toHaveText(" ");
    expect(this.adminPage.userRoleDropdown).toContainText("Select");
    expect(this.adminPage.statusDropdown).toContainText("Select");
  }

  async openAddUserForm() {
    await this.adminPage.addUserButton.click();
    await expect(this.page).toHaveURL(/.*\/saveSystemUser/);
    await expect(this.adminPage.addUserContainer).toBeVisible();
  }

  async selectNewUserRole(role) {
    await this.adminPage.addUserRole.click();
    await this.adminPage.dropdownLocator.waitFor({ state: "visible" });
    await this.adminPage.dropdownLocator.getByText(role).click();
  }

  async selectNewUserStatus(status) {
    await this.adminPage.addUserStatus.click();
    await this.adminPage.dropdownLocator.waitFor({ state: "visible" });
    await this.adminPage.dropdownLocator.getByText(status).click();
  }

  async selectEmployeeName() {
    await this.adminPage.addEmployeeName.fill("test");

    const listbox = this.page.locator(".oxd-autocomplete-dropdown");
    await listbox.waitFor({ state: "visible" });

    const option = listbox.locator("div", { hasText: "Orange Test" }).first();
    await option.waitFor({ state: "visible" });
    await option.click();

    await expect(this.adminPage.addEmployeeName).not.toHaveValue("test");
  }

  async fillNewUserName(name) {
    await this.adminPage.addUsername.fill(name);
  }

  async createUserPassword(password) {
    await this.adminPage.addPassword.nth(0).fill(password);
    await this.adminPage.addPassword.nth(1).fill(password);

    await this.adminPage.saveNewUser.click();
    await expect(this.page).toHaveURL(/.*\/viewSystemUsers/);
  }

  async addingNewUser(role, status, name, password) {
    await this.openAddUserForm();
    await this.selectNewUserRole(role);
    await this.selectNewUserStatus(status);
    await this.selectEmployeeName();
    await this.fillNewUserName(name);
    await this.createUserPassword(password);
    await this.verifyValidUserSearch(name, role, status);
  }
}
module.exports = { AdminPageFlows };
