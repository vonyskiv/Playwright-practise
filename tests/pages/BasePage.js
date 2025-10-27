class BasePage {
  /** @param {import('@playwright/test').Page} page */ constructor(page) {
    this.page = page;
  }
}
module.exports = { BasePage };
