'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  owner: {
	  userId: {type: String, required: true},
	  name: {type: String, required: true}
  },
  members: {type: [{_id:false, userId: {type: String, required: true}, name: {type: String, required: true}, canEdit: {type: Boolean, required: true}}], required: true},
  isPublic: {type: Boolean, required: true}
});

module.exports = mongoose.model('Project', ProjectSchema);