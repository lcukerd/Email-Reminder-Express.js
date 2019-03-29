var sqlite = require("sqlite3").verbose();
const Patient = require("./patient.js").patient;

// Load Database
var db = new sqlite.Database("Clinic");

// Create table if not exists
db.run(
  "CREATE TABLE IF NOT EXISTS patients (Id INT PRIMARY KEY, Name TEXT, Email TEXT, Sub_date INT)"
);

module.exports.get = function get(last_sub, res, callbackfn) {
  const expire = getms() - last_sub;
  let patients = [];
  console.log(expire);
  db.all(
    "SELECT * FROM patients WHERE Sub_date < $expire",
    {
      $expire: expire
    },
    (err, row) => {
      if (row === undefined) {
        console.log("Nothing found");
        if (res != null) res.send(patients);
      } else {
        for (let i = 0; i < row.length; i++) {
          patients.push(
            new Patient(row[i].Id, row[i].Name, row[i].Email, row[i].Sub_date)
          );
        }
        if (res != null) res.send(patients);
        if (callbackfn != null) callbackfn(patients);
      }
    }
  );
  return patients;
};

module.exports.add = function add(patient, res) {
  let time = getms();
  db.run(
    "INSERT INTO patients VALUES($id,$name,$email,$sub) ",
    {
      $name: patient.name,
      $email: patient.email,
      $sub: patient.sub_date,
      $id: time
    },
    (err, row) => {
      if (err != null) {
        console.log(err.message);
        res.status(500);
      } else {
        console.log("Patient added successfully");
        patient.id = time;
        console.log(time);
        res.status(200).send(patient);
      }
    }
  );
};

// Using time of call in milliseconds as ID
function getms() {
  return new Date().getTime();
}
