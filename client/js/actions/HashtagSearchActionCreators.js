'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher.js');

var HashtagDefActionCreators = require('../actions/HashtagDefActionCreators.js');

var ActionTypes = require('../constants/Constants.js').ActionTypes;

module.exports = {
  search: function (data) {
    AppDispatcher.dispatch({
      type: ActionTypes.HASHTAG_SEARCH,
      data: data
    });
    HashtagDefActionCreators.queryDef(data);
  }
};
