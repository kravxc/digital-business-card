import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileInput } from './inputs/update-profile.input.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
      include: {
        skills: {
          orderBy: { sortOrder: 'asc' },
        },
        experience: {
          orderBy: { sortOrder: 'asc' },
        },
        projects: {
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
  }

  async update(input: UpdateProfileInput) {
    const { id, ...data } = input;
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
