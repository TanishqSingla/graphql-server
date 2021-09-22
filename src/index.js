const { ApolloServer } = require("apollo-server");
const fs = require('fs');
const path = require("path");

// dummy data
const links = [{
    id: "link-0",
    description: "This is the first feed on codernews",
    url: "localhost:4000/post"
}]

const resolvers = {
    Query: {
        info: () => `This is the api of codernews`,
        feed: () => links
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length

            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(links)
            return link
        }
    }
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
    resolvers
})

server.listen().then(({ url }) => console.log(`Server is running at ${url}`))