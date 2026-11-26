import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileModel } from './models/profile.model.js';
import { UpdateProfileInput } from './inputs/update-profile.input.js';
import { ApiKeyGuard } from '../auth/guards/api-key.guard.js';
import { NotFoundError } from 'rxjs';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    description: 'Получить профиль',
  })
  async getProfile() {
    const profile = await this.profileService.getSingleton();
    if (!profile) throw new NotFoundException('Profile not initialized');
    return profile;
  }

  @UseGuards(ApiKeyGuard)
  @Mutation(() => ProfileModel, { description: 'Обновить профиль' })
  async updateProfile(@Args('input') input: UpdateProfileInput) {
    return this.profileService.update(input);
  }
}
