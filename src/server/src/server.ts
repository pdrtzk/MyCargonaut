import express = require ('express');
import bodyParser = require ('body-parser');
import {Request, Response} from 'express';
import mysql = require ('mysql');
import session = require ('express-session');
import cryptoJS = require ('crypto-js');
import {Connection, MysqlError} from 'mysql';

import socket = require('socket.io'); // für Chatfunktion

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
  return new Promise((resolve, reject) => {
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
// app.use('/*', express.static(`../../../dist/MyCargonaut`));

app.listen(8080, 'localhost', () => {
  console.log('');
  console.log('-------------------------------------------------------------');
  console.log('                    UserMan-Backend läuft                    ');
  console.log('-------------------------------------------------------------');
  console.log('       Frontend aufrufen: http://localhost:8080              ');
  console.log('-------------------------------------------------------------');
});


/*****************************************************************************
 *           Authentication - Login / logout / Register       *
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

/*
 * Registrieren
 */
app.post('/cargonaut', (req: Request, res: Response) => {
  // Read data from request body
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const username: string = req.body.username;
  const password: string = cryptoJS.SHA512(req.body.password).toString();
  const email: string = req.body.email;
  const geburtsdatum: string = (req.body.geburtsdatum).toLocaleString();
  const strasse: string = req.body.street;
  const hausnr: string = req.body.number;
  const plz: string = req.body.plz;
  const ort: string = req.body.city;
  let adresse: number;
  if (strasse && hausnr && plz && ort) {
    const dataAdress: [string, string, string, string] = [
      strasse,
      hausnr,
      plz,
      ort,
    ];
    const queryAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
    queryPromise(queryAdress, dataAdress).then(result => {
      adresse = result.insertId;
      console.log('Standort angelegt.');
      if (firstname && lastname) {
        const data: [string, string, string, string, string, string, number] = [
          firstname,
          lastname,
          username,
          password,
          email,
          geburtsdatum,
          adresse,
        ];
        const query = 'INSERT INTO cargonaut (id, firstname, lastname, username, password, email, geburtsdatum, adresse) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);';
        queryPromise(query, data).then(results => {
          res.status(201).send({
            message: 'Neuer Nutzer erstellt!',
            createdUser: results.insertId,
          });
        }).catch(() => {
            res.status(400).send({
              message: 'Fehler beim Erstellen eines Nutzers.',
            });
          }
        );
      }
    }).catch(() => {
      res.status(400).send({
        message: 'Fehler beim Erstellen eines Standorts.',
      });
    });
  } else {
    res.status(400).send({
      message: 'Nicht alle Felder ausgefüllt.',
    });
  }
});

/*****************************************************************************
 *           Cargonaut       *
 *****************************************************************************/
/*
 * Get Cargonaut
 */
app.get('/cargonaut/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: [string] = [
    id,
  ];
  const query = 'SELECT * FROM cargonaut WHERE id = ?;';
  queryPromise(query, data).then(results => {
    if (results.length > 0) {
      res.status(200).send({
        user: results[0],
      });
    } else{
      res.status(400).send({
        message: 'Der User konnte nicht gefunden werden!',
      });
    }
  }).catch(() => {
    res.status(400).send({
      message: 'Fehler beim getten des Users!',
    });
  });
});

