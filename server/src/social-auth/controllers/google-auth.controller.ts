import { Controller, Get, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { GoogleAuthService } from '../services/google-auth.service';
import { GoogleStrategy } from '../strategies/google-auth.stategy';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
@Controller('auth/google')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService,
    private readonly userService: UsersService,
    private readonly googleStrategy: GoogleStrategy) { }

  @Get('')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('callback')
  async googleAuthRedirect(@Req() req, @Res() res) {
    const accessToken = req.query.code
    const { data } = await this.googleStrategy.getUserData(accessToken);
    const jwtToken = await this.userService.socialLogin(data);
    return res.status(HttpStatus.OK).json({ ...jwtToken });
  }
}