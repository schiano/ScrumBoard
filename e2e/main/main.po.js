/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
  this.newProjectBtn = element(by.id('btn_new_project'));

  this.connectWithDefaultUser = function() {
    browser.get('/');
    
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

    browser.sleep(5000);
  }

  this.clickProject = function (id) {
    // Clicking on the project

    this.clickTeam = function () {
      element(by.id('btn-team')).click();
      this.newMemberBtn = element(by.id('btn_new_user'));

      this.deleteMember = function(id) {
      element(by.id("del_us_"+id)).click();
      };

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
    };

    this.clickBackLog = function() {
      element(by.id('btn-backlog')).click();
      this.newUSBtn = element(by.id('new_us'));

      this.clickAddUS = function() {
        newUSBtn.click();

        this.popupNewUS = {
            title = element(by.id('new_us_title'));
            order = element(by.id('new_us_order'));
            priority = element(by.id('new_us_priority'));
            difficulty = element(by.id('new_us_difficulty'));
            sprint = element(by.id('new_us_sprint'));
            error = element(by.id('error_backlog'));
            cancelBtn = element(by.id('btn_cancel_backlog_popup'));
            addBtn = element(by.id('btn_add_backlog_popup'));
        };
      };
    }

    this.clickKanBan = function() {
      element(by.id('btn-kanban')).click();
    }

    this.clickPert = function() {
      element(by.id('btn-pert')).click();
    }

    this.clickGantt = function() {
      element(by.id('btn-gantt')).click();
    }
  }
  

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

