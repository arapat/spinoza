
'use strict'

var React = require('react');

var Navbar = require('../components/Navbar.js');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar showSearchForm={true} showMultiSearch={false}/>
        <p> Hashtag cloud is not implemented yet. </p>
      </div>
    );
  }
});
