// auth/forget-password/forget-password.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgetPasswordController } from './controllers/forget-password.controller';
import { ForgetPasswordService } from './services/forget-password.service';
import { NodemailerService } from './services/nodemailer.service';
import { ForgetPassword, ForgetPasswordSchema } from './entities/forget-password.entity';
import { UserSchema, User } from 'src/users/entities/user.entity';
import { AuthService } from '../auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ForgetPassword.name, schema: ForgetPasswordSchema },
      {name: User.name, schema: UserSchema },
    ]),
    UsersModule,JwtModule
  ],
  controllers: [ForgetPasswordController],
  providers: [ForgetPasswordService, NodemailerService, AuthService],
})
export class ForgetPasswordModule {}
