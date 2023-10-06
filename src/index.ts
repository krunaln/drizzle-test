import * as express from 'express';
import { db, startMigration } from './db/db';
import { city, country, countrylanguage } from './db/schema';
import { eq } from 'drizzle-orm';
var morgan = require('morgan')

const app = express();
const port = 8080;

app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/getAllCities', async(req, res) => {
  const result = await db.select().from(city)
  res.send(result)
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});