'use strict';

var _ = require('lodash');
var Task = require('./task.model');

exports.index = function(req, res) {
  Task.find(function (err, tasks) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(tasks);
  });
};

exports.show = function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.status(404).send('Not Found'); }
    return res.json(task);
  });
};

exports.create = function(req, res) {
  Task.create(req.body, function(err, task) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(task);
  });
};

exports.update = function(req, res) {
  if(req.body._id) {
	  delete req.body.id;
  }
  var p = new Task(req.body);
  Task.findOneAndUpdate(req.params.id, p, {upsert: true}, function(err, doc){
	  p._id = doc._id;
	  if(err){
		  return handleError(res, err);
	  }
	  return res.status(200).json(p);
  });
};

exports.destroy = function(req, res) {
  Task.findById(req.params.id, function (err, task) {
    if(err) { return handleError(res, err); }
    if(!task) { return res.status(404).send('Not Found'); }
    task.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}