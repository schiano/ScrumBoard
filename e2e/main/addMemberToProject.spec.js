'use strict';

describe('Add member to project Test Suit', function() {
	var page;

	beforeEach(function () {
    browser.get('/');
		page = require('./main.po');
	});

	it('should add an existing member to the project', function() {

  	page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickTeam();
    page.clickAddMember();

    page.setPopupNewMemberEmail('admin@admin.com');
  	page.getPopupNewMemberAddButton.click();

  	// the admin@admin.com user should be present.
  	//expect(page.getUser('admin@admin.com').isDisplayed()).toBeTruthy();
  	});

  it('should fail by leaving the textbox empty', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickTeam();
    page.clickAddMember();

    page.getPopupNewMemberAddButton.click();

    // the error message should be present.
    expect(element(by.id('error_mail_unknown_user')).isDisplayed()).toBeTruthy();
    });

	it('should fail to add a non-existing member to the project', function() {

  	page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickTeam();
    page.clickAddMember();

    page.setPopupNewMemberEmail('error');
  	page.getPopupNewMemberAddButton.click();

  	// the error message should be present.
  	expect(element(by.id('error_mail_empty_user')).isDisplayed()).toBeTruthy();
  	});
});