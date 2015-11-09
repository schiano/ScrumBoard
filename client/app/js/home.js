
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

function hide_all_errors(){
	hide_error_name_project();
	hide_error_mail_unknown_user();
	hide_error_mail_empty_user();
	hide_error_backlog();
}

hide_all_errors();
	
/* POPUP SCRIPT */

function show_popup_project(){
	$('#sub-body').addClass("sub-body-blur");
	$('#popup-project').removeClass('display-none');
}

function hide_popup_project(){
	hide_all_errors();
	$('#sub-body').removeClass("sub-body-blur");
	$('#popup-project').addClass('display-none');
}

function show_popup_team(){
	$('#sub-body').addClass("sub-body-blur");
	$('#popup-team').removeClass('display-none');
}

function hide_popup_team(){
	hide_all_errors();
	$('#sub-body').removeClass("sub-body-blur");
	$('#popup-team').addClass('display-none');
}

function show_popup_us(){
	$('#sub-body').addClass("sub-body-blur");
	$('#popup-us').removeClass('display-none');
}

function hide_popup_us(){
	hide_all_errors();
	$('#sub-body').removeClass("sub-body-blur");
	$('#popup-us').addClass('display-none');
}

/* GRANULARITY CHART */

function makeGranularityChartData(){
	var scope = angular.element($("body")).scope();

	var GranularityChartData = {
		labels : scope.labels,
		datasets : [
		{
			label: "Granularity Chart",
			fillColor : "rgba(220,220,220,0.2)",
			strokeColor : "rgba(220,220,220,1)",
			pointColor : "rgba(220,220,220,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(220,220,220,1)",
			data : scope.backlog_difficulty
		}
		]
	}

	//granularity chart
	var ctxGranularityChart = document.getElementById("canvas-granularity").getContext("2d");
	window.myLine = new Chart(ctxGranularityChart).Line(GranularityChartData, {
		responsive: true
	});
}
