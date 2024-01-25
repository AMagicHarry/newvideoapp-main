import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './entities/job.entity'

// auth service
//configuration of config
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'

@Module({
  imports: [ConfigModule.forRoot(),
  JwtModule.register({
    secret: process.env.JWT_SECRET, // Replace with your actual JWT secret key
    signOptions: { expiresIn: '1d' }, // Replace with your desired token expiration time
  }),
  MongooseModule.forFeature([{ name: 'Job', schema: JobSchema }]),],
  controllers: [JobsController],
  providers: [JobsService, AuthService, JwtStrategy]
})
export class JobsModule { }
