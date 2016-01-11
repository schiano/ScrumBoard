'use strict';

var _ = require('lodash');
var Backlog = require('./backlog.model');

exports.index = function(req, res) {
  Backlog.find(function (err, backlogs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(backlogs);
  });
};

exports.show = function(req, res) {
  Backlog.findById(req.params.id, function (err, backlog) {
    if(err) { return handleError(res, err); }
    if(!backlog) { return res.status(404).send('Not Found'); }
    return res.json(backlog);
  });
};

exports.create = function(req, res) {
  Backlog.create(req.body, function(err, backlog) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(backlog);
  });
};

exports.update = function(req, res) {
  if(req.body._id) {
	  delete req.body.id;
  }
  var p = new Backlog(req.body);
  Backlog.findOneAndUpdate(req.params.id, p, {upsert: true}, function(err, doc){
	  p._id = doc._id;
	  if(err){
		  return handleError(res, err);
	  }
	  return res.status(200).json(p);
  });
};

exports.destroy = function(req, res) {
  Backlog.findById(req.params.id, function (err, backlog) {
    if(err) { return handleError(res, err); }
    if(!backlog) { return res.status(404).send('Not Found'); }
    backlog.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}