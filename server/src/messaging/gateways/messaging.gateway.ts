import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, } from '@nestjs/websockets';
  import { Server, Socket  } from 'socket.io';
  
  @WebSocketGateway()
  export class MessagesGateway {
    @WebSocketServer()
    server: Server;
  
    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
      }
    
      handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
      }
    

    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: any): void {
      this.server.emit('message', data); 

    }
  }


// import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { SendMessageDto } from '../dtos/send-message.dto';
// import { MessagingService } from '../services/messaging.service';

// @WebSocketGateway()
// export class MessagesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
//   @WebSocketServer() server: Server;

//   constructor(private readonly messageService: MessagingService) {}

//   afterInit(server: Server) {
//     console.log('WebSocket Gateway initialized');
//   }

//   handleConnection(client: any, ...args: any[]) {
//     console.log(`Client connected: ${client.id}`);
//     this.sendMessageHistory(client);
//   }

//   handleDisconnect(client: any) {
//     console.log(`Client disconnected: ${client.id}`);
//   }

//   @SubscribeMessage('message')
//   async handleChatEvent(@MessageBody() messageDto: SendMessageDto): Promise<void> {

//     const savedChat = await this.messageService.createMessage(messageDto);
//     console.log(`New message received and saved: ${JSON.stringify(savedChat)}`);

//     this.server.emit('message', savedChat);

//   }

//   private async sendMessageHistory(client: any, interviewId?: number): Promise<void> {

//     const messageHistory = await this.messageService.getAllMessagesWithInterviewId(interviewId);
//     // console.log(`Sending chat history to client ${client.id}: ${JSON.stringify(messageHistory)}`);
//     console.log("Sending chat history to client ", messageHistory);


//     client.emit('chatHistory', messageHistory);

//   }
// }

  