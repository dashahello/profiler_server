const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  photo: String
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
