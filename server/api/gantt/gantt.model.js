'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GanttSchema = new Schema({
  developerColors: {
	  type:[{
		 _id: false,
		 developerId: String,
		 colorHex: String 
	  }]  
  },
  entries: {
	  type: [{
		  _id: false,
		  taskId: String,
		  startDate: Date,
		  endDate: Date,
		  developerId: String
	  }], required: true
  }
});

module.exports = mongoose.model('Gantt', GanttSchema);