const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

// dummy data
const resolvers = {
  Query: {
    info: () => `This is the api of codernews`,
    feed: async (_parent, _args, context, _info) => {
        return context.prisma.link.findMany()
    },
  },
  Mutation: {
      post: (_parent, args, context, _info) => {
          const newLink = context.prisma.link.create({
              data: {
                  url: args.url,
                  description: args.description
              }
          })

          return newLink
      }
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.gql"), "utf8"),
  resolvers,
  context: {
      prisma
  }
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
