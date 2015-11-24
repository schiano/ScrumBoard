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
						if(statut == "401")
							$scope.session_inactive();
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
					if(statut == "401")
						$scope.session_inactive();
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

	$scope.session_inactive = function(){
		alert('Votre session à expiré ! Vous devez vous connecter de nouveau !');
		document.location.href= "index.html";
	}
	
	//user connected
	$scope.user = JSON.parse(sessionStorage.user);
	//alert(sessionStorage.user);
	$scope.token = JSON.parse(sessionStorage.token);
	
	// =============== CONTENT PAGE SECTION ===============
	
	$scope.content_page = 'team.html';
	$scope.content_section = 'team';
	
	$scope.slide_page = function(section){
		//switch page
		$('#page').hide();
		$scope.content_page = section + ".html";
		$('#page').show('slide', { direction: 'right' });
	}
	
	//switch content
	$scope.clic_button = function(section){
		
		//remove button active
		$('#btn-' + $scope.content_section).removeClass('box-button-active');
		$('#btn-' + $scope.content_section).addClass('box-button-no-active');
		
		$scope.content_section = section;
		$scope.slide_page(section);
		
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
				if(data != ''){
					//we add the user
					var new_member_json = {'userId' : data['_id'],
										   'name' : $scope.new_membre_name,
										   'canEdit' : $('#user_right').val()};
					$scope.projects[$scope.current_project]['members'].push(new_member_json);
					$scope.initPopupAddMember();
					hide_popup_team();
				}
				else
					show_error_mail_unknown_user();
			}).
			error(function(resultat, statut, erreur){
				if(statut == "401")
					$scope.session_inactive();
				alert(JSON.stringify(resultat,null,4));
			});
		}
		else
			show_error_mail_empty_user();
	}
	
	// ====================== BACKLOG SECTION ====================
	
	//$scope.current_backlog = [];
	
	$scope.edit_us_number = -1;
	
	$scope.getIndex = function(array,id){
		for(var i=0; i<array.length; ++i){
			if(array[i]['id'] == id)
				return i;
		}
	}

	$scope.editUs = function(){
		
		var new_us = {'id' : $scope.current_backlog[$scope.edit_us_number]['id'],
					  'name' : $scope.new_us_title,
					  'description' : $scope.current_backlog[$scope.edit_us_number]['description'],
					  'order' : $scope.new_us_order,
					  'priority' : $scope.new_us_priority, 
					  'difficulty' : $scope.new_us_difficulty,
					  'sprintId' : $scope.new_us_sprint,
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
			var new_id = parseInt($scope.current_backlog[$scope.current_backlog.length-1]['id'])+1;
			var new_us = {'id' : new_id,
						  'name' : $scope.new_us_title,
						  'description' : 'Description',
						  'order' : parseInt($scope.new_us_order),
						  'priority' : parseInt($scope.new_us_priority), 
						  'difficulty' : parseInt($scope.new_us_difficulty),
						  'sprintId' : parseInt($scope.new_us_sprint),
						  'dependencies' : null,
						  'tasks' : []};

			$http.post('api/backlog', new_us).
			success(function(data) {
				//$scope.current_backlog.push(data);
			}).
			error(function(resultat, statut, erreur){
				if(statut == "401")
						$scope.session_inactive();
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
	
	// ====================== USER STORIE SECION ======================
	
	$scope.current_us_tasks = []; // array use for show the all of the tasks of an user storie in the user-stories html page 
	$scope.current_us_name;
	$scope.current_us_id;
	$scope.edit_task_number = -1; // task's id in the global array
	$scope.edit_task_current_us = -1; // task's id in the current us
	
	$scope.current_task;
	
	$scope.current_dep_tasks;
	$scope.other_task_list = [];
	
	$scope.makeCurrentUsTaskArray = function(us){
		$scope.current_us_tasks = []; //we reinitialize the array of the current tasks
		
		for(var i=0; i<us['tasks'].length; ++i)
			for(var j=0; j<$scope.tasks.length; ++j)
				if(us['tasks'][i] == $scope.tasks[j]['id'])
					$scope.current_us_tasks.push($scope.tasks[j]);	
	}
	
	$scope.showUs = function(us){
		$scope.current_us_name = us['name'];
		$scope.current_us_id = us['id'];

		$scope.makeCurrentUsTaskArray(us);
	
		$scope.slide_page('user-stories');	
	}
	
	$scope.removeTask = function(index_task_global,index_task_current){
		$scope.tasks.splice(index_task_global,1);
		$scope.current_us_tasks.splice(index_task_current,1);
	}
	
	$scope.editTask = function(){
		
		var new_task = {'id' : $scope.tasks[$scope.edit_task_number]['id'],
						'name' : $scope.new_task_name,
						'description' : $scope.tasks[$scope.edit_task_number]['description'],
						'order' : $scope.new_task_order,
						'cost' : $scope.new_task_cost,
						'dependencies' : $scope.tasks[$scope.edit_task_number]['dependencies'],
						'assigned' : $scope.new_task_user,
						'progress' : $scope.tasks[$scope.edit_task_number]['progress'],
						'state' : $scope.tasks[$scope.edit_task_number]['state']
						};
						
		$scope.tasks[$scope.edit_task_number] = new_task;
		
		$scope.current_us_tasks[$scope.edit_task_current_us] = new_task;
		
		$scope.edit_task_number = -1;
		$scope.edit_task_current_us = -1;
		hide_popup_task();
	}
	
	$scope.showDep = function(task){
		$scope.current_task = task; 
		$scope.current_dep_tasks = [];
		
		for(var i=0; i<$scope.tasks.length; ++i)
			if(isIn(task['dependencies'],$scope.tasks[i]['id']))
				$scope.current_dep_tasks.push($scope.tasks[i]);
	
		$scope.slide_page('dependencies');
	}
	
	$scope.makeOtherTaskList = function(){
		
		$scope.other_task_list = [];
		
		for(var i=0; i<$scope.current_us_tasks.length; ++i){
			if($scope.current_us_tasks[i]['id'] != $scope.current_task['id'] && !isIn($scope.current_task['dependencies'],$scope.current_us_tasks[i]['id']))
				$scope.other_task_list.push($scope.current_us_tasks[i]);
		}
		
		$scope.new_dep_task = undefined;
		show_popup_dependencies();	
	}
	
	$scope.addDep = function(){	
		if($scope.new_dep_task != undefined){
			var task  = JSON.parse($scope.new_dep_task);
			for(var i=0; i<$scope.tasks.length; ++i)
				if($scope.tasks[i]['id'] == $scope.current_task['id'])
					$scope.tasks[i]['dependencies'].push(task['id']);
			
			for(var i=0; i<$scope.current_us_tasks.length; ++i)
				if($scope.current_us_tasks[i]['id'] == $scope.current_task['id'])
					$scope.current_us_tasks[i]['dependencies'].push(task['id']);
			
			$scope.current_dep_tasks.push(task);
			
			hide_popup_dependencies();
		}
		else
			show_error_task_not_inquire();
	}
	
	$scope.removeDep = function(index,task_id){
		
		//var task = $scope.current_dep_tasks[index];
		//alert(JSON.parse(task));
		
		for(var i=0; i<$scope.tasks[index]['dependencies']; ++i)
			if($scope.tasks[index]['dependencies'][i] == task_id)
				$scope.tasks[index]['dependencies'].splice(i,1);
				
		for(var i=0; i<$scope.current_us_tasks.length; ++i)
			if($scope.current_us_tasks[i]['id'] == $scope.current_task['id'])
				for(var j=0; j<$scope.current_us_tasks[i]['dependencies'].length; ++j)
					if($scope.current_us_tasks[i]['dependencies'][j] == task_id)
						$scope.current_us_tasks[i]['dependencies'].splice(j,1);
				
		for(var i=0; i<$scope.current_dep_tasks.length; ++i)
			if($scope.current_dep_tasks[i]['id'] == task_id)
				$scope.current_dep_tasks.splice(i,1);
	}
	
	$scope.addTask = function(){
		if($scope.edit_task_number != -1)
			$scope.editTask();
		else{
			if($scope.new_task_name != undefined &&
				$scope.new_task_user != undefined &&
				$scope.new_task_order != undefined &&
				$scope.new_task_cost != undefined){
					
				$http.get('api/users/search?email=' + $scope.new_task_user,{ 
				headers: {'Authorization' : 'Bearer ' + $scope.token}}).
				success(function(data) {
					if(data != ''){
						var new_id = parseInt($scope.tasks[$scope.tasks.length-1]['id'])+1;
						var new_task = {'id' : new_id,
										'name' : $scope.new_task_name,
										'description' : '',
										'order' : $scope.new_task_order,
										'cost' : $scope.new_task_cost,
										'dependencies' : [],
										'assigned' : $scope.new_task_user,
										'progress' : 0,
										'state' : 'todo'
									};
									
						$scope.tasks.push(new_task);// add the new task to the global array tasks
						$scope.current_us_tasks.push(new_task); // ass the new task to the current array rasks
						
						//add the new task's id in the id's tasks array of the current us 
						for(var i=0; i<$scope.current_backlog.length; ++i)
							if($scope.current_backlog[i]['id'] == $scope.current_us_id)
								$scope.current_backlog[i]['tasks'].push(new_id);
								
						hide_popup_task();
					}
					else
						show_error_user_unknown();
				}).
				error(function(resultat, statut, erreur){
					if(statut == "401")
						$scope.session_inactive();
					alert(JSON.stringify(resultat,null,4));
						alert(statut);
						alert(erreur);
				});
			}
			else
				show_error_task_form_empty();
		}
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
			if(statut == "401")
						$scope.session_inactive();
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
				'us' : [0,1], // list of the user stories
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
				if(statut == "401")
						$scope.session_inactive();
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
	
	$scope.initKanban = function(){
		$scope.todo = [];
		$scope.onGoing = [];
		$scope.done = [];	
	}
	
	$scope.initKanban();

	$scope.current_sprint = -1;
							 
	$scope.addTaskToScope = function(task, state){
		switch(state){
			case 'todo' :
				$scope.todo.push(task);
				break;
			case 'onGoing' :
				$scope.onGoing.push(task);
				break;	
			case 'done' :
				$scope.done.push(task);
				break;	
		}		
	}
				
	$scope.selectUS = function(sprint){
		
		$scope.initKanban();
		
		$scope.current_sprint = sprint;
		
		for(var i=0; i<$scope.current_backlog.length; ++i)
			if($scope.current_backlog[i]['sprintId'] == sprint)
				for(var j=0; j<$scope.current_backlog[i]['tasks'].length; ++j)
					for(var k=0; k<$scope.tasks.length; ++k)
						if($scope.tasks[k]['id'] == $scope.current_backlog[i]['tasks'][j])
							$scope.addTaskToScope($scope.tasks[k], $scope.tasks[k]['state']);	
	}
	
	//add Task To the kanban
	/*$scope.addTask = function(){
		if($scope.new_task_name == undefined)
			show_error_task_name_empty();
			
		for(var i=0; i<$scope.tasks.length; ++i)
			if($scope.tasks[i]['id'] == $scope.current_tasks_id)	
				$scope.tasks[i]['tasks'].push({'name' : $scope.new_task_name, 'state' : $scope.new_task_state});
		
		$scope.addTaskToScope($scope.new_task_name, $scope.new_task_state);
		
		hide_popup_task();
	}*/
		
	$scope.changeTaskState = function(id,new_state){
		for(var i=0; i<$scope.current_backlog.length; ++i)
			if($scope.current_backlog[i]['sprintId'] == $scope.current_sprint)
				for(var j=0; j<$scope.current_backlog[i]['tasks'].length; ++j)
					for(var k=0; k<$scope.tasks.length; ++k)
						if($scope.tasks[k]['id'] == id)
							$scope.tasks[k]['state'] = new_state;
	}
	
	//the backlog 
	$scope.current_backlog = [
								{
									'id' : 0,
									'name' : 'US 1',
									'description' : 'Description',
									'order' : 1,
									'priority' : 2, 
									'difficulty' : 3,
									'sprintId' : 1,
									'dependencies' : [],
									'tasks' : [0,1,4,5,6,7,8,9,10,11] 
								},
								{
									'id' : 1,
									'name' : 'US 2',
									'description' : 'Description',
									'order' : 1,
									'priority' : 2, 
									'difficulty' : 3,
									'sprintId' : 2,
									'dependencies' : [],
									'tasks' : [2,3]
								}
							 ];
							  
	$scope.tasks = [{
					'id' : 0,
					'name' : 'task 0',
					'description' : '',
					'order' : 0,
					'cost' : 2,
					'dependencies' : [],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{ 
					'id' : 1,
					'name' : 'task 1',
					'description' : '',
					'order' : 0,
					'cost' : 3,
					'dependencies' : [0],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 2,
					'name' : 'task 2',
					'description' : '',
					'order' : 0,
					'cost' : 1,
					'dependencies' : [],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{ 
					'id' : 3,
					'name' : 'task 3',
					'description' : '',
					'order' : 0,
					'cost' : 2,
					'dependencies' : [2],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 4,
					'name' : 'task 4',
					'description' : '',
					'order' : 0,
					'cost' : 5,
					'dependencies' : [0],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 5,
					'name' : 'task 5',
					'description' : '',
					'order' : 0,
					'cost' : 6,
					'dependencies' : [],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 6,
					'name' : 'task 6',
					'description' : '',
					'order' : 0,
					'cost' : 4,
					'dependencies' : [4,5],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 7,
					'name' : 'task 7',
					'description' : '',
					'order' : 0,
					'cost' : 1,
					'dependencies' : [4,5],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 8,
					'name' : 'task 8',
					'description' : '',
					'order' : 0,
					'cost' : 2,
					'dependencies' : [7],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 9,
					'name' : 'task 9',
					'description' : '',
					'order' : 0,
					'cost' : 2,
					'dependencies' : [7],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 10,
					'name' : 'task 10',
					'description' : '',
					'order' : 0,
					'cost' : 6,
					'dependencies' : [8,9],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					},
					{
					'id' : 11,
					'name' : 'task 11',
					'description' : '',
					'order' : 0,
					'cost' : 5,
					'dependencies' : [10,1,6],
					'assigned' : 'test@test.com',
					'progress' : 0,
					'state' : 'todo'
					}
				];
	
	//init forms
	$scope.initPopupAddMember();
	$scope.initPopupAddUs();
	
	// ===================== PERT SECTION ===================
	
	//$scope.items = [];
	
	$scope.selectPertUS = function(us){
		
		$scope.makeCurrentUsTaskArray(us);
		
		/*for(var i=0; i<$scope.current_us_tasks.length; ++i){
			$scope.items.push({ 
						id: $scope.current_us_tasks[i]['id'],  
						parents: $scope.current_us_tasks[i]['dependencies'], 
						title: $scope.current_us_tasks[i]['name'], 
						label: "Design", 
						et: $scope.current_us_tasks[i]['cost'], 
						lt: $scope.current_us_tasks[i]['cost'], 
						itemTitleColor: "#4b0082" });	
		}*/
		
		var t = new tree();
		for(var i=0; i<$scope.current_us_tasks.length; ++i){
			//alert('add ' + $scope.current_us_tasks[i]['name']);
			t.add($scope.current_us_tasks[i]);
		}
		
		t.makeItems();
		
		$scope.items = t.items;
		
		//alert(JSON.stringify($scope.items));
		
		init();	
	}
});


//the unique filter for Angular
app.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});
