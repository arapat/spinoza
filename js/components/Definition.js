
'use strict'

var React = require('react');

var HashtagDefActionCreators = require('../actions/HashtagDefActionCreators.js');
var HashtagDefStore = require('../stores/HashtagDefStore.js');
var ErrorStore = require('../stores/ErrorStore.js');

function getHashtagState() {
  return {
    waitingQuery: HashtagDefStore.isWaiting(),
    hashtag: HashtagDefStore.getHashtag(),
    def: HashtagDefStore.getDef()
  };
}

function submitHashtagDef() {
  var hashtag = $('input[name="hashtag"]').val().toLowerCase();
  var def = $('input[name="def"]').val();
  HashtagDefActionCreators.submitDef({
    hashtag: hashtag,
    def: def
  });
}

var ExistentHashtag = React.createClass({
  render: function () {
    return (
      <div className="tag-defination">
        <p>
          {this.props.def}
        </p>
      </div>
    );
  }
});

var UndefinedHashtag = React.createClass({
  onKeyUp: function (event) {
    if (event.keyCode == 13) {
      submitHashtagDef();
    }
  },

  render: function () {
    return (
      <div className="tag-defination">
        <div className="alert alert-warning" role="alert">
          <p>This hashtag is not defined yet.</p>
          <p>Please help us to describe {this.props.hashtag}.</p>
        </div>
        <div className="input-group">
          <input type="hidden" name="hashtag" value={this.props.hashtag}/>
          <input type="text" name="def" className="form-control"
                 placeholder={"Describe #" + this.props.hashtag}
                 onKeyUp={this.onKeyUp}/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="button"
                    onClick={submitHashtagDef}>
              Submit
            </button>
          </span>
        </div>
      </div>
    );
  }
});

var TagDescribe = React.createClass({
  render: function () {
    var Content = <p>Loading...</p>;
    if (!this.props.waitingQuery) {
      Content = this.props.def ? (<ExistentQuery def={this.props.def}/>)
                      : (<UndefinedHashtag hashtag={this.props.hashtag}/>);
    }
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Definition</h3>
        </div>
        <div className="panel-body">
          {Content}
        </div>
      </div>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function () {
    return getHashtagState();
  },

  componentDidMount: function() {
    HashtagDefStore.addChangeListener(this._onChange);
    ErrorStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    HashtagDefStore.removeChangeListener(this._onChange);
    ErrorStore.removeChangeListener(this._onChange);
  },

  render: function () {
    return (
      <div className="hashtag-defination">
        <TagDescribe {...this.state}/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getHashtagState());
  }
});
