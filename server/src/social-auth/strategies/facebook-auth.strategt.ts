import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get('FACEBOOK_CLIENT_ID'),
      clientSecret: configService.get('FACEBOOK_CLIENT_SECRET'),
      callbackURL: configService.get('FACEBOOK_CALLBACK_URL'),
      passReqToCallback: true,
      profileFields: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    


    // try {
    //   const userData = await this.fetchUserData(accessToken);
    //   payload.user = { ...payload.user, ...userData };

    //   // Log the Facebook access token and user data if needed
    //   console.log('Facebook Access Token:', accessToken);
    //   console.log('User Data from Facebook:', userData);

      // done(null, payload);
    // } catch (error) {
    //   console.error(`Error fetching additional user data: ${error.message}`);
    //   done(null, payload); // Handle the error gracefully, you might want to improve error handling
    // }
  }


  async fetchUserData(accessToken: string): Promise<any> {
    
    try {
      const response = await axios.get('https://graph.facebook.com/v13.0/me', {
        params: {
            access_token: accessToken,
            authorized:'granted',
            fields: 'id,name,email,picture'
        }
    })

      return response.data;
    } catch (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }
  }
}

