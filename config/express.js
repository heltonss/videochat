const express = require('express');
const app = express();

const port = (process.env.PORT || '3000');


module.exports = function () {
    const app = express();

    app.set('port', port);

    app.use(express.static('./public'));
    
    return app;
}