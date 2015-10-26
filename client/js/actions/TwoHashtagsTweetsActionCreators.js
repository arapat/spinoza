'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var Constants = require('../constants/Constants.js');
var ActionTypes = Constants.ActionTypes;

var apiURL = Constants.URLs.API_URL;

/*
Attributes of data may be hashtag, result_type, count and/or max_id.
Please read https://dev.twitter.com/rest/reference/get/search/tweets
for details.
*/

function search (data, onSuccess, onError) {
  var hashtags = data.hashtags.map(function (hashtag) {
    if (hashtag[0] == '#') {
      return hashtag.slice(1);
    }
    return hashtag;
  });

  var url = apiURL + "/tweets/multiple-hashtags";
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
    data: {
      "hashtags": hashtags.toString(),
      "result-type": data.resultType,
      "count": data.count,
      "max-id": data.maxId
    },
    success: onSuccess,
    error: onError
  });
}

module.exports = {
  query: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_TWO_HASHTAGS_TWEETS,
      data: data
    });
    search(data, this.querySuccess, this.queryFailed);
  },

  queryMore: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_MORE_TWO_HASHTAGS_TWEETS,
      data: data
    });
    search(data, this.querySuccess, this.queryFailed);
  },

  clear: function () {
    AppDispatcher.dispatch({
      type: ActionTypes.CLEAR_TWO_HASHTAGS_TWEETS
    });
  },

  querySuccess: function(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_TWO_HASHTAGS_TWEETS_SUCCESS,
      data: data
    });
  },

  queryFailed: function(xhr, error) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_TWO_HASHTAGS_TWEETS_FAILED,
      data: {
        xhr: xhr,
        error: error
      }
    });
  }
};
