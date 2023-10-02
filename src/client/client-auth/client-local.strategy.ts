// local.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientAuthService } from './auth.service';

@Injectable()
export class ClientLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: ClientAuthService) {
        super({ secretOrPrivateKey: 'secretyarn' });
    }

    async validate(
        email: string,
        password: string,
    ): Promise<any> {
        const user = await this.authService.validateUser(
            email,
            password,
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
