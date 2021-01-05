"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var session = require("express-session");
var cryptoJS = require("crypto-js");
var config_1 = require("../config/config");
/*****************************************************************************
 *           Configuration       *
 *****************************************************************************/
var app = express();
var database = mysql.createConnection(config_1.Configuration.mysqlOptions);
app.use(bodyParser.json());
app.use(session(config_1.Configuration.sessionOptions));
database.connect(function (err) {
    if (err) {
        console.log('Database connection failed: ', err);
    }
    else {
        console.log('Database is connected');
    }
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});
function queryPromise(sql, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    database.query(sql, data, function (err, rows) {
                        if (err) {
                            reject(rows);
                        }
                        else {
                            resolve(rows);
                        }
                    });
                })];
        });
    });
}
/*****************************************************************************
 *           Static routes       *
 *****************************************************************************/
app.use('/', express.static("../../../dist/MyCargonaut"));
// app.use('/*', express.static(`../../../dist/MyCargonaut`));
app.listen(8080, 'localhost', function () {
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
// insert in header of Route to check if the Persons logged in before executing the action
function isLoggedIn() {
    return function (req, res, next) {
        // @ts-ignore
        if (req.session.user) {
            next();
        }
        else {
            res.status(401).send({
                message: 'User nicht mehr eingeloggt. Erneut anmelden!',
            });
        }
    };
}
// check if logged in
app.get('/login', isLoggedIn(), function (req, res) {
    res.status(200).send({
        message: 'User ist weiterhin eingeloggt!',
        // @ts-ignore
        user: req.session.user
    });
});
// Login
app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var data = [email, cryptoJS.SHA512(password).toString()];
    var query = 'SELECT * FROM cargonaut WHERE email = ? AND password = ?;';
    queryPromise(query, data).then(function (rows) {
        if (rows.length === 1) {
            var user = {
                id: rows[0].id,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                email: rows[0].email,
                birthday: rows[0].geburtsdatum,
            };
            // @ts-ignore
            req.session.user = user;
            res.status(200).send({
                message: 'Logged in!',
                user: user
            });
        }
        else {
            res.status(401).send({
                message: 'Login information is not correct!',
            });
        }
    })["catch"](function (err) {
        res.status(500).send({
            message: 'Datenbank Fehler: ' + err,
        });
    });
});
// Logout
app.post('/logout', function (req, res) {
    // @ts-ignore
    delete req.session.user;
    res.status(200).send({
        message: 'Logged out!',
    });
});
// Registrieren
app.post('/cargonaut', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, password, email, geburtsdatum, strasse, hausnr, plz, ort, adresse, dataAdress, queryAdress;
    return __generator(this, function (_a) {
        firstname = req.body.firstname;
        lastname = req.body.lastname;
        password = cryptoJS.SHA512(req.body.password).toString();
        email = req.body.email;
        geburtsdatum = (req.body.geburtsdatum).toLocaleString();
        strasse = req.body.street;
        hausnr = req.body.number;
        plz = req.body.plz;
        ort = req.body.city;
        if (strasse && hausnr && plz && ort) {
            dataAdress = [
                strasse,
                hausnr,
                plz,
                ort,
            ];
            queryAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
            queryPromise(queryAdress, dataAdress).then(function (result) {
                adresse = result.insertId;
                var data = [
                    firstname,
                    lastname,
                    password,
                    email,
                    geburtsdatum,
                    adresse,
                ];
                var query = 'INSERT INTO cargonaut (id, firstname, lastname, password, email, geburtsdatum, adresse) VALUES (NULL, ?, ?, ?, ?, ?, ?);';
                queryPromise(query, data).then(function (results) {
                    res.status(201).send({
                        message: 'Neuer Nutzer erstellt!',
                        createdUser: results.insertId,
                    });
                })["catch"](function () {
                    res.status(400).send({
                        message: 'Fehler beim Erstellen eines Nutzers. Email Adresse bereits vergeben.',
                    });
                });
            });
        }
        else {
            res.status(400).send({
                message: 'Nicht alle Felder ausgefüllt.',
            });
        }
        return [2 /*return*/];
    });
}); });
/*****************************************************************************
 *           Cargonaut       *
 *****************************************************************************/
