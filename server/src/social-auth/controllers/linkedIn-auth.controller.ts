import { Controller, Get, Req, Res, HttpStatus } from '@nestjs/common';
import { LinkedInAuthService } from 'src/social-auth/services/linkedin-auth.service';
import { LinkedInStrategy } from 'src/social-auth/strategies/linkedin-auth.strategy';
import { UsersService } from 'src/users/users.service';

@Controller('auth/linkedin')
export class LinkedInAuthController {
  constructor(
    private readonly linkedInAuthService: LinkedInAuthService,
    private readonly linkedInStrategy: LinkedInStrategy,
    private readonly userService: UsersService,
  ) { }

  @Get()
  // @UseGuards(AuthGuard('linkedin'))
  async linkedInAuth() {
  }

  @Get('callback')
  async linkedInAuthRedirect(@Req() req, @Res() res) {
    try {
      const authorizationCode = req.query.code
      const tokenResponse = await this.linkedInStrategy.exchangeAuthorizationCodeForToken(authorizationCode);
      const userData = await this.linkedInStrategy.getUserInfo(tokenResponse.access_token)
      if (userData) {
        const jwtToken = await this.userService.socialLogin(userData);
        // return jwtToken;
        console.log("jwttokken linkedinn", jwtToken)
        return res.status(HttpStatus.OK).json({ ...jwtToken });

      } else {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: 'User not authenticated',
        });
      }
    } catch (error) {
      console.error('Error in linkedInAuthRedirect:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }
}