import { GraphQLEnumType } from "graphql";


export enum EMemberTypeId {
  BASIC = 'basic',
  BUSINESS = 'business',
}

export const MemberIdTypeEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: EMemberTypeId.BASIC },
    business: { value: EMemberTypeId.BUSINESS },
  }
});
