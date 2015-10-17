var AppDispatcher = require('../dispatcher/AppDispatcher');
var BeerActions = require('../actions/BeerActions');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

const CHANGE_EVENT = 'CHANGE_EVENT';

var _day_mapping = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday'
};

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

var BeerStore = assign({}, EventEmitter.prototype, {


  getToday: function() {
    // var today = _day_mapping[(new Date().getDay()];
    var today = 'monday';
    if(_days[today].items) return _days[today].items;

    // @todo Use getDay
    BeerActions.getToday();
  },

  getSelectedDay: function() {
    return _days[_current_day].items;
  },

  /**
   * @todo use cache
   */
  setDay: function(day) {
    BeerActions.getDay(day);
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
    }

    return true; // No errors. Needed by promise in Dispatcher.
  })

});

module.exports = BeerStore;
