const config = require('./src/common/config/env.js');
const express = require('express');
const app = express();

const Router = require('./src/common/utils/routes.config');

app.use(express.json());

Router.routesConfig(app);

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});
