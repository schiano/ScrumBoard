'use strict';

describe('Add user story Test Suit', function() {
	var page;

	beforeEach(function () {
		page = require('./main.po');
    page.connectWithDefaultUser();
    page.clickProject(0);
    page.clickBackLog();
    page.clickAddUS();
	});

	it('should add a user story', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('2');


  	page.popupNewUS.addBtn.click();

  	// The new project should be present.
  	//@TODO
  	});

  it('should fail to add a user story : negativ order', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('-1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text order', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('fail');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negativ priority', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('-1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text priority', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('fail');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negativ difficulty', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('-2');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text difficulty', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('fail');
    page.popupNewUS.sprint.sendKeys('2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : negativ sprint', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('-2');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : text sprint', function() {

    page.popupNewUS.title.sendKeys('US');
    page.popupNewUS.order.sendKeys('1');
    page.popupNewUS.priority.sendKeys('1');
    page.popupNewUS.difficulty.sendKeys('2');
    page.popupNewUS.sprint.sendKeys('fail');


    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });

  it('should fail to add a user story : everything blank', function() {

    page.popupNewUS.addBtn.click();

    // Expect an error
    expect(page.popupNewUS.errorUnknownUser.isDisplayed()).toBeTruthy();
    });
});