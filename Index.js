const express = require('express');

const app = express();
app.use(express.json());

require('./start/db')();
require('./start/routes')(app);
require('./start/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
