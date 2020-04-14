
import * as express from 'express';
import * as bodyParser from 'body-parser';
// import * as session from 'express-session';
// import * as PgStore from 'connect-pg-simple';
// import * as pg from 'pg';
import { routes } from './routes';
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// var pgPool = new pg.Pool({
//   user: 'test',
//   host: 'localhost',
//   database: 'cerebral',
//   password: 'test',
//   port: 5432,
//});

//session automatically sets up cookies
// app.use(session({
//   store: new((PgStore)(session))({
//     pool: pgPool,
//     tableName: 'session'
//   }),
//   secret: 'secretvalue', 
//   resave: false, 
//   saveUninitialized: false
// }));

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
