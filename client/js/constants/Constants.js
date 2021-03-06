
module.exports = {
  'URLs': {
    'API_URL': 'http://jalafate.ucsd.edu:3000'
  },
  'ActionTypes': {
    HASHTAG_SEARCH: 'HASHTAG_SEARCH',

    QUERY_HASHTAG_DEF: 'QUERY_HASHTAG_DEF',
    SUBMIT_HASHTAG_DEF: 'SUBMIT_HASHTAG_DEF',
    QUERY_HASHTAG_SUCCESS: 'QUERY_HASHTAG_SUCCESS',
    QUERY_HASHTAG_FAILED: 'QUERY_HASHTAG_FAILED',
    SUBMIT_HASHTAG_SUCCESS: 'SUBMIT_HASHTAG_SUCCESS',
    SUBMIT_HASHTAG_FAILED: 'SUBMIT_HASHTAG_FAILED',

    QUERY_HASHTAG_TWEETS: 'QUERY_HASHTAG_TWEETS',
    QUERY_MORE_HASHTAG_TWEETS: 'QUERY_MORE_HASHTAG_TWEETS',
    QUERY_HASHTAG_TWEETS_SUCCESS: 'QUERY_HASHTAG_TWEETS_SUCCESS',
    QUERY_HASHTAG_TWEETS_FAILED: 'QUERY_HASHTAG_TWEETS_FAILED',

    QUERY_TWO_HASHTAGS_TWEETS: 'QUERY_TWO_HASHTAGS_TWEETS',
    QUERY_MORE_TWO_HASHTAGS_TWEETS: 'QUERY_MORE_TWO_HASHTAGS_TWEETS',
    QUERY_TWO_HASHTAGS_TWEETS_SUCCESS: 'QUERY_TWO_HASHTAGS_TWEETS_SUCCESS',
    QUERY_TWO_HASHTAGS_TWEETS_FAILED: 'QUERY_TWO_HASHTAGS_TWEETS_FAILED'
  },
  'RegExp': {
  },
  'ErrorTypes': {
    SUBMIT_HASHTAG_ERROR: 'SUBMIT_HASHTAG_ERROR',
    QUERY_HASHTAG_TWEETS_SUCCESS: 'QUERY_HASHTAG_TWEETS_SUCCESS',
    QUERY_HASHTAG_TWEETS_FAILED: 'QUERY_HASHTAG_TWEETS_FAILED'
  },
  'ErrorMessages': {
    SUBMIT_HASHTAG_ERROR: 'Server error: please try again later.'
  },
  'Parameters': {
    RESULT_TYPE_RECENT: "recent",
    RESULT_TYPE_POPULAR: "popular"
  },
  'Numbers': {
    'DEFAULT_TWEETS_COUNT': 20,
    'SMALL_TWEETS_COUNT': 10
  }
};
