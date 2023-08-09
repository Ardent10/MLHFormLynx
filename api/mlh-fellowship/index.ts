import { mlhFellowshipResolver } from "./resolver";
import { typeDefs } from "./typeDefs";

export const mlhFellowshipApi = {
  typeDefs: typeDefs,
  resolvers: mlhFellowshipResolver,
};
