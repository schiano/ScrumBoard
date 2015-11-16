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
			$http.post('auth/local', {
				email: $rootScope.mail_field_login,
				password: $rootScope.password_field_login
			}).
			success(function(data) {
				if(data['token'] != undefined){
					sessionStorage.token = JSON.stringify(data['token']);
					$http.get('api/users/me',{ 
					headers: {'Authorization' : 'Bearer ' + data['token']}}).
					success(function(data) {
						sessionStorage.user = JSON.stringify(data);
						document.location.href='home.html';
					}).
					error(function(resultat, statut, erreur){
							alert(JSON.stringify(resultat,null,4));
					}.bind(this));
				}
				else
					show_error_mail_login();
			}).
			error(function(resultat, statut, erreur){
					alert(JSON.stringify(resultat,null,4));
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
		   $rootScope.confirm_password_field_registration != undefined ){
			if($rootScope.password_field_registration == $rootScope.confirm_password_field_registration){ 
				
				new_user = {'email': $rootScope.mail_field_registration,
							'password' : $rootScope.password_field_registration};
				
				$http.post('api/users/', new_user).
				success(function(data) {
					$rootScope.user = data;
					sessionStorage.user = JSON.stringify(data);
					document.location.href='home.html';
				}).
				error(function(resultat, statut, erreur){
					alert(JSON.stringify(resultat,null,4));
					alert(statut);
					alert(erreur);
				}.bind(this));
			}
			else
				alert('Erreur - Confirmation du mot de passe !');
		}
		else
			alert('Erreur - Formulaire incomplet');
	}
	
	$rootScope.initLoginRegistrattionForm = function(){
		$rootScope.mail_field_login = 'schaerer.thibaut@gmail.com';
		$rootScope.password_field_login = 'titi';
		
		$rootScope.first_name_registration = '';
		$rootScope.last_name_registration = '';
		$rootScope.mail_field_registration = '';
		$rootScope.password_field_registration = '';
		$rootScope.confirm_password_field_registration = '';
	}

	//init forms
	$rootScope.initLoginRegistrattionForm();

});

/* =================================================================== */
/* ========================= HOME CONTROLLER ========================= */
/* =================================================================== */

