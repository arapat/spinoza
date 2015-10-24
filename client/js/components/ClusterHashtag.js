
'use strict'

var React = require('react');
var NeighborHashtags = require('./NeighborHashtags.js');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Related Clusters</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-md-6">
              <p>Not available yet.</p>
            </div>
            <div className="col-md-6">
              <NeighborHashtags/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
