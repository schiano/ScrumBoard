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

  	page.popupNewMember.email.sendKeys('admin@admin.com');
  	page.popupNewMember.addBtn.click();

  	// the admin@admin.com user should be present.
  	expect(page.getUser('admin@admin.com').isDisplayed()).toBeTruthy();
  	});

  it('should fail by leaving the textbox empty', function() {

    page.popupNewMember.addBtn.click();

    // the error message should be present.
    expect(page.popupNewMember.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

	it('should fail to add a non-existing member to the project', function() {

  	page.popupNewMember.email.sendKeys('error');
  	page.popupNewMember.addBtn.click();

  	// the error message should be present.
  	expect(page.popupNewMember.errorEmptyMail.isDisplayed()).toBeTruthy();
  	});
});