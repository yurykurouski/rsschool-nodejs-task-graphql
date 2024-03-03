import { GraphQLEnumType } from "graphql";


export enum MemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export const MemberIdTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeId.BASIC },
    business: { value: MemberTypeId.BUSINESS },
  }
});
