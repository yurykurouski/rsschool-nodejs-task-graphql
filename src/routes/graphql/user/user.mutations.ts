import {
  GraphQLFieldConfig,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import { UserType } from "./user.type.js"
import { IContext } from "../types/context.js"
import { User } from "@prisma/client";


export const createUser: GraphQLFieldConfig<
  GraphQLObjectType, IContext, { data: User }
> = {
  type: UserType,
  args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) }
  },
  resolve: async (_: unknown, { data }, { prisma }) => {
    const newUser = await prisma.user.create({ data });

    return newUser;
  }
}

const ChangeUserType = new GraphQLInputObjectType({
  name: 'ChangeUserType',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});

export const changeUser: GraphQLFieldConfig<
  GraphQLObjectType, IContext, { id: string, data: User, name: string }
> = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    data: { type: ChangeUserType },
  },
  resolve: async (_: unknown, { id, data }, { prisma }) => {
    const user = await prisma.user.update({ where: { id }, data });

    return user;
  }
}
