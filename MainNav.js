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

console.log(Navigator.SceneConfigs);

var routeMapper = (route, navigator) => {
  return React.createElement(routes[route.name], { navigator: navigator });
};


var MainNav = React.createClass({
  render: function() {
    return <Navigator
      initialRoute={{name: 'Home', index: 0}}
      renderScene={routeMapper}
      configureScene={(route) => {
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      }}
    />;
  }
});

module.exports = MainNav;
