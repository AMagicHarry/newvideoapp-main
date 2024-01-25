import { Injectable,} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/entities/user.entity'
import * as bcrypt from 'bcrypt';

@Injectable()
export class LinkedInAuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async linkedInCreate({
    name,
    email,
    password,
    birthdate,
    location,
    companyName,
  }): Promise<UserDocument> {
    try {
      let user = await this.userModel.findOne({ email });
  
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        user = await this.userModel.create({
          name,
          email,
          password: hashedPassword,
          birthdate,
          location,
          companyName,
        });
  
      }
  
      return user;
    } catch (error) {
      console.error('Error in findOrCreate:', error);
      throw error;
    }
  }
}

