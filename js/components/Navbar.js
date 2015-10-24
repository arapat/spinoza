'use strict'

var React = require('react');

module.exports = React.createClass({
  onClick: function () {
    var hashtag = $('input[name="srch-hashtag"]').val().toLowerCase();
    if (hashtag[0] == '#') {
      hashtag = hashtag.slice(1);
    }
    var url = location.href;
    location.href = "#hashtag=" + hashtag;
  },

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
          <a href="#" className="navbar-brand logo">Spinoza</a>
      	</div>
        <div className="collapse navbar-collapse" role="navigation">
          {this.props.showSearchForm && (
            <div className="navbar-form navbar-left">
                <div className="input-group input-group-sm">
                  <input type="text" className="form-control" placeholder="Search" name="srch-hashtag" id="srch-hashtag"/>
                  <div className="input-group-btn">
                    <button className="btn btn-default" type="submit" onClick={this.onClick}>
                      <i className="glyphicon glyphicon-search"></i>
                    </button>
                  </div>
                </div>
            </div>
          )}
          {this.props.showMultiSearch && (
            <ul className="nav navbar-nav">
              <li>
                <a href="#multisearch" role="button" data-toggle="modal">
                  <i className="glyphicon glyphicon-plus"></i> Combined another hashtag
                </a>
              </li>
            </ul>
          )}
          <ul className="nav navbar-nav pull-right">
            <li>
              <a href="#about" role="button">About</a>
            </li>
          </ul>
      	</div>
      </div>
    );
  }
});
