
'use strict'

/*
TODO:
* display error messages
* display ** more ** tweets (another ajax request at the end of the feed)
*/

var React = require('react');

var TwoHashtagsTweetsActionCreators = require('../actions/TwoHashtagsTweetsActionCreators.js');
var TwoHashtagsTweetsStore = require('../stores/TwoHashtagsTweetsStore.js');
var ErrorStore = require('../stores/ErrorStore.js');

var Parameters = require('../constants/Constants.js').Parameters;

function getTweetsState() {
  return {
    hashtags: TwoHashtagsTweetsStore.getHashtags(),
    count: TwoHashtagsTweetsStore.getCount(),
    resultType: TwoHashtagsTweetsStore.getResultType(),
    tweets: TwoHashtagsTweetsStore.getTweets()
  };
}

function textUnescape(encoded) {
  var elem = document.createElement('textarea');
  elem.innerHTML = encoded;
  return elem.value;
}

function formatTweet(tweet) {
  /*
    Format tweet to display following attributes:
      created_at, text, user.name, user.screen_name,
      retweet_count, favorite_count
  */
  var twitterURL = "https://twitter.com/"
  var userURL = twitterURL + tweet.user.screen_name;
  var tweetURL = twitterURL + tweet.user.screen_name + "/status/" + tweet.id;

  var date = new Date(tweet.created_at);
  var datetime = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  var Retweet = tweet.retweet_count == 0 ? "" : (
      <span className="retweeted-info">
        <i className="glyphicon glyphicon-retweet"></i>
        <span className="retweeted-count">{tweet.retweet_count}</span>
      </span>
  );
  var Favorite = tweet.favorite_count == 0 ? "" : (
      <span className="favorited-info">
        <i className="glyphicon glyphicon-star"></i>
        <span className="favorited-count">{tweet.favorite_count}</span>
      </span>
  );
  var text = textUnescape(tweet.text);

  return (
    <div className="tweet-item-content">
      <div className="tweet-item-header">
        <a className="tweet-user-link" href={userURL}>
          <strong className="tweet-fullname">{tweet.user.name}</strong>
          <span className="tweet-username">
            <b>@{tweet.user.screen_name}</b>
          </span>
        </a>
        <small className="tweet-time">
          <a href={tweetURL} className="tweet-timestamp" data-original-title={tweet.created_at}>
            {datetime}
          </a>
        </small>
      </div>

      <p className="tweet-item-text">{text}</p>

      <div className="tweet-item-footer">
        {Retweet}
        {Favorite}
      </div>
    </div>
  );
}

module.exports = React.createClass({
  getInitialState: function () {
    return getTweetsState();
  },

  componentDidMount: function() {
    TwoHashtagsTweetsStore.addChangeListener(this._onChange);
    ErrorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TwoHashtagsTweetsStore.removeChangeListener(this._onChange);
    ErrorStore.removeChangeListener(this._onChange);
  },

  createOnClickFunc: function (resultType) {
    return function () {
      TwoHashtagsTweetsActionCreators.query({
        hashtags: this.state.hashtags,
        count: this.state.count,
        resultType: resultType
      });
    }.bind(this);
  },

  render: function () {
    if (this.state.hashtags == undefined) {
      return (<p>Please type another hashtag of interest.</p>);
    }

    var popularBtn = this.state.resultType == Parameters.RESULT_TYPE_POPULAR ?
      "btn-primary" : "btn-default";
    var popularBtnFunc = this.state.resultType == Parameters.RESULT_TYPE_POPULAR ?
      undefined : this.createOnClickFunc(Parameters.RESULT_TYPE_POPULAR);
    var recentBtn = this.state.resultType == Parameters.RESULT_TYPE_RECENT ?
      "btn-primary" : "btn-default";
    var recentBtnFunc = this.state.resultType == Parameters.RESULT_TYPE_RECENT ?
      undefined : this.createOnClickFunc(Parameters.RESULT_TYPE_RECENT);
    var Tweets = this.state.tweets.map(function (tweet) {
      return (
        <li key={tweet.id} className="list-group-item tweet">
          {formatTweet(tweet)}
        </li>
      );
    });
    return (
      <div className="panel panel-primary tweets">
        <div className="panel-heading">Tweets</div>
        <div className="panel-body">
          <span>Sort by: </span>
          <div className="btn-group" role="group">
            <button type="button" className={"btn " + popularBtn} onClick={popularBtnFunc}>
              Popular
            </button>
            <button type="button" className={"btn " + recentBtn} onClick={recentBtnFunc}>
              Recent
            </button>
          </div>
        </div>

        <ul className="list-group">
          {Tweets}
        </ul>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getTweetsState());
  }
});
