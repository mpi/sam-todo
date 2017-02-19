'use strict';

var http = require('./http');


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

      http.post('/api/todo-list',data)
        .done(function(){ present({itemAdded: data}); });
      present({actionStarted: {action: 'syncAddItem'}});

    },
    syncToggleItem: function(data){

      http.post('/api/todo-list/' + data.id + '/toggle')
        .done(function(){ present({itemToggled: data}); });
      present({actionStarted: {action: 'syncToggleItem'}});

    },
    syncRemoveItem: function(data){
      http.delete('/api/todo-list/' + data.id)
        .done(function(){ present({itemRemoved: data}); });
      present({actionStarted: {action: 'syncRemoveItem'}});
    },
    syncFetchItems: function(data){
      $.get('/api/todo-list')
        .done(function(data){
          console.log('fetched data', data);
          present({listFetched: {items: data.list}});
        });
      present({actionStarted: {action: 'syncFetchItems'}});
    }

  };
};

module.exports = actions;
