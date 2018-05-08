import { ICml } from "./icml";
import { CmlModel } from "./cml.model";
import { FireBaseQueryale } from 'linq-fns';
import * as admin from 'firebase-admin';

const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fshare-film-sharing.firebaseio.com'
});

const db = admin.database();
const cmlRepo = new FireBaseQueryale<CmlModel>(db, "commentlize.cmls");

export class CmlWorker implements ICml {

    push(cml: CmlModel): void {
        cmlRepo.add(cml, true);
    }

    get(host: string, idPost: string): Promise<CmlModel[]> {
        return cmlRepo
            .getQuery()
            .where(x => x.host == host && x.idPost == idPost)
            .toList();
    }
}