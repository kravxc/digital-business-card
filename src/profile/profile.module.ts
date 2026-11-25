import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service.js';
import { ProfileResolver } from './profile.resolver.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
