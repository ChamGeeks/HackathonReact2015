'use strict';

var { StyleSheet } = require('react-native');

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  },

  header: {
    backgroundColor: '#0086DB',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  center: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
    margin: 20
  },
  btn_big: {
    alignItems: 'center',
    padding: 30,
    marginVertical: 10
  },
  btn_big_main: {
    backgroundColor: '#911'
  },
  btn_text: {
    color: '#fff'
  },
  back: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },

  offers: {
    flex: 1
  },
  offer_item: {
    padding: 5,
    margin: 5,
    backgroundColor: '#fa8'
  },

  days: {
    flex: 1,
    margin: 5,
    backgroundColor: '#E06974',
    alignItems: 'center',
    borderRadius: 3,
    padding: 2
  },

  _beer: {
    backgroundColor: '#6D5CEB'
  },
  _food: {
    backgroundColor: '#E75050'
  }

});

module.exports = styles;
