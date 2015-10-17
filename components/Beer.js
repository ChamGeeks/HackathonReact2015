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
    BeerStore.addChangeListener(this._onDayChange);
  },
  componentWillUnmount: function() {
    BeerStore.removeChangeListener(this._onDayChange);
  },


  _onDayChange: function() {
    this.setState({ offers: BeerStore.getSelectedDay() });
  },

  buttonClicked: function(e) {
    this.props.navigator.pop();
  },

  _selectDay: function(day) {
    BeerStore.setDay(day);
  },


  isDrink: function(tags) {
    return (tags.includes('beer') || tags.includes('cocktails'));
  },

  render: function() {

    var offers;

    if(this.state.offers) {
      offers = this.state.offers.map((item, index) => {
        if(this.isDrink(item.tagged)) {
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
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 1)}>
            <Text>Mon</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 2)}>
            <Text>Tue</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 3)}>
            <Text>Wed</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 4)}>
            <Text>Thu</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 5)}>
            <Text>Fri</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 6)}>
            <Text>Sat</Text>
          </TouchableHighlight>
          <TouchableHighlight style={s.days} onPress={this._selectDay.bind(this, 7)}>
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
