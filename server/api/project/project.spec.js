'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var User = require('../user/user.model');
var Project = require('./project.model');

var user1 = new User({
	provider: "local",
	name: "user1",
	email: "test@test.com",
	password: "password"
});

var testProject1 = new Project({
	name: "TestProjectName1",
	description: "TestProjectName1",
	owner:{
		userId: "user1",
		name: "User1"
	},
	members: [
		{
			userId: "user1",
			name: "User1",
			canEdit: true
		}
	],
	isPublic: true
});

describe('GET /api/projects', function() {
	before(function(done) {
		Project.remove().exec().then(function() {
			done();
		});
		user1.save();
	});
	
	afterEach(function(done) {
		Project.remove().exec().then(function() {
			done();
		});
	});
	
	it('should respond with JSON array', function(done) {
		request(app)
		.get('/api/projects')
		.expect(200)
		.expect('Content-Type', /json/)
		.end(function(err, res) {
			if (err) return done(err);
			res.body.should.be.instanceof(Array);
			done();
		});
	});
});
