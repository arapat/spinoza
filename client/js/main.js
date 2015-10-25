'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var HashtagSearchActionCreators = require('./actions/HashtagSearchActionCreators.js');

var PageHashtagCloud = require('./components/PageHashtagCloud.js');
var PageHashtagDetails = require('./components/PageHashtagDetails.js');
var PageAbout = require('./components/PageAbout.js');

var router = {
  "": PageHashtagCloud,
  "hashtag": PageHashtagDetails,
  "about": PageAbout
};
var pageDefault = PageHashtagCloud;

var url = [];

function parseURL () {
  var hash = window.location.hash.slice(1);
  var vars = hash.split("=", 2);
  url[0] = vars[0] == undefined ? "" : decodeURIComponent(vars[0]);
  url[1] = vars[1] == undefined ? "" : decodeURIComponent(vars[1]);
  if (url[1][0] == '#') {
    url[1][0] = url[1][0].slice(1);
  }
}

function triggerActions() {
  switch (url[0]) {
    case 'hashtag':
      HashtagSearchActionCreators.search({
        hashtag: url[1]
      });
      break;

    default:
      // do nothing
  }
}

var App = React.createClass({
    render: function () {
      var Page = router[url[0]];
      if (Page == undefined) {
        Page = pageDefault;
      }
      return <Page/>;
    }
});

function render() {
  parseURL();
  triggerActions();
  ReactDOM.render(<App/>, document.getElementById('spinoza'))
}
render();
window.onhashchange = render;
