import { PrismaClient } from '@prisma/client';

export default interface AppContext {
  prisma: PrismaClient;
}
