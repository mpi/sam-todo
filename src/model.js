'use strict';

var _ = require('lodash');

var model = {};

var commands = {

  actionStarted: function(model, data){

    _.remove(model.queue, _.head(model.queue));
    return model;
  },

  addItem: function(model, data){

    model.queue = model.queue || [];
    model.queue.push({
      action: 'syncAddItem',
      data: data
    });
    return model;
  },

  toggle: function(model, data){
    model.queue = model.queue || [];
    model.queue.push({
      action: 'syncToggleItem',
      data: data
    });
    return model;
  },

  remove: function(model, data){
    model.queue = model.queue || [];
    model.queue.push({
      action: 'syncRemoveItem',
      data: data
    });
    return model;
  },

  listFetched: function(model, data){
    model.items = data.items;
    return model;
  },

  itemAdded: function(model, data){

    model.items.push(data);
    return model;
  },

  itemToggled: function(model, data){
    var item = model.items[data.id];
    item.done = !item.done;
    return model;
  },

  itemRemoved: function(model, data){
    model.items.splice(data.id, 1);
    return model;
  },

  init: function(model, data){
    model.queue = model.queue || [];
    model.queue.push({
      action: 'syncFetchItems'
    });
    return model;
  }
};

function present(data, render){

  _.each(data, function(data, action){
    var command = commands[action];
    model = command(model, data);
  });

  render(model);
};

module.exports = present;
