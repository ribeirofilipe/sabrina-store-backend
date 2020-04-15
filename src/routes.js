require('dotenv').config();

const express = require('express');
const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const Pic = require('./schemas/Pic');

routes.post('/stay-online', (req, res) => {
  return res.json({ message: 'Success!'});
})

routes.post('/pics/:description/price/:price', upload.single('pic'), async (request, response) => {
  const { filename: url } = request.file;
  const { description, price } = request.params;

  const pic = await Pic.create({
    description,
    price: parseFloat(price),
    url: `${process.env.APP_URL}/pics/${url}`,  
  });

  return response.json(pic);
});

routes.get('/pics', async (request, response) => {
  const pics = await Pic.find();

  return response.json(pics);
})

module.exports = routes;