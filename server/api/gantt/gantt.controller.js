'use strict';

var _ = require('lodash');
var gantt = require('./gantt.model');

exports.index = function(req, res) {
  gantt.find(function (err, gantts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(gantts);
  });
};

exports.show = function(req, res) {
  gantt.findById(req.params.id, function (err, gantt) {
    if(err) { return handleError(res, err); }
    if(!gantt) { return res.status(404).send('Not Found'); }
    return res.json(gantt);
  });
};

exports.create = function(req, res) {
  gantt.create(req.body, function(err, gantt) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(gantt);
  });
};

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  gantt.findById(req.params.id, function (err, gantt) {
    if (err) { return handleError(res, err); }
    if(!gantt) { return res.status(404).send('Not Found'); }
    var updated = _.merge(gantt, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(gantt);
    });
  });
};

exports.destroy = function(req, res) {
  gantt.findById(req.params.id, function (err, gantt) {
    if(err) { return handleError(res, err); }
    if(!gantt) { return res.status(404).send('Not Found'); }
    gantt.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}