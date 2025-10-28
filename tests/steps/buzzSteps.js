const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { BuzzPage } = require("../pages/BuzzPage.js");

class BuzzPageFlows {
  /**
   * @param {import('@playwright/test').Page} page
   */

  constructor(page) {
    this.page = page;
    this.buzzPage = new BuzzPage(page);
  }

  async verifyAddingNewPost(text) {
    await this.buzzPage.buzzNewsInput.fill(text);
    await this.buzzPage.postButton.click();
    await this.page.waitForTimeout(500);
    const firstPost = await this.buzzPage.onePost.first();
    const firstPostText = await firstPost.textContent();
    await expect(firstPostText).toEqual(text);
  }

  async verifyLikingPost() {
    const likeCount = this.page
      .locator("p.oxd-text", { hasText: "Like" })
      .first();
    const initialText = await likeCount.textContent();
    const initialCount = parseInt(initialText, 10);
    await this.buzzPage.postHeartIcon.first().click();
    await expect(likeCount).toContainText(`${initialCount + 1} Like`);
  }

  async verifyEditingPost(editedText) {
    await this.buzzPage.postThreeDotsMenu.first().click();
    await this.buzzPage.postOptions.nth(1).click();
    await expect(this.page.locator(".orangehrm-modal-header")).toBeVisible();
    await this.buzzPage.editField.click();
    await this.buzzPage.editField.fill(editedText);
    await this.buzzPage.postButton.nth(1).click();
    await expect(this.page.getByText(editedText)).toBeVisible();
    const firstPost = await this.buzzPage.onePost.first();
    const firstPostText = await firstPost.textContent();

    await expect(firstPostText).toEqual(editedText);
  }

  async verifyDeletingPost() {
    await this.buzzPage.postThreeDotsMenu.first().click();
    await this.buzzPage.postOptions.nth(0).click();
    await expect(this.buzzPage.confirmationModal).toBeVisible();
    await this.buzzPage.confirmDeleteButton.click();
  }
}
module.exports = { BuzzPageFlows };
