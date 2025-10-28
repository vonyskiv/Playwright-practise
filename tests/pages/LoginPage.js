const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage.js");

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameInput = page.locator('[name="username"]');
    this.passwordInput = page.locator('[name="password"]');
    this.loginButton = page.locator('[type="submit"]');
    this.errorMessage = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyErrorMessage() {
    await expect(this.errorMessage).toHaveText("Invalid credentials");
  }
}

module.exports = { LoginPage };
