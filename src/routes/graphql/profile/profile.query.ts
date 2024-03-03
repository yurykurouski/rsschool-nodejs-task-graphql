import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql"
import { IContext } from "../types/context.js"
import { ProfileType } from "./profile.type.js"
import { UUIDType } from "../types/uuid.js"


export const profile: GraphQLFieldConfig<void, IContext, { id: string }> = {
  type: ProfileType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }, { prisma }: IContext) => {
    const profile = await prisma.profile.findUnique({ where: { id } });

    return profile;
  }
}

export const profiles = {
  type: new GraphQLList(ProfileType),
  resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
    const profiles = await prisma.profile.findMany();

    return profiles;
  }
}
