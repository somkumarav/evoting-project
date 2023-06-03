const nodemailer = require('nodemailer');
const renderMailOTP = require('./renderMailOTP');

const sendMailOTP = async (toMail, otp) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vidyavoting@gmail.com',
      pass: 'ymzfrsoxbzpudpmc',
    },
  });

  let info = await transporter.sendMail({
    from: 'VAST EVoting <vidyavoting@gmail.com>', // sender address
    to: toMail, // list of receivers
    subject: 'voter ID', // Subject line
    html: renderMailOTP(otp), // html body
  });
};

module.exports = sendMailOTP;
