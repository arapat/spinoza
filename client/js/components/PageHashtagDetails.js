
'use strict'

var React = require('react');

var Navbar = require('../components/Navbar.js');
var MultipleSearch = require('../components/MultipleSearch.js');
var Definition = require('../components/Definition.js');
var Stats = require('../components/Stats.js');
var ClusterHashtag = require('../components/ClusterHashtag.js');
var HashtagTweets = require('../components/HashtagTweets.js');
var HashtagUsers = require('../components/HashtagUsers.js');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar showSearchForm={true} showMultiSearch={true}/>
        <MultipleSearch/>

        <div className="row">
          <div className="col-md-8">
            <Definition hashtag={this.props.data}/>
          </div>
          <div className="col-md-4">
            <Stats/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <ClusterHashtag/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <HashtagTweets/>
          </div>
          <div className="col-md-4">
            <HashtagUsers/>
          </div>
        </div>
      </div>
    );
  }
});
