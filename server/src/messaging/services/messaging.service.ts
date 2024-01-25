import { Injectable } from '@nestjs/common';
import { StreamChat, MessageResponse, ChannelData } from 'stream-chat';
import { config } from 'dotenv';
import { MessagesGateway } from '../gateways/messaging.gateway';



config();

@Injectable()
export class MessagingService {
  private client: StreamChat;

  constructor(private readonly messagesGateway: MessagesGateway) {
    this.client = new StreamChat(
      process.env.STREAM_CHAT_API_KEY,
      process.env.STREAM_CHAT_SECRET,
    );
  }
  async getChatTokken(userId: string) {

    const token = this.client.createToken(userId);
    return (token)

  }

  async initializeUser(userId: string) {
    const user = await this.client.upsertUser({
      id: userId,
      name: `User-${userId}`,
    });

    const token = this.client.createToken(userId);
    return { user, token };
  }

  async createChannel(
    channelId: string,
    members: string[],
    createdByUserId: string,
  ) {
    const channel = this.client.channel('messaging', channelId, {
      members,
      created_by_id: createdByUserId,
    });

    await channel.create();

    return channel;
  }


  async sendMessageWithWebSocket(
    channelId: string,
    userId: string,
    messageText: string,
    attachments: any[] = [],
    reactions: any[] = []
  ) {
    try {

      const channel = this.client.channel('messaging', channelId);
      const response = await channel.sendMessage({
        text: messageText,
        user_id: userId,
        attachments,
        reactions,
      });

      console.log('Message sent successfully:', response.message);

      this.messagesGateway.server.emit('message', response.message);

      console.log('Message emitted to WebSocket clients');

      return response;
    } catch (error) {
      console.error('Error sending message:', error.message);
      throw error;
    }
  }



  async getMessages(channelId: string): Promise<MessageResponse[]> {
    const channel = this.client.channel('messaging', channelId);

    const { messages } = await channel.query({
      messages: { limit: 100 },
    });

    return messages;
  }

  async getAllChannels(): Promise<ChannelData[]> {
    try {
      const queryResult = await this.client.queryChannels({}, { limit: -1 }) as unknown;
      const channels = this.breakCircularReferences(queryResult) as ChannelData[];

      // console.log('Query Result:', channels);

      return channels;
    } catch (error) {
      console.error(`Error getting channels: ${error.message}`);
      throw error;
    }
  }

  private breakCircularReferences(obj: any, seen: Set<any> = new Set()): any {
    if (obj && typeof obj === 'object') {
      if (seen.has(obj)) {
        return '[Circular Reference]';
      }
      seen.add(obj);

      if (Array.isArray(obj)) {
        return obj.map(item => this.breakCircularReferences(item, seen));
      }

      const result: { [key: string]: any } = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          result[key] = this.breakCircularReferences(obj[key], seen);
        }
      }
      return result;
    }
    return obj;
  }

}


// import {  BadRequestException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { SendMessageDto } from "../dtos/send-message.dto";
// import { Message } from "../entities/message.entity";

// export class MessagingService {
//   constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

//   async createMessage(sendMessageDto: SendMessageDto): Promise<Message> {
//     const { message, sent_to, sent_from, interview_id } = sendMessageDto;

//     if (sent_to === sent_from) {
//       throw new BadRequestException('Sent_to and sent_from users cannot be the same.');
//     }

//     if (!sent_to || !sent_from) {
//       throw new BadRequestException('Invalid user ID');
//     }

//     const newMessage = new this.messageModel({
//       message,
//       sent_to,
//       sent_from,
//       interview_id,
//     });

//     const savedMessage  = await newMessage.save();
//     return savedMessage ;
//   }

//   async getAllMessagesWithInterviewId(interviewId: number): Promise<{ message: Message; interview_id: string }[]> {
//     if (interviewId === undefined || interviewId === null) {
//       throw new BadRequestException('Interview ID is required');
//     }
//     const messages = await this.messageModel
//       .find({ interview_id: interviewId })
//       .populate({
//         path: 'sent_from',
//         select: '-password',
//       })
//       .populate({
//         path: 'sent_to',
//         select: '-password',
//       })
//       .populate({
//         path: 'interview_id',
//         select: '-password',
//       })

      
//       .exec();
  
//       return messages.map((message) => ({ message, interview_id: message.interview_id._id as string }));
//     }
  
// }
