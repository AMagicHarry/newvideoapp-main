import { Module } from '@nestjs/common';
import { NotificationGateway } from './gateways/notification.gateway';
import { NotificationController } from './controllers/notification.controller';

@Module({
    imports: [],
    controllers: [NotificationController],
    providers: [NotificationGateway],
  
    exports:[NotificationGateway]
})
export class NotificationsModule {}
