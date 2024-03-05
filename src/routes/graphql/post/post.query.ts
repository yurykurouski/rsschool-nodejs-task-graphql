import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from "graphql";
import { IContext } from "../types/context.js";
import { PostType } from "./post.type.js";
import { UUIDType } from "../types/uuid.js";


export const post: GraphQLFieldConfig<void, IContext, { id: string }> = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_: unknown, { id }, { prisma }: IContext) => {
    const memberType = await prisma.post.findUnique({ where: { id } });

    return memberType;
  }
}

export const posts = {
  type: new GraphQLList(PostType),
  resolve: async (_: unknown, __: unknown, { prisma }: IContext) => {
    const memberType = await prisma.post.findMany();

    return memberType;
  }
}
