  'use strict';

var _ = require('lodash');
var h = require('virtual-dom/h');

var ul = alias('ul.list-group');
var li = alias('li.list-group-item');
var div = alias('div');
var span = alias('span');
var input = alias('input.form-control');
var button = alias('button.btn.btn-primary');
var submit = alias('div.btn.btn-primary');

function removeBtn(onremove){
  return h('span.glyphicon.glyphicon-remove.pull-right', {onclick: onremove, style: {margin: '0 0.5em'}});
}

function icon(icon){
  return h('span.glyphicon.glyphicon-' + icon, {style: {margin: '0 0.5em'}});
}
var theme = {

  todoList: function(){
    return ul(_.toArray(arguments));
  },

  todoListHeader: function(header){
    return li({className: 'active'}, [icon('list'), header]);
  },

  todoListFooter: function(onsubmit){
    return li({className: 'disabled'}, h('div.input-group', [
      input({type: 'text', placeholder: 'Eg. Walk the dog', attributes: {'data-new-todo-item': true}}),
      h('span.input-group-btn', submit({type: 'submit', onclick: onsubmit}, [icon('plus'), 'Add']))
    ]));
  },

  todoListItem: function(done, name, index, toggle, remove){
    return li({className: done ? 'done': ''},
      [
        span({onclick: toggle(index)}, name),
        removeBtn(remove(index))
      ]
    );
  }

};

function alias(name){
  return _.partial(h, name);
}

module.exports = theme;
