var AppDispatcher = require('../dispatcher/AppDispatcher');
var BeerActions = require('../actions/BeerActions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

const CHANGE_EVENT = 'CHANGE_EVENT';
const LOADED_EVENT = 'LOADED_EVENT';

var _day_mapping = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];

var _selected_day = 'monday';
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

  getSelectedDay: () => BeerStore.getDay(_selected_day),

  getDayName: (day_number) => _day_mapping[day_number],

  getSelectedDayName: () => _selected_day,


  getBar: (bar_id) => _bars.filter((bar) => bar.id === bar_id).pop(),

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
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },


  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;
    var text;


    switch(action.actionType) {
      case 'SET_DAY':
        _selected_day = BeerStore.getDayName(action.day_number);
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
