'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var HashtagDefActionCreators = require('../actions/HashtagDefActionCreators.js');
var HashtagTweetsActionCreators = require('../actions/HashtagTweetsActionCreators.js');

var Constants = require('../constants/Constants.js');
var ActionTypes = Constants.ActionTypes;
var Parameters = Constants.Parameters;
var Numbers = Constants.Numbers;

module.exports = {
  search: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.HASHTAG_SEARCH,
      data: data
    });
    HashtagDefActionCreators.queryDef(data);
    HashtagTweetsActionCreators.query({
      hashtag: data.hashtag,
      resultType: Parameters.RESULT_TYPE_POPULAR,
      count: Numbers.DEFAULT_TWEETS_COUNT
    });
  }
};
