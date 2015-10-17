'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Navigator
} = React;
var routes = {
  Home: require('./components/Home.js'),
  Beer: require('./components/Beer.js')
}


var routeMapper = (route, navigator) => {
  return React.createElement(routes[route.name], { navigator: navigator });
};


var MainNav = React.createClass({
  render: function() {
    return <Navigator
      initialRoute={{name: 'Home', index: 0}}
      renderScene={routeMapper}
    />;
  }
});

module.exports = MainNav;
