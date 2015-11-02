describe('Connextion test suit', function() {

  beforeEach(function() {
  	browser.driver.get('about:blank');
  	browser.get('/');
  });

  /*it('should connect using the default user', function() {

  	// Filling the mail field
  	element(by.id('mail_field_login')).sendKeys('default');

    // Clicking "suivant"
    element(by.id('next_button')).click();

    // Filling the password field
    element(by.id('password_field_login')).sendKeys('123');

    // Clicking 'connexion'
    element(by.id('login_button')).click();

  	// Expecting to be authentified on the home page
    //@TODO
  });*/

  it('should fail to connect with a wrong mail address', function() {

    // Filling the mail field
    element(by.id('mail_field_login')).sendKeys('fail');

    // Clicking "suivant"
    element(by.id('next_button')).click();

    // Expect an error message
    expect(element(by.id(error_mail_login)).isDisplayed()).toBeTruthy();
  });

  it('should fail to connect with a wrong password', function() {

    // Filling the mail field
    element(by.id('mail_field_login')).sendKeys('default');

    // Clicking "suivant"
    element(by.id('next_button')).click();

    // Filling the password field
    element(by.id('password_field_login')).sendKeys('123');

    // Clicking 'connexion'
    element(by.id('login_button')).click();

    // Expect an error message
    expect(element(by.id(error_password_login)).isDisplayed()).toBeTruthy();
  });
});