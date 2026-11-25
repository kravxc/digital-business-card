import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const apiKey = req.headers['x-api-key'];
    const adminApiKey = this.configService.get<string>('ADMIN_API_KEY');

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    if (apiKey !== adminApiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
