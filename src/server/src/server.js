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
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
app.use('/*', express.static("../../../dist/MyCargonaut"));
app.listen(8080, 'localhost', function () {
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
app.get('/login', isLoggedIn(), function (req, res) {
    res.status(200).send({
        message: 'User ist weiterhin eingeloggt!',
        // @ts-ignore
        user: req.session.user
    });
});
/**
 * Login
 */
app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var data = [username, cryptoJS.SHA512(password).toString()];
    var query = 'SELECT * FROM cargonaut WHERE username = ? AND password = ?;';
    queryPromise(query, data).then(function (rows) {
        if (rows.length === 1) {
            var user = {
                id: rows[0].id,
                username: rows[0].username,
                firstname: rows[0].firstName,
                lastname: rows[0].lastName
            };
            /*rows[0].id,
                 rows[0].username,
                 rows[0].firstName,
                 rows[0].lastName,
                 new Date(rows[0].time),
                 rows[0].rights*/
            // @ts-ignore
            req.session.user = user;
            res.status(200).send({
                message: 'Logged in!',
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
/**
 * Logout
 */
app.post('/logout', function (req, res) {
    // @ts-ignore
    delete req.session.user;
    res.status(200).send({
        message: 'Logged out!',
    });
});
//# sourceMappingURL=server.js.map