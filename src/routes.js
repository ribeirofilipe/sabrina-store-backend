require('dotenv').config();
const fs = require('fs');
const AWS = require('aws-sdk');

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
    const { filename: path } = request.file;
    const { description, price } = request.params;

    const s3 = new AWS.S3({
      accessKeyId: process.env.KEY,
      secretAccessKey: process.env.SECRET_KEY,
    });

    const fileContent = await fs.readFileSync(`${multerConfig.directory}/${path}`);

    const params = {
        Bucket: `${process.env.BUCKET_NAME}/pics`,
        Key: `${description}-${new Date()}.jpg`, 
        Body: fileContent
    };

    s3.upload(params, async (err, data) => {
        if (err) {
            throw err;
        }
       
        const pic = await Pic.create({
                description,
                price: parseFloat(price),
                url: `${data.Location}`,  
              });
          
        return response.json(pic);
    });
})

routes.post('/pics', async (request, response) => {
  const { page } = request.body; 

  const total = await Pic.countDocuments();

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