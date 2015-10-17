'use strict';

var React = require('react-native');
var { Text, View, TouchableHighlight } = React;


module.exports = React.createClass({

  buttonClicked: function(e) {
    console.log('Go to beer');
    this.props.navigator.push({
      name: 'Beer'
    });
  },

  render: function() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked}
        >
          <Text style={styles.welcome}>Drink!</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked}
        >
          <Text style={styles.welcome}>Eat!</Text>
        </TouchableHighlight>

        <Text style={styles.welcome}>

        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
});
