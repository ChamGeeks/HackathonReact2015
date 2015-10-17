/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {AppRegistry} = React;
var MainNav = require('./MainNav');

var HackathonReact2015 = React.createClass({
  render: function() {
    return <MainNav />;
  }
});




AppRegistry.registerComponent('HackathonReact2015', () => HackathonReact2015);
