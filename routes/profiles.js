const express = require('express');
const multer = require('multer');
const { VALID_MIMETYPES } = require('../VALID_MIMETYPES.js');

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    cb(null, VALID_MIMETYPES.includes(file.mimetype));
  },
  limits: {
    fileSize: 1 * 1024 * 1024 * 50 // 50 MB
  }
});
const router = express.Router();

const {
  getAllProfiles,
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/profile.js');

router.get('/', getAllProfiles);
router.get('/:_id', getProfile);
router.post('/', upload.single('photo'), createProfile);
router.patch('/:_id', upload.single('photo'), updateProfile);
router.delete('/:_id', deleteProfile);

module.exports = router;