// Get Cargonaut -> Alle Infos eines Cargonauten
app.get('/cargonaut/:id', function (req, res) {
    var id = req.params.id;
    var data = [
        id,
    ];
    var query = 'SELECT * FROM cargonaut WHERE id = ?;';
    queryPromise(query, data).then(function (results) {
        if (results.length > 0) {
            res.status(200).send({
                user: results[0],
            });
        }
        else {
            res.status(400).send({
                message: 'Der User konnte nicht gefunden werden!',
            });
        }
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten des Users!',
        });
    });
});
// Put Cargonaut
app.put('/cargonaut/:id', function (req, res) {
    var id = Number(req.params.id);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var data = [
        firstname,
        lastname,
        email,
        id,
    ];
    var query = 'UPDATE cargonaut SET firstname = ?, lastname = ?, email = ? WHERE id = ?;';
    queryPromise(query, data).then(function (result) {
        if (result.affectedRows > 0) {
            res.status(200).send({
                message: "Updated user " + id,
            });
        }
        else {
            res.status(400).send({
                message: 'Keinen User zum bearbeiten gefunden.',
            });
        }
    })["catch"](function () {
        res.status(400).send({
            message: 'Der User konnte nicht bearbeitet werden.',
        });
    });
});
/*****************************************************************************
 *           Fahrzeuge       *
 *****************************************************************************/
