import { GraphQLObjectType } from "graphql";
import { changeUser, createUser } from "./user/user.mutation.js";

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    changeUser,
  }),
});