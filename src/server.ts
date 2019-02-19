import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;
const resolvers = {
  Query: {
    hello: () => 'world',
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(cors());
server.applyMiddleware({ app });
app.listen(3000, () => console.log('Example app listening on port 3000!'));
