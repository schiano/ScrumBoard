'use strict';

//$('#project_0').addClass('background_black_transparent');

/* ERROR MESSAGE SCRIPT */

//function error mail unknown user
function show_error_mail_unknown_user(){
	$('#error_mail_unknown_user').show();
}

function hide_error_mail_unknown_user(){
	$('#error_mail_unknown_user').hide();
}

//function error mail empty user
function show_error_mail_empty_user(){
	$('#error_mail_empty_user').show();
}

function hide_error_mail_empty_user(){
	$('#error_mail_empty_user').hide();
}

//function error mail user
function show_error_name_project(){
	$('#error_name_project').show();
}

function hide_error_name_project(){
	$('#error_name_project').hide();
}

//function error mail user
function show_error_backlog(){
	$('#error_backlog').show();
}

function hide_error_backlog(){
	$('#error_backlog').hide();
}

//function error task form empty
function show_error_task_form_empty(){
	$('#error_task_name_empty').show();
}

function hide_error_task_form_empty(){
	$('#error_task_name_empty').hide();
}

//function error user unknown
function show_error_user_unknown(){
	$('#error_user_unknown').show();
}

function hide_error_user_unknown(){
	$('#error_user_unknown').hide();
}

function show_error_task_not_inquire(){
	$('#error_task_not_inquire').show();
}

//function error task not inquire
function hide_error_task_not_inquire(){
	$('#error_task_not_inquire').hide();
}

function hide_all_errors(){
	hide_error_name_project();
	hide_error_mail_unknown_user();
	hide_error_mail_empty_user();
	hide_error_backlog();
	hide_error_task_form_empty();
	hide_error_user_unknown();
	hide_error_task_not_inquire();
}

hide_all_errors();
	
/* POPUP SCRIPT */

function show_popup_project(){
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-project').removeClass('display-none');
}

function hide_popup_project(){
	hide_all_errors();
	$('#sub-body').removeClass('sub-body-blur');
	$('#popup-project').addClass('display-none');
}

function show_popup_team(){
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-team').removeClass('display-none');
}

function hide_popup_team(){
	hide_all_errors();
	$('#sub-body').removeClass('sub-body-blur');
	$('#popup-team').addClass('display-none');
}

function show_popup_task(){
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-task').removeClass('display-none');
}

function hide_popup_task(){
	hide_all_errors();
	$('#sub-body').removeClass('sub-body-blur');
	$('#popup-task').addClass('display-none');
}

function show_popup_dependencies(){
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-dependencies').removeClass('display-none');
}

function hide_popup_dependencies(){
	hide_all_errors();
	$('#sub-body').removeClass('sub-body-blur');
	$('#popup-dependencies').addClass('display-none');
}

function show_popup_us(){
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-us').removeClass('display-none');
}

function show_edit_popup_us(index){
	var scope = angular.element($('body')).scope();
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-us').removeClass('display-none');
	
	$('#new_us_title').val(scope.current_backlog[index]['name']);
	scope.new_us_title = scope.current_backlog[index]['name'];
	$('#new_us_order').val(scope.current_backlog[index]['order']);
	scope.new_us_order = scope.current_backlog[index]['order'];
	$('#new_us_priority').val(scope.current_backlog[index]['priority']);
	scope.new_us_priority = scope.current_backlog[index]['priority'];
	$('#new_us_difficulty').val(scope.current_backlog[index]['difficulty']);
	scope.new_us_difficulty = scope.current_backlog[index]['difficulty'];
	$('#new_us_sprint').val(scope.current_backlog[index]['sprintId']);
	scope.new_us_sprint = scope.current_backlog[index]['sprintId'];
	
	scope.edit_us_number = index;
}

function show_edit_popup_task(index_task_global,index_task_current){
	var scope = angular.element($('body')).scope();
	$('#sub-body').addClass('sub-body-blur');
	$('#popup-task').removeClass('display-none');
	
	$('#new_task_name').val(scope.tasks[index_task_global]['name']);
	scope.new_task_name = scope.tasks[index_task_global]['name'];
	$('#new_task_order').val(scope.tasks[index_task_global]['order']);
	scope.new_task_order = scope.tasks[index_task_global]['order'];
	$('#new_task_user').val(scope.tasks[index_task_global]['assigned']);
	scope.new_task_user = scope.tasks[index_task_global]['assigned'];
	$('#new_task_cost').val(scope.tasks[index_task_global]['cost']);
	scope.new_task_cost = scope.tasks[index_task_global]['cost'];
	
	scope.edit_task_number = index_task_global;
	scope.edit_task_current_us = index_task_current;
}

function hide_popup_us(){
	hide_all_errors();
	$('#sub-body').removeClass('sub-body-blur');
	$('#popup-us').addClass('display-none');
	clear_us_form();
}

function clear_us_form(){
	$('#new_us_title').val('');
	$('#new_us_order').val('');
	$('#new_us_priority').val('');
	$('#new_us_difficulty').val('');
	$('#new_us_sprint').val('');
}

/* GRANULARITY CHART */

function makeGranularityChartData(){
	var scope = angular.element($('body')).scope();

	var GranularityChartData = {
		labels : scope.labels,
		datasets : [
		{
			label: 'Granularity Chart',
			fillColor : 'rgba(220,220,220,0.2)',
			strokeColor : 'rgba(220,220,220,1)',
			pointColor : 'rgba(220,220,220,1)',
			pointStrokeColor : '#fff',
			pointHighlightFill : '#fff',
			pointHighlightStroke : 'rgba(220,220,220,1)',
			data : scope.backlog_difficulty
		}
		]
	}

	//granularity chart
	var ctxGranularityChart = document.getElementById('canvas-granularity').getContext('2d');
	window.myLine = new Chart(ctxGranularityChart).Line(GranularityChartData, {
		responsive: true
	});
}
