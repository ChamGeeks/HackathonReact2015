'use strict';

var React = require('react-native');
var { Text, Image, View, TouchableHighlight } = React;
var s = require('../styles');

module.exports = React.createClass({

  buttonClicked: function(e) {
    console.log('Go to beer');
    this.props.navigator.push({
      name: 'Beer'
    });
  },

  render: function() {
    return (
      <View style={s.container}>

        <View style={s.header}>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Image style={{width: 12, height: 12}} source={ require('image!home') } />
          </View>
        </View>

        <View style={[s.center]}>
          <Text style={s.h1}>Beer, burgers and birds.</Text>
        </View>

        <View style={{ flex: 2, justifyContent: 'center' }}>
          <TouchableHighlight style={[s.btn_big, s.btn_big_main, s._beer]} onPress={this.buttonClicked}>
            <Image style={{ width: 60, height: 60 }} source={ require('image!beer')} />
          </TouchableHighlight>

          <TouchableHighlight style={[s.btn_big, s.btn_big_main, s._food]} onPress={this.buttonClicked}>
            <Image style={{ width: 60, height: 60 }} source={ require('image!food')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
});
