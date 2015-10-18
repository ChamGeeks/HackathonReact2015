'use strict';

var React = require('react-native');
var { Text, Image, View, MapView, TouchableHighlight } = React;
var s = require('../styles');
var BeerStore = require('../stores/BeerStore');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      bar: BeerStore.getBar(this.props.route.offer.bar.id)
    };
  },

  buttonClicked: function(e) {
    console.log('Go to beer');
    this.props.navigator.push({
      name: 'Beer'
    });
  },


  render: function() {
    let offer = this.props.route.offer;
    let bar = this.state.bar;

    let map = [{
      latitude: bar.location.lat,
      longitude: bar.location.long,
      animateDrop: true,
      title: bar.name
    }];

    let region = {
      latitude: bar.location.lat,
      longitude: bar.location.long,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    };

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

        <View style={{ textAlign: 'center', alignItems: 'center' }}>
          <Text style={s.h1}>{bar.name}</Text>
          <Image style={{ width: 150, height: 150 }} source={{ uri: bar.image_url }} />
          <Text style={{ padding: 20 }}>{ offer.type }</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <MapView style={{ width: 200, height: 200 }} annotations={map} region={region} />
        </View>

      </View>
    );
  }
});
