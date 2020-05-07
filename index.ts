import * as express from 'express';
import * as bodyParser from 'body-parser';
import { routes } from './routes';
//import { authenticateJWT } from './services/authService';
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use((_request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.header("Access-Control-Allow-Headers", "Content-Type, authorization"); //allows for headers with authorization
  next();
});

app.get('/', (_request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" })
})

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App currently running on port ${port}`)
})
