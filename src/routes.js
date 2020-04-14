const express = require('express');

const routes = express.Router();

routes.post('/pic', (req, res) => {
  return res.json({ message: 'ONLINE'});
})

module.exports = routes;