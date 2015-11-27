'use strict';

describe('Add member to project Test Suit', function() {
	var page;

	beforeEach(function () {
		page = require('./main.po');
		page.connectWithDefaultUser();
    page.clickProject(0);
    page.clickTeam();
    page.clickAddMember();
	});

	it('should add an existing member to the project', function() {

  	page.email.sendKeys('admin@admin.com');
  	page.addBtn.click();

  	// the admin@admin.com user should be present.
  	expect(page.getUser('admin@admin.com').isDisplayed()).toBeTruthy();
  	});

  it('should fail by leaving the textbox empty', function() {

    page.addBtn.click();

    // the error message should be present.
    expect(page.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

	it('should fail to add a non-existing member to the project', function() {

  	page.email.sendKeys('error');
  	page.addBtn.click();

  	// the error message should be present.
  	expect(page.errorEmptyMail.isDisplayed()).toBeTruthy();
  	});
});