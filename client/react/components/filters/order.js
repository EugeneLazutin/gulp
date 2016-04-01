var templateFactory = require('./templates');
var orderStatus = require('../../../../config').orderStatus;
var createFilter = require('./filter').createFilter;


var StatusFilter = createFilter('status', 'Status', templateFactory.enum, [
  {
    key: 'Booked',
    value: orderStatus.booked
  },
  {
    key: 'On hand',
    value: orderStatus.onHand
  },
  {
    key: 'Cancelled',
    value: orderStatus.bookingCancelled
  },
  {
    key: 'Closed',
    value: orderStatus.rentalOver
  },
  {
    key: 'Lost',
    value: orderStatus.lost
  }
]);

module.exports = [StatusFilter];