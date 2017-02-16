'use strict';

var $ = require('jquery');

function actions(present){
  return  {
    addItem: function(item){
      present({addItem: item});
    },
    toggle: function(data){
      present({toggle: data});
    },
    remove: function(data){
      present({remove: data});
    },
    syncAddItem: function(data){
      $.ajax({
        method: 'POST',
        url: '/api/todo-list',
        contentType: 'application/json',
        data: JSON.stringify(data)
      }).done(function(){
        present({itemAdded: data});
      });
      present({actionStarted: {action: 'syncAddItem'}});
    },
    syncToggleItem: function(data){
      $.ajax({
        method: 'POST',
        url: '/api/todo-list/' + data.id + '/toggle'
      }).done(function(){
        present({itemToggled: data});
      });
      present({actionStarted: {action: 'syncToggleItem'}});
    },
    syncRemoveItem: function(data){
      $.ajax({
        method: 'DELETE',
        url: '/api/todo-list/' + data.id
      }).done(function(){
        present({itemRemoved: data});
      });
      present({actionStarted: {action: 'syncRemoveItem'}});
    },
    syncFetchItems: function(data){
      $.ajax({
        method: 'GET',
        url: '/api/todo-list',
      }).done(function(data){

        console.log('fetched data', data);

        present({listFetched: {items: data.list}});
      });
      present({actionStarted: {action: 'syncFetchItems'}});
    }

  };
};

module.exports = actions;
