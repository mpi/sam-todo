'use strict';

var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');

var _ = require('lodash');

function sam(model, view, actions, nap){

  return {
    start: start
  };

  function start(initial){

    var present = _.partial(model, _, render);
    var actions_ = actions(present);
    var view_ = _.partial(view, _, actions_);
    var next = _.partial(nap, _, actions_);

    var vdom = view({});
    var rootNode = createElement(vdom);
    present(initial);

    return rootNode;

    function render(model){

      var tree = view_(model);
      var patches = diff(vdom, tree);
      patch(rootNode, patches);
      vdom = tree;

      next(model);
    }
  }
}

module.exports = sam;
