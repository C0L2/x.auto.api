import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

require("dotenv").config();

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  /*  constructor(private authService: AuthService, configService: ConfigService) {
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
   } */
}
