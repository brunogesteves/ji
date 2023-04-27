import { Query, Resolver } from 'type-graphql';

import { GameplayModel } from '../dtos/models/gameplay-models';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Resolver()
export class GameplayResolver {
  @Query(() => [GameplayModel])
  async getAllGameplay() {
    try {
      let allGameplay = await prisma.post.findMany({
        where: {
          gameplay: true,
        },
      });

      if (allGameplay) {
        return allGameplay;
      } else {
      }
    } catch (error) {
      console.log('erro', error);
    }
  }
}
