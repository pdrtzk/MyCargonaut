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
import {replaceTsWithNgInErrors} from '@angular/compiler-cli/src/ngtsc/diagnostics';


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

// check if logged in
app.get('/login', isLoggedIn(), (req: Request, res: Response) => {
  res.status(200).send({
    message: 'User ist weiterhin eingeloggt!',
    // @ts-ignore
    user: req.session.user
  });
});

// Login
app.post('/login', (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const data: [string, string] = [email, cryptoJS.SHA512(password).toString()];
  const query = 'SELECT * FROM cargonaut WHERE email = ? AND password = ?;';
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

// Logout
app.post('/logout', (req: Request, res: Response) => {
  // @ts-ignore
  delete req.session.user;
  res.status(200).send({
    message: 'Logged out!',
  });
});

// Registrieren
app.post('/cargonaut', async (req: Request, res: Response) => {
  // Read data from request body
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
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
      if (firstname && lastname) {
        const data: [string, string, string, string, string, number] = [
          firstname,
          lastname,
          password,
          email,
          geburtsdatum,
          adresse,
        ];
        const query = 'INSERT INTO cargonaut (id, firstname, lastname, password, email, geburtsdatum, adresse) VALUES (NULL, ?, ?, ?, ?, ?, ?);';
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
    });
  }
});


/*****************************************************************************
 *           Cargonaut       *
 *****************************************************************************/


// Get Cargonaut
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
    } else {
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

// Get Cargonaut
app.put('/cargonaut/:id', (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const firstname: string = req.body.firstname;
  const lastname: string = req.body.lastname;
  const email: string = req.body.email;
  const data: [string, string, string, number] = [
    firstname,
    lastname,
    email,
    id,
  ];
  const query = 'UPDATE cargonaut SET firstname = ?, lastname = ?, email = ? WHERE id = ?;';
  queryPromise(query, data).then(() => {
    res.status(200).send({
      message: `Updated user ${id}`,
    });
  }).catch(() => {
    res.status(400).send({
      message: 'Der User konnte nicht bearbeitet werden.',
    });
  });
});


/*****************************************************************************
 *           Fahrzeuge       *
 *****************************************************************************/


// add new vehicle
app.post('/vehicle/:owner', (req: Request, res: Response) => {
  // Read data from request body
  const art: string = req.body.type;
  const anzahlSitzplaetze: number = req.body.seats;
  const besitzer: string = req.params.owner;
  const laenge: number = req.body.length;
  const breite: number = req.body.width;
  const hoehe: number = req.body.height;
  let ladeflaeche: number;
  if (art && anzahlSitzplaetze && hoehe && breite && laenge && besitzer) {
    const dataLade: [number, number, number] = [
      laenge,
      breite,
      hoehe,
    ];
    const queryLade = 'INSERT INTO laderaum (id, ladeflaeche_laenge_cm, ladeflaeche_breite_cm, ladeflaeche_hoehe_cm) VALUES (NULL, ?, ?, ?);';
    queryPromise(queryLade, dataLade).then(result => {
      ladeflaeche = result.insertId;
      const data: [string, number, number, string] = [
        art,
        anzahlSitzplaetze,
        ladeflaeche,
        besitzer,
      ];
      const query = 'INSERT INTO fahrzeug (id, art, anzahl_sitzplaetze, ladeflaeche, besitzer) VALUES (NULL, ?, ?, ?, ?);';
      queryPromise(query, data).then(results => {
        res.status(201).send({
          message: 'Neues Fahrzeug erstellt!',
          createdVehicle: results.insertId,
        });
      }).catch(() => {
          res.status(400).send({
            message: 'Fehler beim Erstellen eines Fahrzeugs.',
          });
        }
      );

    }).catch(() => {
      res.status(400).send({
        message: 'Fehler beim Erstellen eines Laderaums.',
      });
    });
  } else {
    res.status(400).send({
      message: 'Nicht alle Felder ausgefüllt.',
    });
  }
});

// get vehicle
app.get('/vehicle/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: [string] = [
    id,
  ];
  const query = 'SELECT * FROM fahrzeug WHERE id = ?;';
  queryPromise(query, data).then(results => {
    if (results.length > 0) {
      res.status(200).send({
        vehicle: results[0],
      });
    } else {
      res.status(400).send({
        message: 'Das Fahrzeug konnte nicht gefunden werden!',
      });
    }
  }).catch(() => {
    res.status(400).send({
      message: 'Fehler beim getten des Fahrzeugs!',
    });
  });
});

