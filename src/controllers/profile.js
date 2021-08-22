const mongoose = require('mongoose');
const fs = require('fs').promises;
const validator = require('email-validator');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { VALID_MIMETYPES } = require('../VALID_MIMETYPES.js');

const Profile = require('../model/Profile.js');

function validateProfileData(profileData) {
  if (!profileData.name || profileData.name.length > 40) {
    return console.log('No name or name is too long');
  } else if (!profileData.surname) {
    return console.log('No surname');
  } else if (!validator.validate(profileData.email)) {
    return console.log('Invalid email');
  } else {
    return true;
  }
}

function validateProfilePhoto(file) {
  if (!file) {
    return console.log('No file');
  } else if (!VALID_MIMETYPES.includes(file.mimetype)) {
    return console.log('File type is invalid');
  }

  return true;
}

const getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();

    if (!profiles.length) {
      res.status(404).json({ mesage: 'Profileles not found' });
    } else {
      res.status(200).json(profiles);
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ error: error.message });
  }
};

const getProfile = async (req, res) => {
  const { _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No profile with _id ${_id}`);
  }

  const profile = await Profile.findById(_id);
  res.status(200).json(profile);
};

const createProfile = async (req, res) => {
  const profileData = req.body;
  const profilePhoto = req.file;

  const profileDataIsValid = validateProfileData(profileData);
  const profilePhotoIsValid = validateProfilePhoto(profilePhoto);

  if (profileDataIsValid !== true || profilePhotoIsValid !== true) {
    console.log('Can not create a new profile');
    return res.status(400).json({ error: profileDataIsValid });
  }

  const photoFileName = uuidv4() + '.jpg';

  await sharp(profilePhoto.buffer)
    .resize(200, 200)
    .toFile(`${process.env.STATIC_DIRECTORY}/${photoFileName}`);

  profileData.photo = photoFileName;

  const newProfile = new Profile(profileData);

  try {
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const { _id } = req.params;
  const profileData = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ error: `_id ${_id} is invalid` });
  }
  const profilePhoto = req.file;

  if (profilePhoto) {
    const profileDataIsValid = validateProfileData(profileData);
    const profilePhotoIsValid = validateProfilePhoto(profilePhoto);

    if (profileDataIsValid !== true || profilePhotoIsValid !== true) {
      console.log('Can not update the profile');
      return res.status(400).json({ error: profileDataIsValid });
    }

    const photoFileName = uuidv4() + '.jpg';

    await sharp(profilePhoto.buffer)
      .resize(200, 200)
      .toFile(`${process.env.STATIC_DIRECTORY}/${photoFileName}`);

    profileData.photo = photoFileName;

    const oldProfile = await Profile.findById(_id, 'photo');

    await fs.unlink(`${process.env.STATIC_DIRECTORY}/${oldProfile.photo}`);
  }

  const updatedProfile = await Profile.findByIdAndUpdate(_id, profileData, {
    new: true
  });

  if (!updatedProfile) {
    return res.status(404).json({ error: `No profile with _id ${_id}` });
  } else {
    res.json(updatedProfile);
  }
};

const deleteProfile = async (req, res) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send(`No profile with an id ${_id}`);
  }

  const deletedProfile = await Profile.findByIdAndRemove(_id);

  await fs.unlink(`${process.env.STATIC_DIRECTORY}/${deletedProfile.photo}`);

  res.json({ message: `Post with _id ${_id} was successfully deleted` });
};

module.exports = {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
};
