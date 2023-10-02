import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Session } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.session.jwt_token;

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      const decodedToken = this.jwtService.verify(token);
      const isTokenValid = this.isTokenValid(decodedToken);
      if (!isTokenValid) {
        throw new UnauthorizedException('Token invalid');
      }

      request.user = decodedToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private isTokenValid(decodedToken: any): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTimestamp;
  }
}
