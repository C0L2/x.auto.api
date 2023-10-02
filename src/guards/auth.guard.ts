import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Session } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('request.session  ', request.session)

    // Accesați token-ul JWT din sesiune (în acest exemplu, presupunem că este stocat într-un câmp numit 'jwt_token')
    const token = request.session.jwt_token;

    if (!token) {
      throw new UnauthorizedException('Token missing');
    }

    try {
      // Verificați token-ul JWT folosind serviciul JwtService
      const decodedToken = this.jwtService.verify(token);

      // Verificați dacă token-ul este încă valid (puteți verifica expirarea aici)
      const isTokenValid = this.isTokenValid(decodedToken);
      if (!isTokenValid) {
        throw new UnauthorizedException('Token invalid');
      }

      // Setați user-ul în request pentru a putea fi accesat ulterior în controller
      request.user = decodedToken;

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  private isTokenValid(decodedToken: any): boolean {
    // Aici puteți implementa logica pentru verificarea expirării sau a altor condiții suplimentare ale token-ului
    // De exemplu, puteți verifica data de expirare din token
    const currentTimestamp = Math.floor(Date.now() / 1000); // Timestamp curent în secunde
    return decodedToken.exp > currentTimestamp; // Verificați dacă token-ul este încă valid
  }
}
