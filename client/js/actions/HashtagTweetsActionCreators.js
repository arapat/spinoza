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
  var hashtag = data.hashtag;
  var resultType = data.resultType;
  var count = data.count;
  var maxId = data.maxId;
  if (hashtag[0] == '#') {
    hashtag = hashtag.slice(1);
  }

  var url = apiURL + "/tweets/hashtag/" + hashtag + "/" + resultType + "/" + count;
  if (maxId) {
    url = url + "/" + maxId;
  }
  $.ajax({
    url: url,
    dataType: "json",
    type: 'GET',
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
