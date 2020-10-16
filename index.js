const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const patchRouter = require('./routes/patches');

const { redirect, checkQueries } = require('./utils/middlewares');
const { handleError } = require('./utils/helpers');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(redirect);
app.use(checkQueries);

app.use('/patches', patchRouter);

app.get('/*', (req, res) => res.json(handleError('Invalid path')));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
