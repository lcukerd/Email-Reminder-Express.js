var db = require("./database.js");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshitkumar05081997@gmail.com",
    pass: ""
  }
});

var mailOptions = {
  from: "harshitkumar05081997@gmail.com",
  subject: "Reminder for survey"
};

function sendMail() {
  console.log("Scheduler for reminder started");
  db.get(604800000, null, patients => {
    patients.forEach(ele => {
      console.log("Sending mail to " + ele.email);
      mailOptions.to = ele.email;
      mailOptions.text =
        ele.name + ", you have not submitted your weekly review";
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    });
  });
}

startCycle = () => {
  console.log("Cycle Started");
  sendMail();
  setInterval(sendMail, 604800000);
};

module.exports.startup = () => {
  var d = new Date();
  const day = d.getDay();
  d.setHours(8);
  d.setMinutes(0);
  console.log("Today is " + day);
  if (day !== 5) {
    d.setDate(d.getDate() + Math.floor(day / 5) * 6 + (day % 5));
    setTimeout(startCycle, d.getMilliseconds() - new Date().getTime());
  } else {
    startCycle();
  }
};
