import { Controller, Get, Headers, UnauthorizedException, Post, Body} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

@Get('verify-token')
async verifyToken(@Headers('authorization') authorization: string): Promise<{ message: string }> {
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedException('Invalid token format');
  }

  const token = authorization.split(' ')[1];

  try {
    const decodedToken = await this.authService.verifyToken(token);

    if (this.authService.isTokenExpired(decodedToken)) {
      return { message: 'Token has expired' };
    }

    return { message: 'Token verified successfully' };
  } catch (error) {
    console.log(error.message);
    throw new UnauthorizedException('Invalid token');
  }
}

}
