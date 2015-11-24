describe('Connextion test suit', function() {

  beforeEach(function() {
  	//browser.driver.get('about:blank');
  	browser.get('/');
  });

  it('should connect using the default user', function() {

  	// Filling the mail field
  	element(by.id('mail_field_login')).sendKeys('test@test.com');

    // Filling the password field
    element(by.id('password_field_login')).sendKeys('test');

    // Clicking 'connexion'
    element(by.id('next_button')).click();

    browser.waitForAngular();

  	// Expecting to be authentified on the home page
    expect(element(by.id('user_name')).getAttribute('value')).toEqual("test");
  });

  it('should fail to connect with a wrong mail address', function() {

    // Filling the mail field
    element(by.id('mail_field_login')).sendKeys('fail');

    // Clicking 'connexion'
    element(by.id('next_button')).click();

    // Expect an error message
    expect(element(by.id('error_mail_login')).isDisplayed()).toBeTruthy();
  });

  it('should fail to connect with a wrong password', function() {

    // Filling the mail field
    element(by.id('mail_field_login')).sendKeys('test@test.com');

    // Filling the password field
    element(by.id('password_field_login')).sendKeys('raté');

    // Clicking 'connexion'
    element(by.id('next_button')).click();

    // Expect an error message
    expect(element(by.id('error_password_login')).isDisplayed()).toBeTruthy();
  });
});