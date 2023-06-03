const nodemailer = require('nodemailer');
const renderMail = require('./renderMail');

const sendMail = async (toMail, voterId, aadhaar) => {
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
    html: renderMail(voterId, aadhaar), // html body
  });
};

module.exports = sendMail;
