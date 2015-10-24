'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var ActionTypes = require('../constants/Constants.js').ActionTypes;

/*
Attributes of data may be hashtag, result_type, count and/or max_id.
Please read https://dev.twitter.com/rest/reference/get/search/tweets
for details.
*/
function search (data, onSuccess, onError) {
  $.ajax({
    url: "hashtag/tweets/q/" + data.hashtag,
    dataType: "json",
    type: 'GET',
    data: {
      result_type: data.resultType,
      count: data.count,
      max_id: data.max_id
    },
    success: onSuccess,
    error: onError
  });
}

module.exports = {
  query: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_TWEETS,
      data: data
    });
    search(data, this.querySuccess, this.queryFailed);
  },

  queryMore: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_MORE_HASHTAG_TWEETS,
      data: data
    });
    search(data, this.querySuccess, this.queryFailed);
  },

  querySuccess: function(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_TWEETS_SUCCESS,
      data: data
    });
  },

  queryFailed: function(xhr, error) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_TWEETS_FAILED,
      data: {
        xhr: xhr,
        error: error
      }
    });
  }
};
