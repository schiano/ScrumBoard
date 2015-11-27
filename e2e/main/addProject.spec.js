'use strict';

describe('Add project Test Suit', function() {
	var page;

	beforeEach(function () {
    browser.driver.get('about:blank')
    browser.get('/');
    page = require('./main.po');
    
	});

	it('should add a project', function() {
    page.connect('test@test.com', 'test');

    var nbProjects = element.all(by.css('.project_box')).count().then(function(count) {
      return count + 1;
    });
  	page.clickAddProject();
  	page.setPopupNewProjectName('Project');
  	page.clickPopupNewProjectAddButton();

  	// The new project should be present.
  	expect(element.all(by.css('.project_box')).count()).toEqual(nbProjects);
  	});
});