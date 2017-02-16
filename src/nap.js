'use strict';

var _ = require('lodash');

function nap(model, actions){

  var action = _.head(model.queue);
  if(action){
    actions[action.action](action.data);
  }

}

module.exports = nap;
