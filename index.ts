
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { routes } from './routes';
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App currently running on port ${port}`)
})
