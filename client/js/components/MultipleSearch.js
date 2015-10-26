
'use strict'

var React = require('react');

var HashtagTweetsStore = require('../stores/HashtagTweetsStore.js');
var TwoHashtagsTweetsActionCreators = require('../actions/TwoHashtagsTweetsActionCreators.js');

var Constants = require('../constants/Constants.js');
var Parameters = Constants.Parameters;
var Numbers = Constants.Numbers;

var TwoHashtagsTweets = require('./TwoHashtagsTweets.js');

function getHashtagState() {
  return {
    "first_hashtag": HashtagTweetsStore.getHashtag()
  };
}

function clear() {
  TwoHashtagsTweetsActionCreators.clear();
  $('input[name="second-hashtag"]').val('')
}

module.exports = React.createClass({
  search: function () {
    var second_hashtag = $('input[name="second-hashtag"]').val().toLowerCase();
    var hashtags = [this.state.first_hashtag, second_hashtag];
    TwoHashtagsTweetsActionCreators.query({
      "hashtags": hashtags,
      "resultType": Parameters.RESULT_TYPE_RECENT,
      "count": Numbers.SMALL_TWEETS_COUNT
    });
  },

  onKeyUp: function (event) {
    if (event.keyCode == 13) {
      this.search();
    }
  },

  getInitialState: function () {
    return getHashtagState();
  },

  componentDidMount: function() {
    HashtagTweetsStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    HashtagTweetsStore.removeChangeListener(this._onChange);
  },

  createOnClickFunc: function (resultType) {
    return function () {
      HashtagTweetsActionCreators.query({
        hashtag: this.state.hashtag,
        count: this.state.count,
        resultType: resultType
      });
    }.bind(this);
  },

  render: function () {
    return (
      <div className="modal fade" id="multisearch" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={clear} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Search tweets contain two hashtags</h4>
            </div>
            <div className="modal-body">
              <div className="two-hashtag-srch input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search"
                  name="second-hashtag" onKeyUp={this.onKeyUp}/>
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit" onClick={this.search}>
                    <i className="glyphicon glyphicon-search"></i>
                  </button>
                </div>
              </div>
              <TwoHashtagsTweets/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={clear}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getHashtagState());
  }
});
