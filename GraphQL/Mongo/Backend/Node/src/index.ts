import { MONGODB_URL, PORT } from "./config/config";
var express = require("express")
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose")
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authResolvers } from './Resolvers/AuthResolvers';

const fs = require('fs');
const path = require('path');
const cors = require('cors')
var app = express()

const schemaFile = path.join(__dirname, 'Schema/UserSchema.graphql');
const typeDefs = fs.readFileSync(schemaFile, 'utf8');
const schemaAuth = makeExecutableSchema({ typeDefs, authResolvers } as any);

app.use(cors({ origin: '*' }))

app.use('/auth', graphqlHTTP({
  schema: schemaAuth,
  graphiql: true
}));

mongoose.connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Database Connected and Listening at Port ${PORT}`)
    );
  })
  .catch((error: any) => {
    console.log("Database error:", error.message);
  });