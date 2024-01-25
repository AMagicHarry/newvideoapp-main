import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessagingService } from '../services/messaging.service';
import { SendMessageDto } from '../dtos/send-message.dto';
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Get('/initialize-user/:userId')
  async initializeUser(@Param('userId') userId: string) {
    try {
      const { user, token } = await this.messagingService.initializeUser(
        userId,
      );
      return { user, token };
    } catch (error) {
      return { error: 'Failed to initialize user.' };
    }
  }

  @Get('/create-channel/:channelId/:member1/:member2/:createdByUserId')
  async createChannel(
    @Param('channelId') channelId: string,
    @Param('member1') member1: string,
    @Param('member2') member2: string,
    @Param('createdByUserId') createdByUserId: string,
  ) {
    try {
      const channel = await this.messagingService.createChannel(
        channelId,
        [member1, member2],
        createdByUserId,
      );
      return {
        channelId: channel.cid,
      };
    } catch (error) {
      console.log(error.message);
      return { error: 'Failed to create channel.' };
    }
  }

  @Post('/send-message/:channelId/:userId')
  async sendMessage(
    @Param('channelId') channelId: string,
    @Param('userId') userId: string,
    @Body() sendMessageDto: SendMessageDto,
  ) {
    try {
      const response = await this.messagingService.sendMessageWithWebSocket(
        channelId,
        userId,
        sendMessageDto.message,
      );
      return { success: true, message: response.message };
    } catch (error) {
      console.log(error.message);
      return { error: 'Failed to send message.' };
    }
  }

  @Get('/get-messages/:channelId')
  async getMessages(@Param('channelId') channelId: string) {
    try {
      const messages = await this.messagingService.getMessages(channelId);
      return { messages };
    } catch (error) {
      console.error(`Error getting messages: ${error.message}`);
      return { error: 'Failed to get messages.' };
    }
  }

  @Get('/get-all-channels')
  async getAllChannels() {
    try {
      const channels = await this.messagingService.getAllChannels();
      return  channels ;
    } catch (error) {
      console.error(`Error getting all channels: ${error.message}`);
      return { error: 'Failed to get all channels.' };
    }
  }

}


// import { Controller, Get, Post, Body, Query  } from '@nestjs/common';
// import { MessagingService } from '../services/messaging.service';
// import { SendMessageDto } from '../dtos/send-message.dto';

// @Controller('message')
// export class MessagingController {
//   constructor(private readonly chatService: MessagingService) {}

//   @Get()
//   async getAllMessages(@Query('interviewId') interviewId: number) {
//     return this.chatService.getAllMessagesWithInterviewId(interviewId);
//   }

//   @Post('create')
//   async createChat(@Body() sendMessageDto: SendMessageDto) {
//     const savedChat = await this.chatService.createMessage(sendMessageDto);
//     return savedChat;
//   }
// }
