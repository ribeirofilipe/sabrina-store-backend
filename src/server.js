const app = require('./app');

function timeout() {
  console.log('checked');

  setTimeout(() => {
    timeout();
  }, 60000);
}

app.listen(3333, () => timeout());