class Patient {
  constructor(id, name, email, sub_date) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._sub_date = sub_date;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get sub_date() {
    return this._sub_date;
  }
}

module.exports.patient = Patient;
