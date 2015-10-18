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

        <View style={[s.header, s._beer]}>
          <TouchableHighlight style={s.back} onPress={this.buttonClicked}>
            <Text>Back</Text>
          </TouchableHighlight>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image style={{ width: 40, height: 40 }} source={ require('image!beer')} />
          </View>
          <View style={s.back}></View>
        </View>

        <Text>{ this.props.route.offer.type }</Text>


      </View>
    );
  }
});
