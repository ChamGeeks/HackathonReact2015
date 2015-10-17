/**
 * TodoActions
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
// var request = require('request');

var url = 'https://chamonix-hackathon-2015.herokuapp.com';

module.exports = {

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
  }

};
