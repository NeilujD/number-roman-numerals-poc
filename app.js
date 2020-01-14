import express from 'express';
import { join, dirname } from 'path';
import { toRoman } from './convert.js';
import { fileURLToPath } from 'url';

// WORKAROUND : create `__dirname` variable because of the `--experimental-modules` flag use
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

/**
 * Render `index.html` page
 */
app.get('/', (req, res) => {
  res.sendFile(join(`${__dirname}/index.html`));
});

/**
 * Handle the `/convert` get request
 */
app.get('/convert', async (req, res) => {
  if (!req.query.number) {
    res.status(422);
    return res.json({code: "missing_number_parameter"});
  }
  else if (req.query.number > 4999 || req.query.number < 1) {
    res.status(422);
    return res.json({code: "bad_number_parameter"});
  }

  const result = await toRoman(req.query.number);
  res.json({result});
});

app.listen(port, () => console.log(`App listening on port ${port} !`));

export default app;