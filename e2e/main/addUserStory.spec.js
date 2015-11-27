'use strict';

describe('Add user story Test Suit', function() {
	var page;

	beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
	});

	it('should add a user story', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


  	page.clickPopupNewUSAddButton();

  	// The new project should be present.
  	//@TODO
  	});

  it('should fail to add a user story : negative order', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('-1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text order', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('fail');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative priority', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('-1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text priority', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('fail');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative difficulty', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('-2');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text difficulty', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('fail');
    page.setPopupNewUSSprint('2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative sprint', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('-2');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text sprint', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('fail');


    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : everything blank', function() {

    page.connect('test@test.com', 'test');
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
    page.clickPopupNewUSAddButton();

    // Expect an error
    expect(element(by.id('error_backlog')).isDisplayed()).toBeTruthy();
    });
});