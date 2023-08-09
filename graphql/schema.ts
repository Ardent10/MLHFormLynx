import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { makeExecutableSchema } from "@graphql-tools/schema";

// Import individual typeDefs and resolvers
import { usersApi } from "../api/index";
import { mlhFellowshipApi } from "../api/mlh-fellowship/index";
// Additional typeDefs and resolvers can be imported similarly

// Combine all the typeDefs into a single schema
const typeDefs = `#graphql
  ${usersApi.typeDefs}
  ${mlhFellowshipApi.typeDefs}
  # Add other typeDefs here if needed
  type Query {
    hello: String
  }
`;

// Combine all the resolvers into a single resolver
const resolvers = mergeResolvers([
  usersApi.resolvers,
  mlhFellowshipApi.resolvers,
]);

// Temporary resolver  Add other resolvers here if needed
const queryResolvers = {
  Query: {
    hello: () => "Welcome Professor X!",
  },
};
// Merge the query resolvers with the rest of the resolvers
mergeResolvers([queryResolvers, resolvers]);

export { typeDefs, resolvers };
