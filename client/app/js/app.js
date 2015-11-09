/*global angular */
(function (ng) {
  'use strict';

  var app = ng.module('ngLoadScript', []);

  app.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr) {
        if (attr.type === 'text/javascript-lazy') {
          var code = elem.text();
          var f = new Function(code);
          f();
        }
      }
    };
  });

}(angular));

var app = angular.module('scrumBoardApp', [ 'ngLoadScript']);

/* =================================================================== */
/* ========================= MAIN CONTROLLER ========================= */
/* =================================================================== */

app.controller('MainCtrl',function($rootScope, $http){
	
	$rootScope.check_login = function(){		
		hide_all_errors();
		var reg_mail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if(reg_mail.test($rootScope.mail_field_login)){
			
			$http.post("../../../server/auth/local/", {
				email: $rootScope.mail_field_login,
				password: $rootScope.password_field_login
			}).
			success(function(data) {
				alert(data);
				if(data['id'] != undefined && data['email'] != undefined && data['password'] != undefined && data['role'] != undefined){
					$rootScope.user = data;
					sessionStorage.user = JSON.stringify($rootScope.user);
					next();
				}
				else
					show_error_mail_login();
			}).
			error(function(resultat, statut, erreur){
					//alert(JSON.stringify(resultat,null,4));
					alert(statut);
					//alert(erreur);
			}.bind(this));
		}
		else
			show_invalid_mail_login();
	}

	$rootScope.makeAccount = function(){
		hide_all_errors();
		if($rootScope.first_name_registration != undefined &&
		   $rootScope.last_name_registration != undefined &&
		   $rootScope.mail_field_registration != undefined &&
		   $rootScope.password_field_registration != undefined &&
		   $rootScope.confirm_password_registration != undefined ){
			if($rootScope.password_field_registration == $rootScope.confirm_password_field_registration){
				
				var new_user = { "name" : $rootScope.first_name_registration + " " + $rootScope.last_name_registration,
								 "email" : $rootScope.mail_field_registration,
								 "role" : "user",
								 "hashedPassword" : $rootScope.password_field_registration,
								 "provider" : "",
								 "salt" : ""};
				
				$http.post("../../../server/api/user", new_user).
				success(function(data) {
					alert('success');
					if(data['id'] != undefined){
						$rootScope.user = data;
						document.location.href="home.html";
					}
					else
						alert('no make');
				}).
				error(function(resultat, statut, erreur){
						alert(JSON.stringify(resultat,null,4));
				}.bind(this));
			}
			else
				alert('Erreur - Confirmation du mot de passe !');
		}
		else
			alert('Erreur - Formulaire incomplet');
	}
	
	$rootScope.initLoginRegistrattionForm = function(){
		$rootScope.mail_field_login = 'admin@admin.com';
		$rootScope.password_field_login = 'admin';
		
		$rootScope.first_name_registration = '';
		$rootScope.last_name_registration = '';
		$rootScope.mail_field_registration = '';
		$rootScope.password_field_registration = '';
		$rootScope.confirmation_field_registration = '';
	}

	//init forms
	$rootScope.initLoginRegistrattionForm();

});

/* =================================================================== */
/* ========================= HOME CONTROLLER ========================= */
/* =================================================================== */

app.controller('HomeCtrl', function($scope, $http){	
	
	//user connected
	//$scope.user = JSON.parse(sessionStorage.user);
	
	$scope.user = { "name" : "Thibaut",
					"hashedPassword" : "",
					"id" : 1};
	
	// =============== CONTENT PAGE SECTION ===============
	
	$scope.content_page = "team.html";
	
	//switch content
	$scope.clic_button = function(page){
		$('#page').hide();
		$scope.content_page = page;
		$('#page').show('slide', { direction: 'right' });
	}
	
	// ====================== TEAM SECTION ====================
	
	//remove membre to the current project
	$scope.removeMembre = function(index){
		$scope.projects[$scope.current_project]['users'].splice(index,1);
	}

	//add membre to the current project
	$scope.addMembre = function(){
		if($scope.new_membre_name != undefined){
			var new_member_json = {"name" : $scope.new_membre_name,
								  "role" : "Developpeur",
								  "hashedPassword" : "",
								  "id" : 1 }
			$scope.projects[$scope.current_project]['users'].push(new_member_json);
			$scope.initPopupAddMember();
		}
		else
			show_error_mail_empty_user()
		hide_popup_team();
	}
	
	// ====================== BACKLOG SECTION ====================
	
	$scope.current_backlog = [];

	$scope.addUs = function(){
		
		var new_us = {"ID" : 1,
					  "name" : $scope.new_us_title,
					  "description" : "Description",
					  "order" : $scope.new_us_order,
					  "priority" : $scope.new_us_priority, 
					  "difficulty" : $scope.new_us_difficulty,
					  "dependencies" : null };
	  
	  	$http.post("../../../server/api/backlog", new_us).
		success(function(data) {
			//$scope.current_backlog.push(data);
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));
		
		$scope.current_backlog.push(new_us);
	  
		$scope.initPopupAddUs();
		hide_popup_us();
		//makeGranularityChartData();
	}

	$scope.removeUs = function(index){
		
		$http.delete("../../../server/api/backlog", { "id" : index}).
		success(function(data) {
			
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));
		
		$scope.current_backlog.splice(index,1);
		//makeGranularityChartData();
	}

	// ====================== KANBAN SECTION ====================

	$scope.initPopupAddMember = function(){
		$scope.new_membre_name = '';
	}

	$scope.initPopupAddUs = function(){
		$scope.new_us_title = '';
		$scope.new_us_priority = '';
		$scope.new_us_difficulty = '';
	}

	// ===================== PROJECT SECTION ===================
		
	//stock the number of the current project
	$scope.current_project = 0;
	
	$scope.initProject = function(){
		//$http.get("../../../server/api/project").
		$http.get("test_project.json").
		success(function(data) {
			$scope.projects = data;
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));	
	}
	
	$scope.initProject();
	
	$scope.addProject = function(){
		if($scope.new_project_name != undefined){
			var new_project = {"name" : $scope.new_project_name,
							   "state" : 0,
							   "style" : "progress-bar-success",
							   "users" : [],
							   "backlog" : -1
			};
			
			$http.post("../../../server/api/project", new_project).
			success(function(data) {

			}).
			error(function(resultat, statut, erreur){
					alert(JSON.stringify(resultat,null,4));
			}.bind(this));
			
			$scope.projects.push(new_project);
			hide_popup_project();
		}
		else
			show_error_name_project();
	}
	
	$scope.switchProject = function(index){
		
		//we fetch the backog
		$http.post("../../../server/api/backlog", {"id" : $scope.projects[$scope.current_project]['backlog']}).
		success(function(data) {
			$scope.current_backlog = data;
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));
			
		$('#project_' + $scope.current_project).removeClass('background_black_transparent');
		$scope.current_project = index;
		$('#project_' + $scope.current_project).addClass('background_black_transparent');
		$scope.clic_button($scope.buttons[0]['page']);
	}
	
	//init forms
	$scope.initPopupAddMember();
	$scope.initPopupAddUs();
});