// get vehicles from cargonaut
app.get('/vehicles/:cargonaut', (req: Request, res: Response) => {
  const cargonaut: string = req.params.cargonaut;
  const data: [string] = [
    cargonaut,
  ];
  const query = 'SELECT * FROM fahrzeug WHERE besitzer = ?;';
  queryPromise(query, data).then(results => {
    res.status(200).send({
      vehicles: results,
    });
  }).catch(() => {
    res.status(400).send({
      message: 'Fehler beim getten der Fahrzeuge!',
    });
  });
});

// delete vehicle
app.delete('/vehicle/:id', (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const query = 'DELETE FROM fahrzeug WHERE id = ?;';

  queryPromise(query, [id]).then(result => {
    // Check if database response contains at least one entry
    if (result.affectedRows === 1) {
      res.status(200).send({
        message: `Fahrzeug gelöscht`,
      });
    } else {
      res.status(400).send({
        message: 'Fahrzeug konnte nicht gefunden werden!',
      });
    }
  }).catch(err => {
    // Database operation has failed
    res.status(500).send({
      message: 'Datenbank Fehler: ' + err
    });
  });
});


/*****************************************************************************
 *           Post       * //
 *****************************************************************************/
// create Post
app.post('/post/:cargonaut', async (req: Request, res: Response) => {
  // Read data from request body
  const cargonaut: number = Number(req.params.cargonaut);
  const startzeit: string = req.body.startzeit;
  const ankunftZeit: string = req.body.ankunftZeit;
  const bezahlungsart: string = req.body.bezahlungsart;

  const fahrzeug: number = req.body.vehicle;
  const anzahlSitzplaetze: number = req.body.anzahlSitzplaetze;
  const beschreibung: string = req.body.beschreibung;
  const typ: string = req.body.typ;
  const preis = req.body.price;

  const strasse: string = req.body.street;
  const hausnr: string = req.body.number;
  const plz: string = req.body.plz;
  const ort: string = req.body.city;

  const zielStrasse: string = req.body.zielStreet;
  const zielHausnr: string = req.body.zielNumber;
  const zielPlz: string = req.body.zielPlz;
  const zielStadt: string = req.body.zielCity;
  const laenge: number = req.body.length;
  const breite: number = req.body.width;
  const hoehe: number = req.body.height;
  let standort: number;
  let zielort: number;
  let laderaum: number;
  // create startort
  if (cargonaut && startzeit && ankunftZeit && bezahlungsart &&
    fahrzeug && anzahlSitzplaetze && typ && preis && strasse &&
    hausnr && plz && ort && zielStrasse && zielHausnr && zielPlz &&
    zielStadt && laenge && breite && hoehe) {
    const dataAdress: [string, string, string, string] = [
      strasse,
      hausnr,
      plz,
      ort,
    ];
    const queryAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
    queryPromise(queryAdress, dataAdress).then(result => {
      standort = result.insertId;
      // create Zielort
      const zielDataAdress: [string, string, string, string] = [
        zielStrasse,
        zielHausnr,
        zielPlz,
        zielStadt,
      ];
      const queryZielAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
      queryPromise(queryZielAdress, zielDataAdress).then(results => {
        zielort = results.insertId;
        // create laderaum
        const dataLaderaum: [number, number, number] = [
          laenge,
          breite,
          hoehe,
        ];
        const queryLade = 'INSERT INTO laderaum (id, ladeflaeche_laenge_cm, ladeflaeche_breite_cm, ladeflaeche_hoehe_cm) VALUES (NULL, ?, ?, ?);';
        queryPromise(queryLade, dataLaderaum).then(resu => {
          laderaum = resu.insertId;
          // create Post
          const data: [number, number, string, string, string, number, number, number, string, string, number, any] = [
            standort,
            zielort,
            startzeit,
            ankunftZeit,
            bezahlungsart,
            laderaum,
            fahrzeug,
            anzahlSitzplaetze,
            beschreibung,
            typ,
            cargonaut,
            preis,
          ];
          const query = 'INSERT INTO `post` (`id`, `standort`, `zielort`, `startzeit`, `ankunft_zeit`, `bezahlungsart`, `laderaum`, `fahrzeug`, `gebucht`, `anzahl_sitzplaetze`, `beschreibung`, `typ`, `verfasser`, `status`, `preis`) ' +
            'VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, \'0\',?, ?, ?, ?, \'\', ?);';
          queryPromise(query, data).then(resultPost => {
            res.status(201).send({
              message: 'Neuer Post erstellt!',
              createdVehicle: resultPost.insertId,
            });
          });
        }).catch(() => {
            res.status(400).send({
              message: 'Fehler beim Erstellen eines Zielortes.',
            });
          }
        );

      }).catch(() => {
        res.status(400).send({
          message: 'Fehler beim Erstellen eines Standorts.',
        });
      });
    });
  }
  else
    {
      res.status(400).send({
        message: 'Nicht alle Felder ausgefüllt.',
      });
    }
  });

