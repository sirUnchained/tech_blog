const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sample.work.instagram@gmail.com",
    pass: "iiyl elyd xiaf utbq",
  },
});

function sendEmail(emailOption) {
  try {
    const mailOption = {
      to: emailOption.to,
      subject: emailOption.subject,
      text: emailOption.text,
      html: emailOption.html,
    };

    transporter.sendMail(mailOption, (err) => {
      if (err) {
        throw err;
      }
      return true;
    });
  } catch (error) {
    throw error;
  }
}

module.exports = sendEmail;
