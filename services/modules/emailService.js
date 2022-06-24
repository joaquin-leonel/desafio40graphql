const nodemailer = require("nodemailer");
const { PASS_GMAIL } = require("../../config/globals");

exports.transporterEthereal = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: 'ila.welch82@ethereal.email',
    pass: 'VA1PX4qCcU6DajBB75',
  },
});

exports.transporterGmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "woriltomo10@gmail.com",
    pass: PASS_GMAIL,
  },
});
