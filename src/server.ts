import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
  algorithms: ['RS256'],
  audience: 'http://localhost:3000',
  issuer: 'https://larkintuckerllc.auth0.com/',
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://larkintuckerllc.auth0.com/.well-known/jwks.json`,
    rateLimit: true,
  }),
});

const app = express();
app.use(cors());
app.get('/', checkJwt, (req, res) => res.send({ hello: 'world' }));
app.listen(3000, () => console.log('Example app listening on port 3000!'));
