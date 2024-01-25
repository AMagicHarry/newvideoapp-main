import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ForgetPassword, ForgetPasswordDocument } from '../entities/forget-password.entity';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { NodemailerService } from '../services/nodemailer.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ForgetPasswordService {
  constructor(
    @InjectModel(ForgetPassword.name) private readonly forgetPasswordModel: Model<ForgetPasswordDocument>,
    private readonly nodemailerService: NodemailerService,
    private readonly userService: UsersService, 

  ) {}

async sendResetLink(email: string): Promise<{ message: string }> {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const resetToken = this.generateResetToken();

    const forgetPassword = new this.forgetPasswordModel({
      email,
      resetToken,
    });
    await forgetPassword.save();

    await this.nodemailerService.sendMail({
      from: 'your-email@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: http://video-app/reset-password?token=${resetToken}`,
    });

    return { message: 'Reset link sent successfully' };

  }

  async verifyToken(email: string, token: string): Promise<{ message: string; email: string }> {
    const storedToken = await this.forgetPasswordModel.findOne({ email, resetToken: token });

    if (storedToken) {
      const user = await this.userService.findOne(email);
      const userEmail = user ? user.email : '';
      const expirationTime = new Date(storedToken.createdAt.getTime() + 3 * 60 * 60 * 1000);
      const currentTime = new Date();

      if (currentTime > expirationTime) {
        // Token has expired
        throw new ConflictException('Token has expired');
      }



      return { message: 'Token successfully matched', email: userEmail };

    } else {
      throw new NotFoundException('Token not found or expired');
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const userEmail = changePasswordDto.email;

    if (!userEmail) {
      throw new NotFoundException('User email not found');
    }

    try {
      await this.userService.updatePassword(userEmail, changePasswordDto.password);
      
    } catch (error) {
      throw new ConflictException('Failed to change password');
    }

  }

  private generateResetToken(): string {
    const uuid = require('uuid');
    return uuid.v4();
  }
}
