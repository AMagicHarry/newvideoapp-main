import { Controller, Post, Body, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { ForgetPasswordService } from '../services/forget-password.service';
import { SendLinkDto } from '../dtos/send-link.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { VerifyTokenDto } from '../dtos/verify-token.dto';

@Controller('forget-password')
export class ForgetPasswordController {
  constructor(private readonly forgetPasswordService: ForgetPasswordService) {}

  @Post('send-link')
  async sendResetLink(@Body() sendLinkDto: SendLinkDto): Promise<{ message: string }> {
    try {
      await this.forgetPasswordService.sendResetLink(sendLinkDto.email);
      return { message: 'Reset link sent successfully' };

    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      }
      throw new BadRequestException('Failed to send reset link');
    }
  }

  @Post('verify-token')
  async verifyToken(
    @Body() verifyTokenDto: VerifyTokenDto,
  ): Promise<{ message: string; email: string }> {
    try {
      return await this.forgetPasswordService.verifyToken(
        verifyTokenDto.email,
        verifyTokenDto.token,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Token not found or expired');
      }
      throw new BadRequestException('Failed to verify token');
    }
  }

  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<{message: string}> {
    try {
      await this.forgetPasswordService.changePassword(changePasswordDto);
      return { message: 'Password successfully changed' };
 
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('User not found');
      } else if (error instanceof ConflictException) {
        throw new ConflictException('Failed to change password');
      }
      throw new BadRequestException('Failed to change password');
    }
  }
}
