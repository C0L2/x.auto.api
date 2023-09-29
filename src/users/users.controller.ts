import { CreateUserDto } from './dto/create-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoignUserDto } from './dto/login-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification/Authorization')
@Controller('auth')
export class UsersController {
  constructor(private authService: AuthService) { }

  @Post('/register')
  @UseInterceptors(SerializeInterceptor)
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.reg(
      body.first_name,
      body.second_name,
      body.father_name,
      body.email,
      body.birth_date,
      body.role,
      body.password,
    );
    return { message: 'Registered successfully', user: body };
  }

  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  @UseInterceptors(SerializeInterceptor)
  async loginUser(@Body() body: LoignUserDto, @Session() session: any) {
    const token = await this.authService.login(
      body.email,
      body.password,
      session,
    );
    const res = { message: 'Logged in successfully', access_token: token };
    return res;
  }

  @Get('/protected')
  @UseGuards(AuthGuard)
  getProtectedRoute(@Session() session: any) {
    console.log(session);
    // Verificați dacă există datele utilizatorului în sesiune
    if (session.user) {
      // Verificați dacă sesiunea conține datele utilizatorului sau alte informații relevante
      const userData = session.user;

      // Aici puteți efectua orice alte verificări suplimentare necesare, cum ar fi verificarea tokenului expirat
      // ...

      console.log('User is logged in:', userData);
      return { message: 'Welcome to the protected route!' };
    } else {
      console.log(session);
      // Utilizatorul nu este autentificat sau sesiunea nu conține datele utilizatorului
      return 'Unauthorized';
    }
  }
}
