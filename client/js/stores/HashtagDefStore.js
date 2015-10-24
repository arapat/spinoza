'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = require('../constants/Constants.js').ActionTypes;
var CHANGE_EVENT = 'change';

var _hashtag = undefined;
var _definition = undefined;
var _waitingQuery = false;

var HashtagDefStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  isWaiting: function() {
    return _waitingQuery;
  },

  getHashtag: function () {
    return _hashtag;
  },

  getDef: function () {
    return _definition;
  }
});

HashtagDefStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.QUERY_HASHTAG_DEF:
      _hashtag = action.data.hashtag;
      _waitingQuery = true;
      _definition = undefined;
      HashtagDefStore.emitChange();
      break;

    case ActionTypes.SUBMIT_HASHTAG_DEF:
      _hashtag = action.data.hashtag;
      _definition = action.data.def;
      _waitingQuery = false;
      HashtagDefStore.emitChange();
      break;

    case ActionTypes.QUERY_HASHTAG_SUCCESS:
      _definition = action.data.describe;
      _waitingQuery = false;
      HashtagDefStore.emitChange();
      break;

    case ActionTypes.QUERY_HASHTAG_FAILED:
      _waitingQuery = false;
      HashtagDefStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = HashtagDefStore;
