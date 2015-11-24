'use strict';

describe('Add member to project Test Suit', function() {
	var page;

	beforeEach(function () {
		page = require('./main.po');
		page.connectWithDefaultUser();
	});

	it('should add an existing member to the project', function() {

  	page.clickAddMember();
  	page.email.sendKeys('test@test.com');
  	page.addBtn.click();

  	// the test@test user should be present.
  	//@TODO
  	});

	it('should fail to add a non-existing member to the project', function() {

  	page.clickAddMember();
  	page.email.sendKeys('error');
  	page.addBtn.click();

  	// the error message should be present.
  	expect(page.errorUnknownUser.isDisplayed()).toBeTruthy();
  	});
});