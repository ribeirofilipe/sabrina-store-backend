const app = require('./app');

app.get('/online', (req, res) => {
  return res.json({ message: 'ONLINE'});
})

app.listen(3333);