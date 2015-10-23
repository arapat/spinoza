'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var ActionTypes = require('../constants/Constants.js').ActionTypes;

function search (hashtag, onSuccess, onError) {
  if (hashtag[0] == '#') {
    hashtag = hashtag.slice(1);
  }
  $.ajax({
    url: "hashtag/def/q/" + hashtag,
    dataType: "json",
    type: 'GET',
    success: onSuccess,
    error: onError
  });
}

function submit (hashtag, definition, onSuccess, onError) {
  $.ajax({
    url: "hashtag/def/a/",
    dataType: "json",
    type: 'POST',
    data: {
      'hashtag': hashtag,
      'definition': definition
    },
    success: onSuccess,
    error: onError
  });
}

module.exports = {

  queryDef: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_DEF,
      data: data
    });
    search(data.hashtag, this.querySuccess, this.queryFailed);
  },

  submitDef: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_HASHTAG_DEF,
      data: data
    });
    submit(data.hashtag, data.def, this.submitSuccess, this.submitFailed);
  },

  querySuccess: function(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_SUCCESS,
      data: data
    });
  },

  queryFailed: function(xhr, error) {
    AppDispatcher.dispatch({
      type: ActionTypes.QUERY_HASHTAG_FAILED,
      data: {
        xhr: xhr,
        error: error
      }
    });
  },

  submitSuccess: function(data) {
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_HASHTAG_SUCCESS,
      data: data
    });
  },

  submitFailed: function(xhr, error) {
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_HASHTAG_FAILED,
      data: {
        xhr: xhr,
        error: error
      }
    });
  }
};
