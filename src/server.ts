import cors from 'cors';
import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const start = async () => {
  try {
    const connection = await createConnection();
    const app = express();
    app.use(cors());
    app.get('/', (req, res) => res.send({ hello: 'world' }));
    app.listen(3000, () => console.log('Example app listening on port 3000!'));
  } catch (error) {
    console.log(error);
  }
};
start();
