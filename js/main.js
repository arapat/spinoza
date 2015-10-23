'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var Navbar = require('./components/Navbar.js');
var Definition = require('./components/Definition.js');
var Stats = require('./components/Stats.js');
var ClusterHashtag = require('./components/ClusterHashtag.js');

var App = React.createClass({
    render: function () {
      return (
        <div>
          <Navbar/>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <Definition/>
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
          </div>
        </div>
      );
    }
});

ReactDOM.render(<App/>, document.getElementById('spinoza'))
