import { Body, Controller, Post, Get, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp({
      email: signUpDto.email,
      fullName: signUpDto.fullName,
      password: signUpDto.password,
    });
  }

  @Get('profile')
  getProfile(@Request() req: any) {
    // This would normally use a JwtAuthGuard
    return { message: 'Profile endpoint' };
  }
}


