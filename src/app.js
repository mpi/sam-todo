'use strict';

var model = require('./model');
var view = require('./view');
var actions = require('./actions');
var nap = require('./nap');

var sam = require('./sam');

var $ = require('jquery');

var initial = {
  items: [
    {name: 'Learn SAM'},
    {name: 'Implement To-Do List'},
    {name: 'Build The Framework'}
  ]
};

function init(){

  var app = sam(model, view, actions, nap);
  $('#app').append(
    $(app.start({init: initial}))
  );
}

$(document).ready(init);
