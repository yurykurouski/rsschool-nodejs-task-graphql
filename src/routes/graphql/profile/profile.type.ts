import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "../types/uuid.js";

import { MemberIdTypeEnum } from "../member/member-id.type.js";
import { UserType } from "../user/user.type.js";
import { Profile } from "@prisma/client";
import { IContext } from "../types/context.js";
import { MemberType } from "../member/member.type.js";


export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberIdTypeEnum },
    user: {
      type: UserType,
      resolve: async ({ userId }: Profile, _: unknown, { prisma }: IContext) => {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        return user;
      }
    },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }: Profile, _: unknown, { prisma }: IContext) => {
        const memberType = await prisma.memberType.findUnique({ where: { id: memberTypeId } });

        return memberType;
      }
    },
  })
});
