const express = require('express');

const routes = express.Router();

routes.get('/online', (req, res) => {
  return res.json({ message: 'ONLINE'});
})

module.exports = routes;