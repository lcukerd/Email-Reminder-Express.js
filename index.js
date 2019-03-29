const db = require("./database.js");
const Patient = require("./patient.js").patient;
const startup = require("./reminder.js").startup;

const express = require("express");
const app = express();

app.use(express.json());

app.post("/add", (req, res) => {
  db.add(
    new Patient(null, req.body.name, req.body.email, req.body.sub_date),
    res
  );
});

app.get("/get", (req, res) => {
  db.get(1210000000, res, null);
});

startup();

port = process.env.port || 3200;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
