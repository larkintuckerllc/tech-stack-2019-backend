import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const checkJwt = jwt({
  algorithms: ['RS256'],
  audience: 'http://your-api-endpoint',
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
app.get('/', (req, res) => res.send({ hello: 'world' }));
app.get('/auth', checkJwt, (req, res) => {
  console.log(req.user);
  res.send({ hello: 'auth' });
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
