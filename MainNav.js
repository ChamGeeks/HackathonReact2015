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
var BeerStore = require('./stores/BeerStore');
var routes = {
  Home: require('./components/Home.js'),
  Beer: require('./components/Beer.js'),
  Offer: require('./components/Offer.js')
}

var routeMapper = (route, navigator) => {
  return React.createElement(routes[route.name], { route, navigator });
};


var MainNav = React.createClass({

  componentDidMount: function() {
    // Load bars and offers
    BeerStore.init();
  },

  render: function() {
    return <Navigator
      initialRoute={{ name: 'Home' }}
      renderScene={routeMapper}
      configureScene={(route) => {
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      }}
    />;
  }
});

module.exports = MainNav;
