'use strict';

var React = require('react-native');
var { StyleSheet, Text, Image, View, TouchableHighlight } = React;
var BeerStore = require('../stores/BeerStore');
var BeerActions = require('../actions/BeerActions');
var s = require('../styles');

var _days = [
  { id: 1, slug: 'monday' },
  { id: 2, slug: 'tuesday' },
  { id: 3, slug: 'wednesday' },
  { id: 4, slug: 'thursday' },
  { id: 5, slug: 'friday' },
  { id: 6, slug: 'saturday' },
  { id: 0, slug: 'sunday' }
];

module.exports = React.createClass({

  getInitialState: function() {
    return {
      offers: BeerStore.getToday(),
      selected_day: BeerStore.getSelectedDayName()
    }
  },

  componentDidMount: function() {
    BeerStore.addChangeListener(this._onDayChange);
  },
  componentWillUnmount: function() {
    BeerStore.removeChangeListener(this._onDayChange);
  },


  _onDayChange: function() {
    this.setState({
      offers: BeerStore.getSelectedDay(),
      selected_day: BeerStore.getSelectedDayName()
    });
  },

  _back: function(e) {
    this.props.navigator.pop();
  },

  _selectDay: function(day) {
    BeerActions.setDay(day);
  },

  handleSelectOffer: function(offer) {
    this.props.navigator.push({
      name: 'Offer',
      offer
    })
  },


  isDrink: function(tags) {
    return (
      tags.indexOf('beer') >= 0 ||
      tags.indexOf('cocktails') >= 0 ||
      tags.indexOf('shots') >= 0
    );
  },


  render: function() {

    var offers;
    var self = this;

    if(this.state.offers) {
      offers = this.state.offers.map((item, index) => {
        if(self.isDrink(item.tagged)) {
          return (
            <TouchableHighlight
              key={'offer_'+ index}
              style={s.offer_item}
              onPress={self.handleSelectOffer.bind(this, item)}
            >
              <View>
                <Text>{ item.bar.name }</Text>
                <Text>{ item.starts } - { item.ends}</Text>
                <Text>{ item.type }</Text>
              </View>
            </TouchableHighlight>
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

    var days = _days.map((day) => {
      return (
        <TouchableHighlight key={'day_'+ day.id} style={s.days} onPress={this._selectDay.bind(self, day.id)}>
          <Text>{ day.slug }</Text>
        </TouchableHighlight>
      );
    });

    return (
      <View style={s.container}>
        <View style={[s.header, s._beer]}>
          <TouchableHighlight style={s.back} onPress={this._back}>
            <Text>Back</Text>
          </TouchableHighlight>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image style={{ width: 40, height: 40 }} source={ require('image!beer')} />
          </View>
          <View style={s.back}></View>
        </View>


        <TouchableHighlight onPress={this._changeDay}>
          <Text>{ this.state.selected_day }</Text>
        </TouchableHighlight>

        <View style={{ flexDirection: 'column' }}>
          {days}
        </View>

        <View style={s.offers}>
          {offers}
        </View>

      </View>
    );
  }
});
