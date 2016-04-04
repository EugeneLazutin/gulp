var nodemailer = require('nodemailer');
var smtps = require('../../config').smtps;

var transporter = nodemailer.createTransport(smtps);

exports.send = options => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function(error, info){
      if(error){
        return reject(error);
      }
      resolve(info.response);
    });
  });
};

