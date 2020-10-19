const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const patchRouter = require('./routes/patches');

const { redirect, checkQueries } = require('./utils/middlewares');
const { handleError } = require('./utils/helpers');
const { windowMs, max } = require('./utils/fixtures');

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs,
  max,
  handler(req, res) {
    const { message, statusCode } = this;
    return res.status(statusCode).json(handleError(message, res.statusCode));
  },
});

app.use(cors());
app.use(limiter);
app.use(redirect);
app.use(checkQueries);

app.use('/patches', patchRouter);

app.get('/*', (req, res) =>
  res
    .status(404)
    .json(
      handleError('Invalid path. See paths for more details', res.statusCode),
    ),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
