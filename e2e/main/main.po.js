/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  var newProjectBtn = element(by.id('btn_new_project'));

  this.connect = function(name, pass) {

    // Filling the mail field
    var mailField = element(by.id('mail_field_login'));
    mailField.clear();
    mailField.sendKeys('test@test.com');

    // Filling the password field
    var passField = element(by.id('password_field_login'));
    passField.clear();
    passField.sendKeys('test');

    // Clicking 'connexion'
    element(by.id('next_button')).click();

    browser.sleep(3000);
  }

  /* POPUP NEW MEMBER */
  this.setPopupNewMemberEmail = function(name) {
    element(by.id('new_membre_name')).sendKeys(name);
  };

  this.getPopupNewMemberErrorEmptyMail = function() {
    return element(by.id('error_mail_empty_user'));
  };

  this.getPopupNewMemberErrorUnknownUser = function() {
    return element(by.id('error_mail_unknown_user'));
  };

  this.getPopupNewMemberCancelBtn = function() {
    return element(by.id('btn_cancel_user_popup'));
  };

  this.getPopupNewMemberAddBtn = function() {
    return element(by.id('btn_add_user'));
  };
  /* POPUP NEW MEMBER */

  /* POPUP NEW US */
  this.setPopupNewUSTitle = function(name) {
    element(by.id('new_us_title')).sendKeys(name);
  };

  this.setPopupNewUSSprint = function(name) {
    element(by.id('new_us_sprint')).sendKeys(name);
  };

  this.setPopupNewUSOrder = function(name) {
    element(by.id('new_us_order')).sendKeys(name);
  };

  this.setPopupNewUSPriority = function(name) {
    element(by.id('new_us_priority')).sendKeys(name);
  };

  this.setPopupNewUSDifficulty = function(name) {
    element(by.id('new_us_difficulty')).sendKeys(name);
  };

  this.getPopupNewUSError = function() {
    return element(by.id('error_backlog'));
  };

  this.getPopupNewUSCancelButton = function() {
    return element(by.id('btn_cancel_backlog_popup'));
  };

  this.getPopupNewUSAddButton = function() {
    return element(by.id('btn_add_backlog_popup'));
  };
  /* POPUP NEW US */

  /* POPUP NEW Project */
  this.setPopupNewProjectName = function(name) {
    element(by.id('new_project_name')).sendKeys(name);
  };

  this.getPopupNewProjectErrorName = function() {
    return element(by.id('error_name_project'));
  };

  this.getPopupNewProjectCancelButton = function() {
    return element(by.id('btn_cancel_project_popup'));
  };

  this.getPopupNewProjectAddButton = function() {
    return element(by.id('btn_add_project'));
  };
  /* POPUP NEW Project */

  this.clickProject = function (id) {
    // Clicking on the project
  };

  this.clickTeam = function () {
    element(by.id('btn-team')).click();
  };

  this.clickBackLog = function() {
    element(by.id('btn-backlog')).click();
  };

  this.clickKanBan = function() {
    element(by.id('btn-kanban')).click();
  };

  this.clickPert = function() {
    element(by.id('btn-pert')).click();
  };

  this.clickGantt = function() {
    element(by.id('btn-gantt')).click();
  };

  this.clickAddProject = function() {
    element(by.id('btn_new_project')).click();
  };

  this.clickAddMember = function() {
    element(by.id('btn_new_user')).click();
  };

  this.clickDeleteMember = function(id) {
    element(by.id("del_us_"+id)).click();
  };

  this.clickAddUS = function() {
    element(by.id('new_us')).click();
  };
};

module.exports = new MainPage();

