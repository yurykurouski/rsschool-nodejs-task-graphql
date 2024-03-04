import { GraphQLBoolean, GraphQLFieldConfig, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { ProfileType } from "./profile.type.js";
import { MemberIdTypeEnum } from "../member/member-id.type.js";
import { UUIDType } from "../types/uuid.js";
import { IContext } from "../types/context.js";
import { TProfileDTO } from "../types/index.js";


const profileInputFields = {
  userId: { type: UUIDType },
  memberTypeId: { type: MemberIdTypeEnum },
  isMale: { type: GraphQLBoolean },
  yearOfBirth: { type: GraphQLInt },
}

const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => profileInputFields,
});

export const createProfile: GraphQLFieldConfig<
  GraphQLObjectType, IContext, { dto: TProfileDTO }
> = {
  type: ProfileType,
  args: {
    dto: { type: new GraphQLNonNull(CreateProfileInput) },
  },
  resolve: async (_: unknown, { dto }, { prisma }) => {
    const newProfile = await prisma.profile.create({ data: dto });

    return newProfile;
  }
}


