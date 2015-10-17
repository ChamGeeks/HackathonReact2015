'use strict';

var React = require('react-native');
var { Text, Image, View, TouchableHighlight } = React;
var styles = require('../styles');

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

        <View style={styles.header}>
          <Image style={{width: 10, height: 10}} source={ require('image!home') } />
        </View>

        <View style={[styles.center]}>
          <Text style={styles.h1}>Beer, burgers and birds.</Text>
        </View>

        <View style={{ flex: 2, justifyContent: 'center' }}>
          <TouchableHighlight style={[styles.btn_big, styles.btn_big_main]} onPress={this.buttonClicked}>
            <Text style={styles.btn_text}>Drink!</Text>
          </TouchableHighlight>

          <TouchableHighlight style={[styles.btn_big, styles.btn_big_main]} onPress={this.buttonClicked}>
            <Text style={styles.btn_text}>Eata!</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});
