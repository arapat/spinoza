
'use strict'

var React = require('react');

var Navbar = require('../components/Navbar.js');

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <Navbar showSearchForm={false} showMultiSearch={false}/>
        <p>About page is not implemented yet.</p>
      </div>
    );
  }
});
