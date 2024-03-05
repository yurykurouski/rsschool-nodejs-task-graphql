import {
  GraphQLFieldConfig,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql"
import { PostType } from "./post.type.js"
import { UUIDType } from "../types/uuid.js";
import { IContext } from "../types/context.js";
import { TPostDTO } from "../types/dto.js";


const postInputFields = {
  authorId: { type: GraphQLString },
  content: { type: UUIDType },
  title: { type: UUIDType },
}

const CreatePostInput = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: () => postInputFields,
});

export const createPost: GraphQLFieldConfig<
  GraphQLObjectType, IContext, { dto: TPostDTO }
> = {
  type: PostType,
  args: {
    dto: { type: new GraphQLNonNull(CreatePostInput) }
  },
  resolve: async (_: unknown, { dto }, { prisma }) => {
    const newPost = await prisma.post.create({ data: dto });

    return newPost;
  }
}