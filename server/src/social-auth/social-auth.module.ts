import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleAuthController } from './controllers/google-auth.controller';
import { GoogleAuthService } from './services/google-auth.service';
import { User, UserSchema } from '../users/entities/user.entity';
import { GoogleStrategy } from './strategies/google-auth.stategy';
import { FacebookAuthController } from './controllers/facebook-auth.controller';
import { FacebookAuthService } from './services/facebook-auth.service';
import { FacebookStrategy } from './strategies/facebook-auth.strategt'
import { LinkedInAuthService } from 'src/social-auth/services/linkedin-auth.service';
import { LinkedInAuthController } from 'src/social-auth/controllers/linkedin-auth.controller';  
import { LinkedInStrategy } from 'src/social-auth/strategies/linkedin-auth.strategy';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
        PassportModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule, UsersModule
    ],
    controllers: [GoogleAuthController, FacebookAuthController, LinkedInAuthController],
    providers: [GoogleAuthService, GoogleStrategy, FacebookAuthService, FacebookStrategy, LinkedInAuthService, LinkedInStrategy],
    exports: [GoogleAuthService], 
})
export class SocialAuthModule {}
