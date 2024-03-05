import { GraphQLObjectType } from "graphql";
import {  memberType, memberTypes } from "./member/member.query.js";
import { post, posts } from "./post/post.query.js";
import { profile, profiles } from "./profile/profile.query.js";
import { user, users } from "./user/user.query.js";

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    memberType,
    memberTypes,
    post,
    posts,
    profile,
    profiles,
    user,
    users
  }),
});