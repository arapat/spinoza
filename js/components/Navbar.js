'use strict'

var React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="navbar navbar-custom navbar-static-top">
        <div className="navbar-header">
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
            <span className="sr-only">Toggle</span>
            <span className="icon-bar"></span>
      			<span className="icon-bar"></span>
      			<span className="icon-bar"></span>
          </button>
          <a href="/" className="navbar-brand logo">Spinoza</a>
      	</div>
        <div className="collapse navbar-collapse" role="navigation">
          <form className="navbar-form navbar-left">
              <div className="input-group input-group-sm">
                <input type="text" className="form-control" placeholder="Search" name="srch-term" id="srch-term"/>
                <div className="input-group-btn">
                  <button className="btn btn-default" type="submit"><i className="glyphicon glyphicon-search"></i></button>
                </div>
              </div>
          </form>
          <ul className="nav navbar-nav">
            <li>
              <a href="#postModal" role="button" data-toggle="modal"><i className="glyphicon glyphicon-plus"></i> Combined another hashtag</a>
            </li>
          </ul>
      	</div>
      </div>
    );
  }
});
