const mongoose = require('mongoose');
mongoose.connect(
  "mongodb://mhd:mhd1234@ds047040.mlab.com:47040/pirates",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
const Schema = mongoose.Schema;

db.on('error', function () {
  console.log("mongoose connection error");
})

db.once('open', function () {
  console.log("mongoose connection successfull!")
})

// create schema for Pirate
const PirateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  isCaptured: {
    type: Boolean,
    required: true
  }
})

// make schema for user
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  }
});

// create model for Pirate
let Pirate = mongoose.model('Pirate', PirateSchema);
// create model for User
let User =  mongoose.model('User', UserSchema);

// function to select all pirates 
const selectAllPirates = (callback) => {
  Pirate.find({}).select('-_id -__v').exec((err, result) => {
     if (err) {
       console.log("Error during select data\n " + err)
       callback(err, [])
     } else {
       callback(null, result)
     }
  })
}

// function to search about user depend on user token
const findUserByToken = (token, callback) => {
  User.find({ token: token }).exec((err, user) => {
    if (err) {
      console.log("Erorr during  find Token \n" + err);
      callback(err, null);
    } else {
      callback(null, user);
    }
  })
}


exports.selectAllPirates = selectAllPirates;
exports.findUserByToken = findUserByToken;
