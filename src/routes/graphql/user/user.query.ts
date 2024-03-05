import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { IContext } from "../types/context.js";
import { UserType } from "./user.type.js";
import { UUIDType } from "../types/uuid.js";


export const user: GraphQLFieldConfig<void, IContext, { id: string }> = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }, { prisma }: IContext) => {
    const memberType = await prisma.user.findUnique({ where: { id } });

    return memberType;
  }
}

export const users = {
  type: new GraphQLList(UserType),
  resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
    const memberTypes = await prisma.user.findMany();

    return memberTypes;
  }
}
