
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const multerUploads = multer({ storage: storage }).fields([{ name: 'signature', maxCount: 1 }, { name: 'passport_photo', maxCount: 1 }]);
module.exports = multerUploads;
