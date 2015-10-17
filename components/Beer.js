'use strict';

var React = require('react-native');
var { StyleSheet, Text, View, TouchableHighlight } = React;
var BeerStore = require('../stores/BeerStore');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#fff'
  },
  button: {
    backgroundColor: '#911'
  },
  loader: {
    backgroundColor: '#f8a'
  }
});

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
            <View key={'offer_'+ index}>
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
        <View key="offer_loading" style={styles.loader}>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.button} onPress={this.buttonClicked}>
          <Text style={styles.welcome}>Back</Text>
        </TouchableHighlight>

        {offers}

      </View>
    );
  }
});
