"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var linq_fns_1 = require("linq-fns");
var admin = require("firebase-admin");
var serviceAccount = require('../../serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fshare-film-sharing.firebaseio.com'
});
var db = admin.database();
var cmlRepo = new linq_fns_1.FireBaseQueryale(db, "commentlize.cmls");
var CmlWorker = /** @class */ (function () {
    function CmlWorker() {
    }
    CmlWorker.prototype.push = function (cml) {
        cmlRepo.add(cml, true);
    };
    CmlWorker.prototype.get = function (host, idPost) {
        return cmlRepo
            .getQuery()
            .where(function (x) { return x.host == host && x.idPost == idPost; })
            .toList();
    };
    return CmlWorker;
}());
exports.CmlWorker = CmlWorker;
//# sourceMappingURL=cml.js.map