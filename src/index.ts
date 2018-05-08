import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { CmlWorker } from './lib/cml';

const app = express();
const port = process.env.PORT || 3000;
const worker = new CmlWorker();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/cml', (req, res) => {
    worker.push(req.body);
    res.json(true);
});

app.post('/get', async (req, res) => {
    const query: { host: string, idPost: string } = req.body;
    const cmls = await worker.get(query.host, query.idPost);
    res.json(cmls);
})

app.get('/', async (req, res) => {
    res.json(true);
})

app.listen(port, () => console.log(`Server running at ${port}`));


