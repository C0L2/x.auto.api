import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Session } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthClientGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        console.log(request.session)

        const token = request.session.jwt_token;
        const role_id = request.session.role_id;

        console.log('from ClientAuthGuard: ',role_id)
        if (!token) {
            throw new UnauthorizedException('Token missing');
        }

        if (role_id !== 5) {
            throw new UnauthorizedException('You are not the client, cannot access this private route')
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
