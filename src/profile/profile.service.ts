import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateProfileInput } from './inputs/update-profile.input.js';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getSingleton() {
    return await this.prisma.profile.findFirst({
      include: { skills: true, experience: true, projects: true },
    });
  }

  async update(input: UpdateProfileInput) {
    const { id, ...data } = input;

    try {
      return await this.prisma.profile.update({
        where: { id },
        data,
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Profile with ID: ${id} not found`);
        }
      }

      throw error;
    }
  }
}
