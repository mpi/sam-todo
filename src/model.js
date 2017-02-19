'use strict';

var _ = require('lodash');

var model = {};

function enqueue(model, actions){
  var isArray = _.isArray(actions);
  model.queue = model.queue || [];
  _.each(actions, function(value, key){
    model.queue.push({
      action: isArray ? value : key,
      data: value
    });
  });
}

function dequeue(model){
  _.remove(model.queue, _.head(model.queue));
}

var commands = {

  actionStarted: function(model, data){
    dequeue(model);
  },

  addItem: function(model, data){
    enqueue(model, {syncAddItem: data});
  },

  toggle: function(model, data){
    enqueue(model, {syncToggleItem: data});
  },

  remove: function(model, data){
    enqueue(model, {syncRemoveItem: data});
  },

  listFetched: function(model, data){
    model.items = data.items;
  },

  itemAdded: function(model, data){
    model.items.push(data);
  },

  itemToggled: function(model, data){
    var item = model.items[data.id];
    item.done = !item.done;
  },

  itemRemoved: function(model, data){
    model.items.splice(data.id, 1);
  },

  init: function(model, data){
    enqueue(model, ['syncFetchItems']);
  }
};

function present(data, render){

  _.each(data, function(data, action){
    var command = commands[action];
    model = command(model, data) || model;
  });

  render(model);
};

module.exports = present;
