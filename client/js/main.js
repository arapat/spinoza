'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var PageHashtagCloud = require('./components/PageHashtagCloud.js');
var PageHashtagDetails = require('./components/PageHashtagDetails.js');
var PageAbout = require('./components/PageAbout.js');

var router = {
  "": PageHashtagCloud,
  "hashtag": PageHashtagDetails,
  "about": PageAbout
};

function parseURL () {
  var hash = window.location.hash.slice(1);
  var vars = hash.split("=", 2);
  var page = vars[0] == undefined ? "" : decodeURIComponent(vars[0]);
  var data = vars[1] == undefined ? "" : decodeURIComponent(vars[1]);
  if (data[0] == '#') {
    data = data.slice(1);
  }
  return [page, data];
}

var App = React.createClass({
    render: function () {
      var vars = parseURL();
      var Page = router[vars[0]];
      return <Page data={vars[1]}/>;
    }
});

function render() {
  ReactDOM.render(<App/>, document.getElementById('spinoza'))
}
window.onhashchange = render;
render();
