import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Users } from '@prisma/client';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Users> {
    return this.authService.validateUser(loginDto);
  }
  @Post('register')
  async register(@Body() userData: CreateUserDto): Promise<Users> {
    return this.authService.registerUser(userData);
  }
}
