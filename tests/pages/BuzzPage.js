const { expect } = require("@playwright/test");
const { appContent } = require("../../src/data/appContent.js");
const { BasePage } = require("./BasePage.js");

class BuzzPage extends BasePage {
  constructor(page) {
    super(page);
    this.buzzNewsFeedTitle = page.locator(".orangehrm-buzz-newsfeed>p");
    this.buzzNewsInput = page.locator(".oxd-buzz-post-input");
    this.postButton = page.locator("button[type='submit']");
    this.shareContentButtons = page.locator(
      ".orangehrm-buzz-create-post-actions button"
    );
    this.mostRecentPostsButton = page.getByRole("button", {
      name: "Most Recent Posts",
    });
    this.mostLikedPostsButton = page.getByRole("button", {
      name: "Most Liked Posts",
    });
    this.mostCommentedPostsButton = page.getByRole("button", {
      name: "Most Commented Posts",
    });
    this.onePost = page.locator(".orangehrm-buzz-post-body p");
    this.postThreeDotsMenu = page.locator(".orangehrm-buzz-post li");
    this.postOptions = page.locator(".oxd-dropdown-menu li");
    this.postHeartIcon = page.locator("#heart-svg");
    this.commentPostIcon = page.locator(".oxd-icon.bi-chat-text-fill");
    this.addCommentField = page.locator(
      "input[placeholder='Write your comment...']"
    );
    this.sharePostIcon = page.locator(".oxd-icon.bi-share-fill");
    this.confirmationModal = page.locator("[role='document']");
    this.editField = page.locator(
      ".orangehrm-buzz-post-modal-header-text textarea"
    );
    this.confirmDeleteButton = page.getByRole("button", {
      name: "Yes, Delete",
    });
  }

  async verifyBuzzPagedVisible() {
    await this.page.waitForURL(/buzz/);
  }

  async verifyBuzzNewsFeedTitle() {
    await expect(this.buzzNewsFeedTitle).toContainText(
      appContent.buzzPageTitle
    );
  }
}

module.exports = { BuzzPage };
