// notification.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { NotificationGateway } from '../gateways/notification.gateway';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationGateway: NotificationGateway) {}

  @Get(':message')
  sendNotification(@Param('message') message: string): string {
    this.notificationGateway.handleNotification(message);
    return 'Notification sent: ' + message;
  }
}
