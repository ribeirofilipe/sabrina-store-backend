require('dotenv').config();

const express = require('express');
const routes = express.Router();

const multer = require('multer');
const multerConfig = require('./config/multer');

const upload = multer(multerConfig);

const Pic = require('./schemas/Pic');

routes.post(
  '/pics/:description/price/:price', 
  upload.single('pic'), 
  async (request, response) => {
    console.log(request.file);
    console.log(request.params);
    const { filename: url } = request.file;
    const { description, price } = request.params;

    const pic = await Pic.create({
      description,
      price: parseFloat(price),
      url: `${process.env.APP_URL}/pics/${url}`,  
    });

    return response.json(pic);
});

routes.post('/pics', async (request, response) => {
  const { page } = request.body; 

  const total = await Pic.count();

  const pics = await Pic.find()
  .skip((page -1) * 9)
  .limit(9);

  return response.json({
    pics,
    total
  });
})

routes.delete('/pics/:id', async (request, response) => {
  const { id } = request.params;

  await Pic.deleteOne({
    _id: id
  });
  
  return response.status(204).send();
})


module.exports = routes;