import { PrismaClient, User } from '@prisma/client';


export interface IContext {
  prisma: PrismaClient;
  dataUsers?: IUserSubscriptions[];
}

export interface IUserSubscriptions extends User {
  userSubscribedTo?: TUserSubscription[];
  subscribedToUser?: TUserSubscription[];
}

type TUserSubscription = {
  subscriberId: string;
  authorId: string;
}
