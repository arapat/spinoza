'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = require('../constants/Constants.js').ActionTypes;
var CHANGE_EVENT = 'change';

var _hashtags = undefined;
var _resultType = undefined;
var _count = undefined;
var _tweets = [];
var _minId = undefined;
var _maxId = undefined;

var TwoHashtagsTweetsStore = assign({}, EventEmitter.prototype, {
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
  },

  getHashtags: function () {
    return _hashtags;
  },

  getCount: function () {
    return _count;
  },

  getMinId: function () {
    return _minId;
  },

  getMaxId: function () {
    return _maxId;
  }
});

TwoHashtagsTweetsStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.QUERY_TWO_HASHTAGS_TWEETS:
      _tweets = [];
      _hashtags = action.data.hashtags;
      _count = action.data.count;
      _resultType = action.data.resultType;
      TwoHashtagsTweetsStore.emitChange();
      break;

    case ActionTypes.QUERY_TWO_HASHTAGS_TWEETS_SUCCESS:
      _tweets = _tweets.concat(action.data);
      var tweetsId = _tweets.map(function (tweet) {
        return tweet.id_str;
      });
      _minId = _minId == undefined ? Math.min(...tweetsId) : Math.min(...tweetsId, _minId);
      _maxId = _maxId == undefined ? Math.max(...tweetsId) : Math.max(...tweetsId, _maxId);
      TwoHashtagsTweetsStore.emitChange();
      break;

    case ActionTypes.CLEAR_TWO_HASHTAGS_TWEETS:
      _hashtags = undefined;
      _resultType = undefined;
      _count = undefined;
      _tweets = [];
      _minId = undefined;
      _maxId = undefined;
      TwoHashtagsTweetsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = TwoHashtagsTweetsStore;
