/**
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');

var _day_mapping = {
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
  7: 'sunday'
};

var url = 'https://chamonix-hackathon-2015.herokuapp.com';

module.exports = {


  getBars: function(trying_again) {
    fetch(url +'/bars')
      .then((response) => response.json())
      .then((json) => {
        AppDispatcher.handleServerAction({
          actionType: 'LOADED_BARS',
          bars: json
        });
      })
      .catch((error) => {
        if(!trying_again) {
          this.getBars(true);
        } else {
          AppDispatcher.handleServerAction({
            actionType: 'ERROR',
            Message: 'Failed loading bars'
          });
        }
      });
    return this;
  },

  getOffers: function(trying_again) {
    fetch(url +'/offers')
      .then((response) => response.json())
      .then((json) => {
        AppDispatcher.handleServerAction({
          actionType: 'LOADED_OFFERS',
          offers: json
        });
      })
      .catch((error) => {
        if(!trying_again) {
          this.getOffers(true);
        } else {
          AppDispatcher.handleServerAction({
            actionType: 'ERROR',
            Message: 'Failed loading offers'
          });
        }
      });
    return this;
  },



  /**
   * @param  {string} text
   */
  getToday: function() {

    fetch(url +'/days/monday')
      .then((response) => response.json())
      .then((json) => {
        AppDispatcher.handleServerAction({
          actionType: 'TODAY',
          day: json.pop()
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  getDay: function(day) {
    fetch(url +'/days/'+ _day_mapping[day])
      .then((response) => response.json())
      .then((json) => {
        AppDispatcher.handleServerAction({
          actionType: 'SET_DAY',
          day: json.pop()
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

};
