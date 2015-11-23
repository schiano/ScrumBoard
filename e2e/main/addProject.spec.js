'use strict';

describe('Add project Test Suit', function() {
	var page;

	beforeEach(function () {
		browser.get('/');
    co = require('../connexion_inscription/acc.po.js');
    co.connection('test@test.com', 'test');
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