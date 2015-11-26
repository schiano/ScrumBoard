'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GanttSchema = new Schema({
  timeUnit: {
	  type: Number, required: false
  },
  column: {
	  type: [{
		  _id: false,
		  columnName: String,
		  userTasks: [{
			  _id: false,
			  userId: String,
			  taskId: String
		  }]
	  }], required: true
  }
});

module.exports = mongoose.model('Gantt', GanttSchema);