/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.newMemberBtn = element(by.id('btn_new_user'));
  this.newUSBtn = element(by.id('new_uss'));
  this.newProjectBtn = element(by.id('btn_new_project'));

  this.deleteMember = function(id) {
    element(by.id("del_us_"+id)).click();
  };

  this.connectWithDefaultUser = function() {
    // Default user : test@test.com
    // Password     : test
  }

  this.clickAddMember = function() {
    newMemberBtn.click();

    this.popupNewMember = {
        email = element(by.id('new_membre_name'));
        errorEmptyMail = element(by.id('error_mail_empty_user'));
        errorUnknownUser = element(by.id('error_mail_unknown_user'));
        cancelBtn = element(by.id('btn_cancel_user_popup'));
        addBtn = element(by.id('btn_add_user'));
    };
  };

  this.clickAddUS = function() {
    newUSBtn.click();

    this.popupNewUS = {
        title = element(by.id('new_us_title'));
        priority = element(by.id('new_us_priority'));
        difficulty = element(by.id('new_us_difficulty'));
        error = element(by.id('error_backlogs'));
        cancelBtn = element(by.id('btn_cancel_backog_popup'));
        addBtn = element(by.id('btn_add_backlog_popup'));
    };
  };

  this.clickAddProject = function() {
    btn_new_project.click();

    this.popupNewProject = {
        errorName = element(by.id('error_name_project'));
        cancelBtn = element(by.id('btn_cancel_project_popup'));
        addBtn = element(by.id('btn_add_project_popup'));

        setName = function(name) {
            element(by.id('new_project_name')).sendKeys(name);
        }
    }
  }
};

module.exports = new MainPage();

