import { UUID } from "crypto";
import { EMemberTypeId } from "../member/member-id.type.js";

export type TPostDTO = {
  authorId: string,
  content: UUID,
  title: UUID,
}

export type TProfileDTO = {
  userId: UUID,
  memberTypeId: EMemberTypeId,
  isMale: boolean,
  yearOfBirth: number,
}