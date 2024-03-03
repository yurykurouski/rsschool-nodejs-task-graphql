import { GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { MemberIdTypeEnum } from "./member-id.type.js";
import { IContext } from "../types/context.js";
import { ProfileType } from "../profile/profile.type.js";


export const MemberType = new GraphQLObjectType({
  name: 'Member',
  fields: () => ({
    id: { type: MemberIdTypeEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async ({ id }: { id: string }, _: unknown, { prisma }: IContext) => {
        const profiles = await prisma.profile.findMany({ where: { memberTypeId: id } });

        return profiles;
      },
    },
  })
});
