'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BacklogSchema = new Schema({
  name: {
	  type: String, required: true
	  },
  description: {
	  type: String, required: true
	  },
  order: {
	  type: Number, required: true
	  },
  priority: {
	  type: Number, required: true
  	  },
  difficulty: {
	  type: Number, required: true
  	  },
  dependencies: {
	  type: [String], required: false},
  sprintId: {type: String, required: false},
  tasks: {
	  type: [String], required: false},
});

module.exports = mongoose.model('Backlog', BacklogSchema);