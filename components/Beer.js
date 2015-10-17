'use strict';

var React = require('react-native');
var { StyleSheet, Text, Image, View, TouchableHighlight } = React;
var BeerStore = require('../stores/BeerStore');
var s = require('../styles');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offers: BeerStore.getToday()
    }
  },

  componentDidMount: function() {
    BeerStore.addChangeListener(this._onTodayChange);
  },
  componentWillUnmount: function() {
    BeerStore.removeChangeListener(this._onTodayChange);
  },


  _onTodayChange: function() {
    this.setState({ offers: BeerStore.getToday() });
  },

  buttonClicked: function(e) {
    this.props.navigator.pop();
  },

  render: function() {

    var offers;

    if(this.state.offers) {
      console.log(this.state.offers);
      offers = this.state.offers.map((item, index) => {
        if(item.tagged.includes('beer') || item.tagged.includes('cocktails')) {
          return (
            <View key={'offer_'+ index} style={s.offer_item}>
              <Text>{ item.bar.name }</Text>
              <Text>{ item.starts } - { item.ends}</Text>
              <Text>{ item.type }</Text>
            </View>
          );
        }
        return;
      })
    } else {
      offers = (
        <View key="offer_loading" style={s.loader}>
          <Text>Loading...</Text>
        </View>
      );
    }

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

        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight style={s.days}>
            <Text>Mon</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Tue</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Wed</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Thu</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Fri</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Sat</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days}>
            <Text>Sun</Text>
          </TouchableHighlight>
        </View>

        <View style={s.offers}>
          {offers}
        </View>

      </View>
    );
  }
});
