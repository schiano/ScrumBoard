describe('Inscription test suit', function() {

  beforeEach(function() {
  	browser.driver.get('about:blank');
  	browser.get('/');
  });

  /*it('should make a new account', function() {
  	// The "Créer un compte" link should be present
  	expect(element(by.id('link_make_account')).isDisplayed()).toBeTruthy();

  	// Clicking it
    element(by.id('link_make_account').click();

    // Filling the formular
    element(by.id('first_name_registration')).sendKeys("Jean");
    element(by.id('last_name_registration')).sendKeys("Blaguin");
    element(by.id('mail_field_registration')).sendKeys(""); //@TODO : a mail address that we'll purge from the db after and before the test is done
    element(by.id('password_field_registration')).sendKeys("rire");
    element(by.id('confirmation_field_registration')).sendKeys("rire");

    var curTitle = browser.getTitle();

    // We send it
    element(by.id('registration_button')).click();

    // Expect to be on the homepage
    //@TODO
    expect(curTitle == browser.getTitle()).toBeFalsy();
  });*/

  it('should fail to make a new account by using an already used mail address', function() {
    // The "Créer un compte" link should be present
    expect(element(by.id('link_make_account')).isDisplayed()).toBeTruthy();

    // Clicking it
    element(by.id('link_make_account').click();

    // Filling the formular
    element(by.id('first_name_registration')).sendKeys("Jean");
    element(by.id('last_name_registration')).sendKeys("Blaguin");
    element(by.id('mail_field_registration')).sendKeys("");
    element(by.id('password_field_registration')).sendKeys("rire");
    element(by.id('confirmation_field_registration')).sendKeys("error");

    // We send it
    element(by.id('registration_button')).click();

    // Expect an error message
    expect(element(by.id(error_confirmation_registration)).isDisplayed()).toBeTruthy();
  });

  it('should fail to make a new account by using an already used mail address', function() {
    // The "Créer un compte" link should be present
    expect(element(by.id('link_make_account')).isDisplayed()).toBeTruthy();

    // Clicking it
    element(by.id('link_make_account').click();

    // Filling the formular
    element(by.id('first_name_registration')).sendKeys("Jean");
    element(by.id('last_name_registration')).sendKeys("Blaguin");
    element(by.id('mail_field_registration')).sendKeys("default");
    element(by.id('password_field_registration')).sendKeys("rire");
    element(by.id('confirmation_field_registration')).sendKeys("rire");

    // We send it
    element(by.id('registration_button')).click();

    // Expect an error message
    expect(element(by.id(error_mail_registration)).isDisplayed()).toBeTruthy();
  });
});