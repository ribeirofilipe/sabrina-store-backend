const crypto = require('crypto');
const multer = require('multer');
const { extname, resolve } = require('path');
const path = resolve(__dirname, '..', '..', 'tmp');

module.exports = {
  directory: path,
  storage: multer.diskStorage({
    destination: path,
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};