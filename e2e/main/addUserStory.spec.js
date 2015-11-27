'use strict';

describe('Add user story Test Suit', function() {
	var page;

	beforeEach(function () {
    browser.get('/');
    page = require('./main.po');
    page.connectWithDefaultUser();
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
	});

	it('should add a user story', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


  	page.getPopupNewUSAddButton.click();

  	// The new project should be present.
  	//@TODO
  	});

  it('should fail to add a user story : negative order', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('-1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text order', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('fail');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative priority', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('-1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text priority', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('fail');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative difficulty', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('-2');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text difficulty', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('fail');
    page.setPopupNewUSSprint('2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negative sprint', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('-2');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text sprint', function() {

    page.connect('test@test.com', 'test');
    page.setPopupNewUSTitle('US');
    page.setPopupNewUSOrder('1');
    page.setPopupNewUSPriority('1');
    page.setPopupNewUSDifficulty('2');
    page.setPopupNewUSSprint('fail');


    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : everything blank', function() {

    page.connect('test@test.com', 'test');
    page.getPopupNewUSAddButton.click();

    // Expect an error
    expect(page.getPopupNewUSError.isDisplayed()).toBeTruthy();
    });
});