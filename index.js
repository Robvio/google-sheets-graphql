const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-undef
const typeDefs = fs.readFileSync(path.resolve(__dirname, 'sheet.graphql'), 'utf8');
const { google } = require('googleapis');
const { getValues, addRow } = require('./util');
const { ApolloServer } = require('apollo-server');

////////////////////////////////////////////////
const resolvers = {
  Query: {
    responses: async (_, args, ctx) => {
      const response = await getValues(ctx);
      return response;
    },
  },
  Mutation: {
    createResponse: async (_, { response }, ctx) => {
      const res = await addRow(ctx, response);
      return res;
    },
  },
};
////////////////////////////////////////////////

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    const auth = await google.auth.getClient({
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://docs.google.com/feeds',
        'https://spreadsheets.google.com/feeds',
      ],
    });
    return {
      auth,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
