import { GraphQLObjectType } from "graphql";
import { changeUser, createUser } from "./user/user.mutations.js";
import { createPost } from "./post/post.mutations.js";

export const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser,
    changeUser,
    createPost,
  }),
});