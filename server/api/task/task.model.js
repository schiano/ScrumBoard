'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
	  type: String, required: true
	  },
  description: {
	  type: String, required: true
	  },
  order: {
	  type: Number, required: true
	  },
  cost: {
	  type: Number, required: true
  	  },
  dependencies: {
	  type: [String], required: false
	  },
  assigned: {
	  type: [String], required: false
	  },
  progress: {
	  type: Number, required: true
  }, 
  status: {
	  type: Number, required: true
  },
  validationDate: Date
});

module.exports = mongoose.model('Task', TaskSchema);