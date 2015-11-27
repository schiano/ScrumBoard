'use strict';

describe('Add member to project Test Suit', function() {
	var page;

	beforeEach(function () {
    browser.get('/');
		page = require('./main.po');
		page.connectWithDefaultUser();
    page.clickProject(0);
    page.clickTeam();
    page.clickAddMember();
	});

	it('should add an existing member to the project', function() {

  	page.connect('test@test.com', 'test');
    page.setPopupNewMemberEmail('admin@admin.com');
  	page.getPopupNewMemberAddBtn.click();

  	// the admin@admin.com user should be present.
  	expect(page.getUser('admin@admin.com').isDisplayed()).toBeTruthy();
  	});

  it('should fail by leaving the textbox empty', function() {

    page.connect('test@test.com', 'test');
    page.getPopupNewMemberAddBtn.click();

    // the error message should be present.
    expect(page.getPopupNewMemberErrorUnknownUser.isDisplayed()).toBeTruthy();
    });

	it('should fail to add a non-existing member to the project', function() {

  	page.connect('test@test.com', 'test');
    page.setPopupNewMemberEmail('error');
  	page.getPopupNewMemberAddBtn.click();

  	// the error message should be present.
  	expect(page.getPopupNewMemberErrorEmptyMail.isDisplayed()).toBeTruthy();
  	});
});