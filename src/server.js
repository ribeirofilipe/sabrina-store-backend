const app = require('./app');
const routes = require('./routes');

app.use(routes);

app.listen(process.env.PORT || 3333);