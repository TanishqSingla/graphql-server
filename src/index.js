const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("apollo-server");

const { getUserId } = require("./utils");

const Query = require("./resolvers/Query");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Vote = require('./resolvers/Vote');

const prisma = new PrismaClient();

const pubsub = new PubSub();

const resolvers = { Query, Link, User, Mutation, Subscription, Vote };

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.gql"), "utf8"),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
