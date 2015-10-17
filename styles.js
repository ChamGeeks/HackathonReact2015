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
    justifyContent: 'center'
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
    padding: 20,
    margin: 10
  },
  btn_big_main: {
    backgroundColor: '#911'
  },
  btn_text: {
    color: '#fff'
  }

});

module.exports = styles;
