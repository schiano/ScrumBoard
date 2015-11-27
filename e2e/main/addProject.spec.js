'use strict';

describe('Add project Test Suit', function() {
	var page;

	beforeEach(function () {
		page = require('./main.po');
    page.connectWithDefaultUser();
	});

	it('should add a project', function() {

    var projects = element.all(by.css('.project_box')).count();
  	page.clickAddProject();
  	page.setName('Project');
  	page.addBtn.click();

  	// The new project should be present.
  	expect(element.all(by.css('.project_box')).count()).toEqual(projects+1);
  	});
});