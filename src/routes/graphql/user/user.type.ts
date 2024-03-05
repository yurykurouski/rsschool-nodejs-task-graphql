import { GraphQLFloat, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { IContext, IUserSubscriptions } from "../types/context.js";
import { User } from "@prisma/client";
import { PostType } from "../post/post.type.js";
import { ProfileType } from "../profile/profile.type.js";
import { UUIDType } from "../types/uuid.js";


export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, _: unknown, { prisma }: IContext) => {
        const posts = await prisma.post.findMany({ where: { authorId: id } });

        return posts;
      }
    },
    profile: {
      type: ProfileType ,
      resolve: async ({ id }: User, _: unknown, { prisma }: IContext) => {
        const profile = await prisma.profile.findUnique({ where: { userId: id } });

        return profile;
      }
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve(
        { id }: IUserSubscriptions,
        _: unknown,
        { prisma, dataUsers }: IContext,
      ) {
        if (dataUsers?.length) {
          const user = dataUsers.find((user) => user.id === id);

          return user ? user.subscribedToUser : null;
        }

        const users = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });

        return users;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(
        { id }: IUserSubscriptions,
        _: unknown,
        { prisma, dataUsers }: IContext,
      ) {
        if (dataUsers?.length) {
          const user = dataUsers.find((user) => user.id === id);

          return user ? user.subscribedToUser : null;
        }

        const users = await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });

        return users;
      },
    },
  })
});
