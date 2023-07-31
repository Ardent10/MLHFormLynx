import { userResolver } from "./resolver";
import { typeDefs } from "./typeDefs";

export const usersApi = {
  typeDefs: typeDefs,
  resolvers: userResolver,
};
