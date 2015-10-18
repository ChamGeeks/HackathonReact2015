var AppDispatcher = require('../dispatcher/AppDispatcher');
var BeerActions = require('../actions/BeerActions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

const CHANGE_EVENT = 'CHANGE_EVENT';
const LOADED_EVENT = 'LOADED_EVENT';

var _day_mapping = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

var _current_day = 'monday';
var _days = {
  monday: {},
  tuesday: {},
  wednesday: {},
  thursday: {},
  friday: {},
  saturday: {},
  sunday: {}
};

var _offers = [];
var _bars = [];



var BeerStore = assign({}, EventEmitter.prototype, {

  init: function() {
    BeerActions
      .getBars()
      .getOffers();
  },

  getToday: function() {
    let day_number = new Date().getDay();
    let day_name = _day_mapping[day_number];
    return this.getDay(day_name);
  },
  getDay: (day_name) => _offers.filter((offer) => offer.day === day_name),

  getSelectedDay: () => this.getDay(_current_day),

  /**
   * @todo use cache
   */
  setDay: function(day) {
    BeerActions.getDay(day);
  },

  /**
   * Emit when all is loaded
   */
  emitLoaded: function() {
    if(_bars.length && _offers.length) {
      this.emit(LOADED_EVENT);
    }
  },
  addLoadedListener: function(callback) {
    this.on(LOADED_EVENT, callback);
  },
  removeLoadedListener: function(callback) {
    this.removeListener(LOADED_EVENT, callback);
  },


  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;
    var text;


    switch(action.actionType) {
      case 'TODAY':
        _days[action.day.name].items = action.day.offers;
        BeerStore.emitChange();
        break;
      case 'SET_DAY':
        _days[action.day.name].items = action.day.offers;
        _current_day = action.day.name;
        BeerStore.emitChange();
        break;
      case 'LOADED_BARS':
        _bars = action.bars;
        BeerStore.emitLoaded();
        break;
      case 'LOADED_OFFERS':
        _offers = action.offers;
        BeerStore.emitLoaded();
        break;
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = BeerStore;
