import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UsersService,) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token is required for authorization');
    }

    try {
      const payload: any = await verify(token, process.env.JWTKEY)

      if (!payload || !payload.userId) {
        throw new UnauthorizedException('Invalid token payload');
      }
      // Assign the payload to the request object
      const findUesr = await this.userService.getUserById(payload.userId)
      if (findUesr) {
        request.user = findUesr;
        return true;
      }
      else {
        return false;
      }

    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
