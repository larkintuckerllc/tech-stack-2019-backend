import cors from 'cors';
import express from 'express';
import env from './apis/env';

const hello = env.HELLO_VALUE;
const app = express();
app.use(cors());
app.get('/', (req, res) => res.send({ hello }));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
