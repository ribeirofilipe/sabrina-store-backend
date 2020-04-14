const app = require('./app');

import routes from './routes';

app.use(routes);

app.listen(3333);