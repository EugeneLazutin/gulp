var schedule = require('node-schedule');
var Order = require('../dal/models/order');
var orderStatus = require('../../config').orderStatus;
var taskWorkingHours= require('../../config').taskWorkingHours;
var sender = require('./email_sender');
var _ = require('lodash');
var chalk = require('chalk');
var moment = require('moment');

var log = console.log;

schedule.scheduleJob(`0 ${taskWorkingHours} * * *`, function () {

  log(chalk.green(`Task is running ${moment().format()}`));

  Order
    .find({
      status: orderStatus.booked,
      date: {
        end: {
          $gt: Date.now()
        }
      }
    })
    .exec((err, orders) => {
      if (err) {
        return log(chalk.red(err));
      }

      log(chalk.blue(`Booked orders count - ${orders.length}`));

      orders.forEach(order => {
        order.status = orderStatus.bookingCancelled;
        order.save();
      });
    });


  Order.find({
      status: orderStatus.onHand,
      date: {
        end: {
          $gt: Date.now()
        }
      }
    })
    .populate('user')
    .exec((err, orders) => {
      console.log(err, orders);
      if (err) {
        return log(chalk.red(err));
      }

      log(chalk.blue(`Books on hand - ${orders.length}`));

      orders.forEach(order => {
        var mailOptions = {
          to: order.user.email,
          subject: 'Notice from the library.',
          html: `<h3>Dear ${order.user.name.first}!</h3>
          <p>${moment(order.date.end).format('LL')} you had to return "${order.bookTitle}" book.
          Please do this as soon as possible.</p>
          <p>Sincerely, the administration of the library.</p>`
        };

        sender
          .send(mailOptions)
          .then(msg => {
            order.status = orderStatus.notified;
            order.save();
          })
          .catch(err => {
            log(chalk.red(err));
          });
      });
    });
});
