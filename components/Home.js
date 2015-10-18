'use strict';

var React = require('react-native');
var { Text, Image, View, TouchableHighlight } = React;
var BeerStore = require('../stores/BeerStore');
var s = require('../styles');

module.exports = React.createClass({

  getInitialState: function() {
    return { is_loading: true };
  },

  componentDidMount: function() {
    BeerStore.addLoadedListener(this._hasLoaded);
  },
  componentWillUnmount: function() {
    BeerStore.removeLoadedListener(this._hasLoaded);
  },

  _hasLoaded: function() {
    this.setState({ is_loading: false });
  },

  buttonClicked: function(e) {
    console.log('Go to beer');
    this.props.navigator.push({
      name: 'Beer'
    });
  },

  render: function() {

    let loader;
    if(this.state.is_loading) {
      loader = (
        <View style={{
          flex: 1,
          alignSelf: 'stretch',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)'
        }}>
        <Text style={{ color: '#fff', fontSize: 50 }}>Loading...</Text>
        </View>
      );
    }

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
            <Image style={{ width: 70, height: 70 }} source={ require('image!beer')} />
          </TouchableHighlight>

          <Text style={{ fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>OR</Text>

          <TouchableHighlight style={[s.btn_big, s.btn_big_main, s._food]} onPress={this.buttonClicked}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ width: 70, height: 70 }} source={ require('image!food')} />
              <Text style={{ fontSize: 40, padding: 5 }}> +</Text>
              <Image style={{ width: 70, height: 70 }} source={ require('image!beer')} />
            </View>
          </TouchableHighlight>
        </View>

        {loader}

      </View>
    );
  }
});
