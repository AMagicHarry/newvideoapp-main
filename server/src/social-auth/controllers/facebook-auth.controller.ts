import { Controller, Get, Req, Res, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookStrategy } from '../strategies/facebook-auth.strategt';
import axios from 'axios';
import { config } from 'dotenv';
import { UsersService } from 'src/users/users.service';
config();
@Controller('auth/facebook')
export class FacebookAuthController {
  constructor(
    private readonly facebookStrategy: FacebookStrategy,
    private readonly userService: UsersService,
  ) {}
  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(): Promise<any> {
    return HttpStatus.OK;
  }
  @Get('callback')
  async facebookAuthRedirect(@Req() req, @Res() res) {
    try {
      const AUTHORIZATION_CODE = req.query.code;
      const response: any = await axios.get(
        'https://graph.facebook.com/v18.0/oauth/access_token',
        {
          params: {
            client_id: process.env.FACEBOOK_CLIENT_ID,
            redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
            client_secret: process.env.FACEBOOK_CLIENT_SECRET,
            code: AUTHORIZATION_CODE,
          },
        },
      );
      const userInfo = await axios.get('https://graph.facebook.com/v18.0/me', {
        params: {
          access_token: response.data.access_token,
          fields: 'id,name,email',
        },
      });
      const socialLoginResult = await this.userService.socialLogin(userInfo.data);
      return res.status(HttpStatus.OK).json({ ...socialLoginResult });
    } catch (error) {
      console.error(error);
      console.error('Error in facebookAuthRedirect:', error.message);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      });
    }
  }
}