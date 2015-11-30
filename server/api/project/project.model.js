'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
	  type: String, required: true
	  },
  description: {
	  type: String, required: true
	  },
  owner: {
	  userId: {
		  type: String, required: true
		  },
	  name: {
		  type: String, required: true
		  }
  },
  members: {
	  type: [{
		  _id:false,
		  userId: {type: String, required: true}, 
		  name: {type: String, required: true}, 
		  canEdit: {type: Boolean, required: true}
		  }], required: true},
  isPublic: {
	  type: Boolean, required: true
	  },
  backlog: {
	  type: [String]
  },
  sprints: {
	  type: [
		  {
			_id:false,
		  	sprintNumber: Number,
		  	ganttId: String,
		  	tasks: [String]
		  }
	  ]
  },
  progress: {
	  type: Number
  },
  style: {
	  type: String
  }
});

module.exports = mongoose.model('Project', ProjectSchema);