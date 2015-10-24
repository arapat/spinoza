'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = require('../constants/Constants.js').ActionTypes;
var CHANGE_EVENT = 'change';

var _resultType = undefined;
var _tweets = [];

var HashtagTweetsStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getTweets: function () {
    return _tweets;
  },

  getResultType: function () {
    return _resultType;
  }
});

HashtagTweetsStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.QUERY_HASHTAG_TWEETS:
      _tweets = [];
      _resultType = action.data.resultType;
      HashtagTweetsStore.emitChange();
      break;

    case ActionTypes.QUERY_HASHTAG_TWEETS_SUCCESS:
      _tweets = _tweets.concat(action.data);
      HashtagTweetsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = HashtagTweetsStore;
