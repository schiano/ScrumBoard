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
	  type: [Number], required: true},
  sprintId: {type: String, required: true},
  tasks: {
	  type: [Number], required: true},
});

module.exports = mongoose.model('Backlog', BacklogSchema);