// add new vehicle
app.post('/vehicle/:owner', function (req, res) {
    // Read data from request body
    var art = req.body.type;
    var anzahlSitzplaetze = req.body.seats;
    var besitzer = req.params.owner;
    var laenge = req.body.length;
    var breite = req.body.width;
    var hoehe = req.body.height;
    var kommentar = req.body.comment;
    var modell = req.body.model;
    var ladeflaeche;
    if (art && anzahlSitzplaetze && hoehe && breite && laenge && besitzer && modell) {
        var dataLade = [
            laenge,
            breite,
            hoehe,
        ];
        var queryLade = 'INSERT INTO laderaum (id, ladeflaeche_laenge_cm, ladeflaeche_breite_cm, ladeflaeche_hoehe_cm) VALUES (NULL, ?, ?, ?);';
        queryPromise(queryLade, dataLade).then(function (result) {
            ladeflaeche = result.insertId;
            var data = [
                art,
                anzahlSitzplaetze,
                ladeflaeche,
                besitzer,
                modell,
                kommentar
            ];
            // tslint:disable-next-line:max-line-length
            var query = 'INSERT INTO fahrzeug (id, art, anzahl_sitzplaetze, ladeflaeche, besitzer, modell, kommentar) VALUES (NULL, ?, ?, ?, ?, ?, ?);';
            queryPromise(query, data).then(function (results) {
                res.status(201).send({
                    message: 'Neues Fahrzeug erstellt!',
                    createdVehicle: results.insertId,
                });
            })["catch"](function () {
                res.status(400).send({
                    message: 'Fehler beim Erstellen eines Fahrzeugs.',
                });
            });
        })["catch"](function () {
            res.status(400).send({
                message: 'Fehler beim Erstellen eines Laderaums.',
            });
        });
    }
    else {
        res.status(400).send({
            message: 'Nicht alle Felder ausgefüllt.',
        });
    }
});
// get vehicle -> Alle Infos eines Fahrzeugs
app.get('/vehicle/:id', function (req, res) {
    var id = req.params.id;
    var data = [
        id,
    ];
    var query = 'SELECT * FROM fahrzeug WHERE id = ?;';
    var query2 = 'SELECT * FROM laderaum WHERE id =?;';
    queryPromise(query, data).then(function (results) {
        if (results.length > 0) {
            var data2 = [results[0].ladeflaeche];
            queryPromise(query2, data2).then(function (results2) {
                res.status(200).send({
                    vehicle: results[0],
                    hold: results2[0]
                });
            })["catch"](function () {
                res.status(400).send({
                    message: 'Fehler beim Getten des Fahrzeugs!',
                });
            });
        }
        else {
            res.status(400).send({
                message: 'Das Fahrzeug konnte nicht gefunden werden!',
            });
        }
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten des Fahrzeugs!',
        });
    });
});
// get vehicles from cargonaut -> Alle Fahrzeuge, die ein bestimmter Cargonaut erstellt hat
app.get('/vehicles/:cargonaut', function (req, res) {
    var cargonaut = req.params.cargonaut;
    var data = [
        cargonaut,
    ];
    var query = 'SELECT * FROM fahrzeug WHERE besitzer = ?;';
    queryPromise(query, data).then(function (results) {
        res.status(200).send({
            vehicles: results,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten der Fahrzeuge!',
        });
    });
});
// delete vehicle
app["delete"]('/vehicle/:id', function (req, res) {
    var id = Number(req.params.id);
    var query = 'DELETE FROM fahrzeug WHERE id = ?;';
    queryPromise(query, [id]).then(function (result) {
        // Check if database response contains at least one entry
        if (result.affectedRows === 1) {
            res.status(200).send({
                message: "Fahrzeug gel\u00F6scht",
            });
        }
        else {
            res.status(400).send({
                message: 'Fahrzeug konnte nicht gefunden werden!',
            });
        }
    })["catch"](function (err) {
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
app.post('/post/:cargonaut', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cargonaut, startzeit, ankunftZeit, bezahlungsart, fahrzeug, anzahlSitzplaetze, beschreibung, typ, preis, strasse, hausnr, plz, ort, zielStrasse, zielHausnr, zielPlz, zielStadt, laenge, breite, hoehe, standort, zielort, laderaum, dataAdress, queryAdress;
    return __generator(this, function (_a) {
        cargonaut = Number(req.params.cargonaut);
        startzeit = req.body.post.start_time;
        ankunftZeit = req.body.post.end_time;
        bezahlungsart = req.body.post.payment;
        fahrzeug = req.body.post.vehicle.id;
        anzahlSitzplaetze = req.body.post.seats;
        beschreibung = req.body.post.description;
        typ = req.body.post.type;
        preis = req.body.post.price;
        strasse = req.body.post.startlocation.street;
        hausnr = req.body.post.startlocation.housenumber;
        plz = req.body.post.startlocation.plz;
        ort = req.body.post.startlocation.city;
        zielStrasse = req.body.post.endlocation.street;
        zielHausnr = req.body.post.endlocation.housenumber;
        zielPlz = req.body.post.endlocation.plz;
        zielStadt = req.body.post.endlocation.city;
        laenge = req.body.post.hold.length;
        breite = req.body.post.hold.width;
        hoehe = req.body.post.hold.height;
        // create startort
        if (cargonaut && startzeit && ankunftZeit && bezahlungsart &&
            fahrzeug && anzahlSitzplaetze && typ && preis && strasse &&
            hausnr && plz && ort && zielStrasse && zielHausnr && zielPlz &&
            zielStadt && laenge && breite && hoehe) {
            dataAdress = [
                strasse,
                hausnr,
                plz,
                ort,
            ];
            queryAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
            queryPromise(queryAdress, dataAdress).then(function (result) {
                standort = result.insertId;
                // create Zielort
                var zielDataAdress = [
                    zielStrasse,
                    zielHausnr,
                    zielPlz,
                    zielStadt,
                ];
                var queryZielAdress = 'INSERT INTO standort (id, strasse, hausnummer, plz, ort) VALUES (NULL, ?, ?, ?, ?);';
                queryPromise(queryZielAdress, zielDataAdress).then(function (results) {
                    zielort = results.insertId;
                    // create laderaum
                    var dataLaderaum = [
                        laenge,
                        breite,
                        hoehe,
                    ];
                    var queryLade = 'INSERT INTO laderaum (id, ladeflaeche_laenge_cm, ladeflaeche_breite_cm, ladeflaeche_hoehe_cm) VALUES (NULL, ?, ?, ?);';
                    queryPromise(queryLade, dataLaderaum).then(function (resu) {
                        laderaum = resu.insertId;
                        // create Post
                        var data = [
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
                        var query = 'INSERT INTO `post` (`id`, `standort`, `zielort`, `startzeit`, `ankunft_zeit`, `bezahlungsart`, `laderaum`, `fahrzeug`, `gebucht`, `anzahl_sitzplaetze`, `beschreibung`, `typ`, `verfasser`, `status`, `preis`) ' +
                            'VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, \'0\',?, ?, ?, ?, \'\', ?);';
                        queryPromise(query, data).then(function (resultPost) {
                            res.status(201).send({
                                message: 'Neuer Post erstellt!',
                                createdVehicle: resultPost.insertId,
                            });
                        });
                    })["catch"](function () {
                        res.status(400).send({
                            message: 'Fehler beim Erstellen eines Zielortes.',
                        });
                    });
                })["catch"](function () {
                    res.status(400).send({
                        message: 'Fehler beim Erstellen eines Standorts.',
                    });
                });
            });
        }
        else {
            res.status(400).send({
                message: 'Nicht alle Felder ausgefüllt.',
            });
        }
        return [2 /*return*/];
    });
}); });
// get specific Post -> Alle Infos zu speziellem Post
app.get('/post/:id', function (req, res) {
    var id = req.params.id;
    var data = [
        id,
    ];
    var query = 'SELECT * FROM post WHERE id = ?;';
    queryPromise(query, data).then(function (results) {
        res.status(200).send({
            post: results,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten des Posts!',
        });
    });
});
// get all Posts -> Alle Posts
app.get('/posts', function (req, res) {
    /*
    const parameter: string = req.params.parameter;
  
    switch (parameter){
      case '':
        break;
    }
  */
    var query = 'SELECT * FROM post WHERE gebucht = ?;';
    queryPromise(query, [0]).then(function (results) {
        res.status(200).send({
            posts: results,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten der Posts!',
        });
    });
});
// Update post
app.put('/post/:id', function (req, res) {
    var id = Number(req.params.id);
    var startzeit = req.body.startzeit;
    var ankunftZeit = req.body.ankunftZeit;
    var bezahlungsart = req.body.bezahlungsart;
    var fahrzeug = req.body.vehicle;
    var anzahlSitzplaetze = req.body.anzahlSitzplaetze;
    var beschreibung = req.body.beschreibung;
    var preis = req.body.price;
    var data = [
        startzeit,
        ankunftZeit,
        bezahlungsart,
        fahrzeug,
        anzahlSitzplaetze,
        beschreibung,
        preis,
        id
    ];
    var query = 'UPDATE post SET startzeit = ?, ankunft_zeit = ?, bezahlungsart = ?, fahrzeug = ?, anzahl_sitzplaetze = ?, beschreibung = ?, preis = ? WHERE id = ?;';
    queryPromise(query, data).then(function () {
        res.status(200).send({
            message: "Updated post " + id,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Der Post konnte nicht bearbeitet werden.',
        });
    });
});
/*****************************************************************************
 *           buchung       * //
 *****************************************************************************/
// Post Buchung
app.post('/buchung/:kaeufer', function (req, res) {
    // Read data from request body
    var kaeufer = Number(req.params.kaeufer);
    var laenge = req.body.length;
    var breite = req.body.width;
    var hoehe = req.body.height;
    var anzahlSitzplaetze = req.body.seats;
    var post = req.body.post;
    var ladeflaeche;
    if (kaeufer && laenge && breite && hoehe && anzahlSitzplaetze && post) {
        var dataLade = [
            laenge,
            breite,
            hoehe,
        ];
        var queryLade = 'INSERT INTO laderaum (id, ladeflaeche_laenge_cm, ladeflaeche_breite_cm, ladeflaeche_hoehe_cm) VALUES (NULL, ?, ?, ?);';
        queryPromise(queryLade, dataLade).then(function (result) {
            ladeflaeche = result.insertId;
            var data = [
                kaeufer,
                ladeflaeche,
                anzahlSitzplaetze,
                post,
            ];
            var query = 'INSERT INTO buchung (id, gebucht_von, ladeflaeche, anzahl_sitzplaetze, post) VALUES (NULL, ?, ?, ?, ?);';
            queryPromise(query, data).then(function (results) {
                res.status(201).send({
                    message: 'Gebucht!'
                });
            })["catch"](function () {
                res.status(400).send({
                    message: 'Fehler beim buchen.',
                });
            });
        })["catch"](function () {
            res.status(400).send({
                message: 'Fehler beim Erstellen eines Laderaums.',
            });
        });
    }
    else {
        res.status(400).send({
            message: 'Nicht alle Felder ausgefüllt.',
        });
    }
});
// Get buchungen/:cargonaut -> Alle Buchungen, die ein bestimmter Cargonaut gebucht ODER VON IHM GEBUCHT WURDEN
app.get('/buchungen/:cargonaut', function (req, res) {
    var cargonaut = Number(req.params.cargonaut);
    var data = [
        cargonaut,
        cargonaut,
    ];
    var query = 'SELECT * FROM buchung, post WHERE buchung.post = post.id AND (buchung.gebucht_von = ? OR post.verfasser = ?)';
    queryPromise(query, data).then(function (results) {
        res.status(200).send({
            buchungen: results,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten des Posts!',
        });
    });
});
/*****************************************************************************
 *           Bewertung       * //
 *****************************************************************************/
// Post Bewertung
app.post('/bewertung/:verfasser', function (req, res) {
    // Read data from request body
    var verfasser = Number(req.params.verfasser);
    var fahrt = req.body.fahrt;
    var punktzahl = req.body.punktzahl;
    var kommentar = req.body.kommentar;
    if (verfasser && fahrt && punktzahl && kommentar) {
        var data = [
            verfasser,
            fahrt,
            punktzahl,
            kommentar,
        ];
        var query = 'INSERT INTO bewertung (id, verfasser, fahrt, punktzahl, kommentar) VALUES (NULL, ?, ?, ?, ?);';
        queryPromise(query, data).then(function (results) {
            res.status(201).send({
                message: 'Bewertung abgegeben!'
            });
        })["catch"](function () {
            res.status(400).send({
                message: 'Fehler beim abgeben der Bewertung.',
            });
        });
    }
    else {
        res.status(400).send({
            message: 'Nicht alle Felder ausgefüllt.',
        });
    }
});
// get bewertungen -> Alle Bewertungen, die zu Fahrten eines bestimmten Cargonauten geschrieben wurden
app.get('/bewertungen/:cargonaut', function (req, res) {
    var cargonaut = Number(req.params.cargonaut);
    var data = [
        cargonaut,
    ];
    var query = 'SELECT * FROM bewertung, post WHERE bewertung.fahrt = post.id AND post.verfasser = ?';
    queryPromise(query, data).then(function (results) {
        res.status(200).send({
            bewertungen: results,
        });
    })["catch"](function () {
        res.status(400).send({
            message: 'Fehler beim getten der Bewertungen!',
        });
    });
});
//# sourceMappingURL=server.js.map