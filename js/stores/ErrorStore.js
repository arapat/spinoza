'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = require('../constants/Constants.js').ActionTypes;
var CHANGE_EVENT = 'change';

var _errors = [];

function _createErrorTypeFilter(errorType) {
  return function (obj) {
    return obj.type == errorType;
  };
}

var ErrorStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getErrors: function (errorType) {
    var result = _errors.filter(_createErrorTypeFilter(errorType));
    _errors = _errors.filter(function (error) {
      return result.indexOf(error) < 0;
    });
    return result;
  }
});

ErrorStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_HASHTAG_FAILED:
      action.error.id = _errors.length + 1;
      _errors.push(action.error);
      ErrorStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = ErrorStore;
