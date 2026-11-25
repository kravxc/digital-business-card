import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileModel } from './models/profile.model.js';
import { UpdateProfileInput } from './inputs/update-profile.input.js';
import { ApiKeyGuard } from '../auth/guards/api-key.guard.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    description: 'Получить профиль по ID',
    nullable: true,
  })
  async profile(@Args('id') id: string) {
    return this.profileService.getProfile(id);
  }

  @UseGuards(ApiKeyGuard)
  @Mutation(() => ProfileModel, { description: 'Обновить профиль' })
  async updateProfile(@Args('input') input: UpdateProfileInput) {
    return this.profileService.update(input);
  }
}
