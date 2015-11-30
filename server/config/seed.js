/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');
var Backlog = require('../api/backlog/backlog.model');
var Gantt = require('../api/gantt/gantt.model');
var Task = require('../api/task/task.model');

User.find({}).remove(function() {
  Project.find({}).remove(function(){
	  Backlog.find({}).remove(function(){
		  Gantt.find({}).remove(function(){
			  Task.find({}).remove(function(){
					User.create({
							provider: 'local',
							name: 'Test User',
							email: 'test@test.com',
							password: 'test'
						}, {
							provider: 'local',
							role: 'admin',
							name: 'Admin',
							email: 'admin@admin.com',
							password: 'admin'
						}, function(err, user1, user2) {
							if(err){
								console.log('error while populating users');
								return;
							}
							console.log('finished populating users');
							// Populating Projects
							Project.create({
								name: "Test Project #1",
								description: "This is the first test project, owned by Admin.",
								members: [
								{
									userId: user2._id,
									name: "Admin",
									canEdit: true
								},
								{
									userId: user1._id,
										name: "Test User",
											canEdit: true
								}
								],
								owner: {
									userId: user2._id,
										name: "Test User"
								},
								isPublic: true,
							}, function(err, project){
							if(err){
								console.log('error while populating projects');
								return;
							}
							console.log('finished populating projects');						
						});
					});
				  
			  });
		  });
	  });
    });
});