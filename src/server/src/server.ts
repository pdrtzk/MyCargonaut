import * as express from 'express';
import * as bodyParser from 'body-parser';
import {Request, Response} from 'express';
import * as mysql from 'mysql';
import * as session from 'express-session';
import * as cryptoJS from 'crypto-js';
import {Connection, MysqlError} from 'mysql';

import * as socket from 'socket.io'; // für Chatfunktion

import {Configuration} from '../config/config';
import {Cargonaut} from '../model/Cargonaut';

/*****************************************************************************
 *           Configuration       *
 *****************************************************************************/
const app = express();
const database: Connection = mysql.createConnection(Configuration.mysqlOptions);
app.use(bodyParser.json());
app.use(session(Configuration.sessionOptions));

database.connect((err: MysqlError) => {
  if (err) {
    console.log('Database connection failed: ', err);
  } else {
    console.log('Database is connected');
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

async function queryPromise(sql: string, data: any[]): Promise<any> {
  return new Promise ((resolve, reject) => {
    database.query(sql, data, (err: MysqlError, rows: any) => {
      if (err) {
        reject(rows);
      } else {
        resolve(rows);
      }
    });
  });
}

/*****************************************************************************
 *           Static routes       *
 *****************************************************************************/
app.use('/', express.static(`../../../dist/MyCargonaut`));
app.use('/*', express.static(`../../../dist/MyCargonaut`));

app.listen(8080, 'localhost',  () => {
  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    UserMan-Backend läuft                       ');
  console.log('-------------------------------------------------------------');
  console.log('       Frontend aufrufen: http://localhost:8080              ');
  console.log('-------------------------------------------------------------');
});


/*****************************************************************************
 *           Routes       *
 *****************************************************************************/
function isLoggedIn(): (req: Request, res: Response, next: any) => void {
  return (req: Request, res: Response, next) => {
    // @ts-ignore
    if (req.session.user) {
      next();
    } else {
      res.status(401).send({
        message: 'User nicht mehr eingeloggt. Erneut anmelden!',
      });
    }
  };
}

app.get('/login', isLoggedIn(), (req: Request, res: Response) => {
  res.status(200).send({
    message: 'User ist weiterhin eingeloggt!',
    // @ts-ignore
    user: req.session.user
  });
});

/**
 * Login
 */
app.post('/login', (req: Request, res: Response) => {
  const username: string = req.body.username;
  const password: string = req.body.password;
  const data: [string, string] = [username, cryptoJS.SHA512(password).toString()];
  const query = 'SELECT * FROM cargonaut WHERE username = ? AND password = ?;';
  queryPromise(query, data).then(rows => {
    if (rows.length === 1) {
      const user: Cargonaut = new Cargonaut(/*rows[0].id,
          rows[0].username,
          rows[0].firstName,
          rows[0].lastName,
          new Date(rows[0].time),
          rows[0].rights*/);
      // @ts-ignore
      req.session.user = user;
      res.status(200).send({
        message: 'Logged in!',
      });
    } else {
      res.status(401).send({
        message: 'Login information is not correct!',
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: 'Datenbank Fehler: ' + err,
    });
  });
});

/**
 * Logout
 */
app.post('/logout', (req: Request, res: Response) => {
  // @ts-ignore
  delete req.session.user;
  res.status(200).send({
    message: 'Logged out!',
  });
});
