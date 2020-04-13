const app = require('./app');

app.get('/', (req, res) => {
  return res.json({ message: 'ONLINE'});
})

function timeout() {
  console.log('checked');

  setTimeout(() => {
    timeout();
  }, 60000);
}

app.listen(3333, () => timeout());