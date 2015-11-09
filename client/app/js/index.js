<!-- ERROR FORM  -->

//function error mail login
function show_error_mail_login(){
	$('#error_mail_login').show();
}

function hide_error_mail_login(){
	$('#error_mail_login').hide();
}

//function invalid mail login
function show_invalid_mail_login(){
	$('#invalid_mail_login').show();
}

function hide_invalid_mail_login(){
	$('#invalid_mail_login').hide();
}

//function error password login
function show_error_password_login(){
	$('#error_password_login').show();
}

function hide_error_password_login(){
	$('#error_password_login').hide();
}

//function error mail registration
function show_error_mail_registration(){
	$('#error_mail_registration').show();
}

function hide_error_mail_registration(){
	$('#error_mail_registration').hide();
}

//function error confirmation registration
function show_error_confirmation_registration(){
	$('#error_confirmation_registration').show();
}

function hide_error_confirmation_registration(){
	$('#error_confirmation_registration').hide();
}

function hide_all_errors(){	
	hide_error_mail_login();
	hide_invalid_mail_login();
	hide_error_password_login();
	hide_error_mail_registration();
	hide_error_confirmation_registration();
}

hide_all_errors();

$('#account_section').hide();

function account(){
	$('#login_section').hide();
	$('#account_section').show('slide');
}

function login(){
	$('#account_section').hide();
	$('#login_section').show('slide');
}