app.controller('HomeCtrl', function($scope, $http){	
	
	//user connected
	$scope.user = JSON.parse(sessionStorage.user);
	//alert(sessionStorage.user);
	$scope.token = JSON.parse(sessionStorage.token);
	
	// =============== CONTENT PAGE SECTION ===============
	
	$scope.content_page = 'team.html';
	$scope.content_section = 'team';
	
	//switch content
	$scope.clic_button = function(section){
		
		//remove button active
		$('#btn-' + $scope.content_section).removeClass('box-button-active');
		$('#btn-' + $scope.content_section).addClass('box-button-no-active');
		
		//switch page
		$('#page').hide();
		$scope.content_page = section + ".html";
		$scope.content_section = section;
		$('#page').show('slide', { direction: 'right' });
		
		//add button active
		$('#btn-' + section).addClass('box-button-active');
		$('#btn-' + section).removeClass('box-button-no-active');
	}
	
	// ====================== TEAM SECTION ====================
	
	//remove membre to the current project
	$scope.removeMembre = function(index){
		/*$http.delete('api/project/user', { 'id' : index}).
		success(function(data) {
			$scope.projects[$scope.current_project]['members'].splice(index,1);
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));*/
		
		$scope.projects[$scope.current_project]['members'].splice(index,1);
	}

	//add membre to the current project
	$scope.addMembre = function(){
		if($scope.new_membre_name != undefined){
			//we fetch the user
			$http.get('api/users/search?email=' + $scope.new_membre_name,{ 
			headers: {'Authorization' : 'Bearer ' + $scope.token}}).
			success(function(data) {
				//we add the user
				var new_member_json = {'userId' : data['_id'],
									   'name' : $scope.new_membre_name,
									   'canEdit' : $('#user_right').val()};
				$scope.projects[$scope.current_project]['members'].push(new_member_json);
				$scope.initPopupAddMember();
			}).
			error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
			});
		}
		else
			show_error_mail_empty_user()
		hide_popup_team();
	}
	
	// ====================== BACKLOG SECTION ====================
	
	$scope.current_backlog = [];
	$scope.edit_us_number = -1;
	
	$scope.getUsIndex = function(us_name){
		for(var i=0; i<$scope.current_backlog.length; ++i){
			if($scope.current_backlog[i]['name'] == us_name)
				return i;
		}
	}

	$scope.editUs = function(){
		
		var new_us = {'ID' : $scope.current_backlog[$scope.edit_us_number]['ID'],
					  'name' : $scope.new_us_title,
					  'description' : $scope.current_backlog[$scope.edit_us_number]['description'],
					  'order' : $scope.new_us_order,
					  'priority' : $scope.new_us_priority, 
					  'difficulty' : $scope.new_us_difficulty,
					  'sprint' : $scope.new_us_sprint,
					  'dependencies' : $scope.current_backlog[$scope.edit_us_number]['dependencies'] };	
			
		/*$http.put('api/backlog', new_us).
		success(function(data) {
			$scope.current_backlog[index] = data;
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));*/
					  
		$scope.current_backlog[$scope.edit_us_number] = new_us;
		$scope.edit_us_number = -1;
		hide_popup_us();
	}

	$scope.addUs = function(){
		
		if($scope.edit_us_number != -1)
			$scope.editUs();
		else{
			var new_us = {'ID' : 0,
						  'name' : $scope.new_us_title,
						  'description' : 'Description',
						  'order' : $scope.new_us_order,
						  'priority' : $scope.new_us_priority, 
						  'difficulty' : $scope.new_us_difficulty,
						  'sprint' : $scope.new_us_sprint,
						  'dependencies' : null,
						  'tasks_id' :  $scope.tasks.length};
						  
			var taks_list = {'id' : $scope.tasks.length,
					 		 'tasks' : [] };
			
			$scope.tasks.push(taks_list);
		  
			$http.post('api/backlog', new_us).
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
	}

	$scope.removeUs = function(index){
		
		/*$http.delete('api/backlog/user', { 'id' : index}).
		success(function(data) {
			$scope.current_backlog.splice(index,1);
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));*/
		
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
						
	$('#select-projet-text').removeClass('display-none');
	$('#no-projet-text').addClass('display-none');
	
	$scope.projects = [];
	
	$scope.initProject = function(){
		$http.get('api/projects/user/'+$scope.user['_id']).
		success(function(data) {
			if(JSON.stringify(data) != '[]'){
				$('#select-projet-text').removeClass('display-none');
				$('#no-projet-text').addClass('display-none');
				$scope.projects = data;
			}
			else{
				$('#no-projet-text').removeClass('display-none');
				$('#select-projet-text').addClass('display-none');
			}
		}).
		error(function(resultat, statut, erreur){
			alert(JSON.stringify(resultat,null,4));
			alert(statut);
			alert(erreur);	
		}.bind(this));	
	}
	
	$scope.initProject();
	
	$scope.addProject = function(){
		if($scope.new_project_name != undefined){
			
			var new_project = {
				'name' : $scope.new_project_name,
				'description' : 'desc',
				'owner' : {
					'userId' : $scope.user['_id'],
					'name' : $scope.user['email']
				},
				'members' : [
					{
						'userId' : $scope.user['_id'],
						'name' : $scope.user['email'],
						'canEdit' : true
					}
				],
				'isPublic' : true,
				'backlog' : '-1',
				'progress' : 0,
				'style' : 'progress-bar-danger'
			};
				
			$http.post('api/projects', 
			new_project,
			{ headers : {'Authorization' : 'Bearer ' + $scope.token }}).
			success(function(data) {
				$scope.projects.push(data);
				hide_popup_project();
			}).
			error(function(resultat, statut, erreur){
					alert(JSON.stringify(resultat,null,4));
					alert(statut);
					alert(erreur);
			}.bind(this));
			
		}
		else
			show_error_name_project();
	}
	
	$scope.switchProject = function(index){
		
		//switch the tab
		$('#project_' + $scope.current_project).removeClass('background_black_transparent'); 
		$scope.current_project = index;
		$('#project_' + $scope.current_project).addClass('background_black_transparent');
		
		//we fetch the backog of the current project
		/*$http.post('api/backlog', 
		{'id' : $scope.projects[$scope.current_project]['backlog']},
		{ headers : {'Authorization' : 'Bearer ' + $scope.token }}).
		success(function(data) {
			$scope.current_backlog = data;
		}).
		error(function(resultat, statut, erreur){
				alert(JSON.stringify(resultat,null,4));
		}.bind(this));*/
		
		$('#dashboard').removeClass('display-none'); // show the backlog
		$('#dashboard-empty').addClass('display-none'); // hide the main text
		
		//show page's team of the project selected
		$scope.clic_button('team');
	}
	
	$scope.todo = [];
	$scope.onGoing = [];
	$scope.done = [];
	
	$scope.current_tasks_id = -1;
	
	$scope.current_backlog = [
								{
									'ID' : 0,
									'name' : 'US 1',
									'description' : 'Description',
									'order' : 1,
									'priority' : 2, 
									'difficulty' : 3,
									'sprint' : 1,
									'dependencies' : null,
									'tasks_id' : 0 
								},
								{
									'ID' : 1,
									'name' : 'US 2',
									'description' : 'Description',
									'order' : 1,
									'priority' : 2, 
									'difficulty' : 3,
									'sprint' : 2,
									'dependencies' : null,
									'tasks_id' : 1
								}
							 ];
							 
	$scope.addTaskToScope = function(name, state){
		switch(state){
			case 'todo' :
				$scope.todo.push(name);
				break;
			case 'onGoing' :
				$scope.onGoing.push(name);
				break;	
			case 'done' :
				$scope.done.push(name);
				break;	
		}		
	}
				
	$scope.selectUS = function(task_id){
		
		$scope.todo = [];
		$scope.onGoing = [];
		$scope.done = [];
		
		$scope.current_tasks_id = task_id;

		for(var i=0; i<$scope.tasks.length; ++i)
			if($scope.tasks[i]['id'] == task_id)
				for(var j=0; j<$scope.tasks[i]['tasks'].length; ++j)
					$scope.addTaskToScope($scope.tasks[i]['tasks'][j]['name'], $scope.tasks[i]['tasks'][j]['state']);	
	}
	
	$scope.addTask = function(){
		if($scope.new_task_name == undefined)
			show_error_task_name_empty();
			
		for(var i=0; i<$scope.tasks.length; ++i)
			if($scope.tasks[i]['id'] == $scope.current_tasks_id)	
				$scope.tasks[i]['tasks'].push({'name' : $scope.new_task_name, 'state' : $scope.new_task_state});
		
		$scope.addTaskToScope($scope.new_task_name, $scope.new_task_state);
		
		hide_popup_task();
	}
		
	$scope.changeTaskState = function(name,new_state){
		for(var i=0; i<$scope.tasks.length; ++i)
			if($scope.tasks[i]['id'] == $scope.current_tasks_id)
				for(var j=0; j<$scope.tasks[i]['tasks'].length; ++j)
					if($scope.tasks[i]['tasks'][j]['name'] == name)
						$scope.tasks[i]['tasks'][j]['state'] = new_state;
	}
							  
	$scope.tasks = [{'id' : 0,
					 'tasks' :
						[
							{
							'name' : 'test task 1',
							'state' : 'todo'
							},
							{ 
							'name' : 'test task 2',
							'state' : 'todo'
							} 
						]
					 },
					 {'id' : 1,
					 'tasks' : 
						[
							{
							'name' : 'test task 3',
							'state' : 'todo'
							},
							{ 
							'name' : 'test task 4',
							'state' : 'todo'
							} 
						]
					 }];
	
	//init forms
	$scope.initPopupAddMember();
	$scope.initPopupAddUs();
});
