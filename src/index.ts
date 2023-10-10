import * as express from 'express';
import { db, startMigration } from './db/db';
import { city, country, countrylanguage, insertCitySchema } from './db/schema';
import { eq } from 'drizzle-orm';
var morgan = require('morgan')

const app = express();
const port = 8080;

app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Health Check Ok');
});

//GET all Cities
app.get('/city', async(req, res) => {
  const result = await db.select().from(city).innerJoin(country, eq(country.capital, city.id))
  res.send(result)
});

//Create a City
app.post('/city', async (req, res) => {
  const result = await db.insert(city).values(req.body).returning();
  res.send(result)
})

//Update a City
app.put('/city/:id',async (req,res) => {
  const result = await db.update(city).set(req.body).where(eq(city.id, Number(req.params.id))).returning();
  res.send(result)
})

//Delete a City
app.delete('/city/:id',async (req,res) => {
  await db.delete(city).where(eq(city.id, Number(req.params.id)));
  res.send("Deleted Successfully")
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});