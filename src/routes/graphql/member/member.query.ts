import { GraphQLList, GraphQLNonNull, GraphQLFieldConfig } from 'graphql';
import { IContext } from '../types/context.js';
import { MemberType } from './member.type.js';
import { MemberIdTypeEnum } from './member-id.type.js';


export const memberType: GraphQLFieldConfig<void, IContext, {id: string}> = {
  type: MemberType ,
  args: {
    id: { type: new GraphQLNonNull(MemberIdTypeEnum) },
  },
  resolve: async (_: unknown, { id }, { prisma }: IContext) => {
    const memberType = await prisma.memberType.findUnique({ where: { id } });
    
    return memberType;
  }
};

export const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
    const memberTypes = await prisma.memberType.findMany();

    return memberTypes;
  }
};
