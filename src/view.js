'use strict';

var _ = require('lodash');
var $ = require('jquery');
var h = require('virtual-dom/h');

var theme = require('./theme');

var ul = alias('ul');
var li = alias('li');
var div = alias('div');
var span = alias('span');
var input = alias('input');
var submit = alias('input.btn.btn-primary[type=submit]');


function render(model, actions){

  model = _.defaults({}, model, {items: []});

  return theme.todoList(
    theme.todoListHeader('Todo List'),
    _.map(model.items, todoItem),
    theme.todoListFooter(addItem)
  );

  function todoItem(item, index){

    return theme.todoListItem(item.done, item.name, index, toggle, remove);
  }

  function remove(index){
      return function(ev){
        actions.remove({id: index});
        ev.preventDefault();
        return false;
      }

  }

  function toggle(index){
      return function(){
        actions.toggle({id: index});
        return false;
      }
  }

  function addItem(ev){
    var newItem = $('[data-new-todo-item]').val();
    actions.addItem({name: newItem});
  }
};

function alias(name){
  return _.partial(h, name);
}

module.exports = render;
