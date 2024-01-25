import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<Document>,
  ) {}

  async googleLogin(
    email: string,
    name: string | { givenName: string; familyName: string },
    location: string,
  ): Promise<Document> {
    let user = await this.userModel.findOne({ email });

    if (!user) {
      const hashedPassword = await hashPassword('12345');

      if (typeof name === 'object' && name.givenName && name.familyName) {
        user = await this.userModel.create({
          email,
          name: `${name.givenName} ${name.familyName}`,
          location,
          password: hashedPassword,
        });
      } else if (typeof name === 'string') {
        user = await this.userModel.create({
          email,
          name,
          location,
          password: hashedPassword,
        });
      }
    }

    return user;
  }
}
