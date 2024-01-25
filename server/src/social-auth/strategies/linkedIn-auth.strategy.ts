import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-linkedin-oauth2';
import { ConfigService } from '@nestjs/config';
import { LinkedInAuthService } from 'src/social-auth/services/linkedin-auth.service';
import axios from 'axios';

type VerifyCallback = (error: any, user?: any, info?: any) => void;

@Injectable()
export class LinkedInStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor(
    private readonly linkedInAuthService: LinkedInAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['openid', 'profile', 'w_member_social', 'email'],
      passReqToCallback: true,
    });
  }

  // async validate(
  //   accessToken: string,
  //   refreshToken: string,
  //   profile: Profile,
  //   done: VerifyCallback,
  // ): Promise<any> {
  //   try {
  //     const { displayName, emails } = profile;

  //     if (!displayName || !emails ) {
  //       return done(new UnauthorizedException('Invalid profile data'), null);
  //     }

  //     // const user = await this.linkedInAuthService.findOrCreate({
  //     //   name: displayName,
  //     //   email: emails[0].value,
  //     //   password: 12345, 
  //     //   birthdate: null,
  //     //   location: null, 
  //     //   companyName: null, 
  //     // });
  //     // await user.save(); 

  //     // done(null, user);
  //   } catch (error) {
  //     console.error('Error in LinkedIn Strategy:', error);
  //     done(error, null);
  //   }
  // }

  async exchangeAuthorizationCodeForToken(authorizationCode): Promise<any> {
    try {

      const response = await axios.post(
        'https://www.linkedin.com/oauth/v2/accessToken',

        {

          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: process.env.LINKEDIN_CALLBACK_URL,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }


      );

      return response.data;
    } catch (error) {
      console.error('Error exchanging authorization code for access token:', error.message);
      throw new UnauthorizedException('Failed to exchange authorization code for access token');
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { name, email } = response.data;

      const user = await this.linkedInAuthService.linkedInCreate({
        name,
        email,
        password: '12345',
        birthdate: null,
        location: null,
        companyName: null,
      });



      return response.data;
    } catch (error) {
      console.error('Error fetching user information from LinkedIn API:', error.message);
      throw new UnauthorizedException('Failed to fetch user information from LinkedIn API');
    }
  }

}
