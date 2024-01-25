import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GoogleAuthService } from '../services/google-auth.service';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly googleAuthService: GoogleAuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }


  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails, photos } = profile;


    const user = await this.googleAuthService.googleLogin(emails[0].value, name, profile._json.location || null);

    done(null, user);
  }
  
  async getUserData(accessToken: string): Promise<any> {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const response = await axios.get(url, { headers });

      return response
    } catch (error) {
      throw new Error('Failed to fetch user data from Google.');
    }
  }

}