'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = require('../constants/Constants.js').ActionTypes;
var CHANGE_EVENT = 'change';

var _hashtag = undefined;
var _resultType = undefined;
var _count = undefined;
var _tweets = [];
var _minId = undefined;
var _maxId = undefined;

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
  },

  getHashtag: function () {
    return _hashtag;
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

HashtagTweetsStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.QUERY_HASHTAG_TWEETS:
      _tweets = [];
      _hashtag = action.data.hashtag;
      _count = action.data.count;
      _resultType = action.data.resultType;
      HashtagTweetsStore.emitChange();
      break;

    case ActionTypes.QUERY_HASHTAG_TWEETS_SUCCESS:
      _tweets = _tweets.concat(action.data);
      console.log(action.data);
      var tweetsId = _tweets.map(function (tweet) {
        return tweet.id_str;
      });
      _minId = _minId == undefined ? Math.min(...tweetsId) : Math.min(...tweetsId, _minId);
      _maxId = _maxId == undefined ? Math.max(...tweetsId) : Math.max(...tweetsId, _maxId);
      HashtagTweetsStore.emitChange();
      break;

    default:
      // do nothing
  }
});

module.exports = HashtagTweetsStore;
