'use strict';

describe('Add user story Test Suit', function() {
	var page;

	beforeEach(function () {
		browser.get('/');
    co = require('../connexion_inscription/acc.po.js');
    co.connection('test@test.com', 'test');
		page = require('./main.po');
    page.connectWithDefaultUser();
	});

	it('should add a user story', function() {

  	page.clickAddProject();
  	page.setName('US');
    page.priority('3');
    page.difficulty('5');
  	page.addBtn.click();

  	// The new project should be present.
  	//@TODO
  	});
});