// get specific Post
app.get('/post/:id', (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: [string] = [
    id,
  ];
  const query = 'SELECT * FROM post WHERE id = ?;';
  queryPromise(query, data).then(results => {
    res.status(200).send({
      post: results,
    });
  }).catch(() => {
    res.status(400).send({
      message: 'Fehler beim getten des Posts!',
    });
  });
});

// get all Posts
app.get('/posts', (req: Request, res: Response) => { // parameter for sort and filtering
  /*
  const parameter: string = req.params.parameter;

  switch (parameter){
    case '':
      break;
  }
*/
  const query = 'SELECT * FROM post WHERE gebucht = ?;';
  queryPromise(query, [0]).then(results => {
    res.status(200).send({
      posts: results,
    });
  }).catch(() => {
    res.status(400).send({
      message: 'Fehler beim getten der Posts!',
    });
  });
});

// Update post
app.put('/post/:id', (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  const startzeit: string = req.body.startzeit;
  const ankunftZeit: string = req.body.ankunftZeit;
  const bezahlungsart: string = req.body.bezahlungsart;
  const fahrzeug: number = req.body.vehicle;
  const anzahlSitzplaetze: number = req.body.anzahlSitzplaetze;
  const beschreibung: string = req.body.beschreibung;
  const preis = req.body.price;

  const data: [string, string, string, number, number, string, any, number] = [
    startzeit,
    ankunftZeit,
    bezahlungsart,
    fahrzeug,
    anzahlSitzplaetze,
    beschreibung,
    preis,
    id
  ];
  const query = 'UPDATE post SET startzeit = ?, ankunft_zeit = ?, bezahlungsart = ?, fahrzeug = ?, anzahl_sitzplaetze = ?, beschreibung = ?, preis = ? WHERE id = ?;';
  queryPromise(query, data).then(() => {
    res.status(200).send({
      message: `Updated post ${id}`,
    });
  }).catch(() => {
    res.status(400).send({
      message: 'Der Post konnte nicht bearbeitet werden.',
    });
  });
});

/*****************************************************************************
 *           buchung       * // TODO: buchung get/:id, post
 *****************************************************************************/
/*****************************************************************************
 *           Bewertung       * // TODO: Bewertung get/:id, post, (put, delete)
 *****************************************************************************/







