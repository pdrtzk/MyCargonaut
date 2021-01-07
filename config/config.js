"use strict";
exports.__esModule = true;
exports.Configuration = void 0;
var Configuration = /** @class */ (function () {
    function Configuration() {
    }
    Configuration.mysqlOptions = {
        database: 'cargonaut_db',
        host: 'localhost',
        password: '',
        user: 'root',
    };
    Configuration.sessionOptions = {
        cookie: {
            maxAge: 5 * 60 * 1000,
        },
        name: 'MaCookie',
        resave: true,
        rolling: true,
        saveUninitialized: true,
        secret: 'Secret',
    };
    return Configuration;
}());
exports.Configuration = Configuration;
//# sourceMappingURL=config.js.map