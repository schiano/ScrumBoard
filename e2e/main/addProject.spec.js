'use strict';

describe('Add project Test Suit', function() {
	var page;

	beforeEach(function () {
		page = require('./main.po');
    page.connectWithDefaultUser();
	});

	it('should add a project', function() {

  	page.clickAddProject();
  	page.setName('Project');
  	page.addBtn.click();

  	// The new project should be present.
  	//@TODO
  	});
});