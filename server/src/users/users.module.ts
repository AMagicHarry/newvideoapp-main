import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';

// auth service
//configuration of config
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { MessagingModule } from 'src/messaging/messaging.module';
import { MediaModule } from 'media/media.module';
@Module({
  imports: [ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_SECRET, // Replace with your actual JWT secret key
    signOptions: { expiresIn: '1d' }, // Replace with your desired token expiration time
  }),
  MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  MessagingModule, MediaModule
],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule { }
