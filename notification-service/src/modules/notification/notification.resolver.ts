import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.models';
import { SendNotificationInput } from './notification.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Resolver(() => Notification)
@UseGuards(JwtAuthGuard)
export class NotificationResolver {
  constructor(private notificationService: NotificationService) {}

  @Mutation(() => Notification)
  async sendNotification(@Args('input') input: SendNotificationInput) {
    return this.notificationService.sendNotification(input);
  }

  @Query(() => [Notification])
  async notifications(@Args('userId') userId: string) {
    return this.notificationService.getNotifications(userId);
  }

  @Query(() => [Notification])
  async unreadNotifications(@Args('userId') userId: string) {
    return this.notificationService.getUnreadNotifications(userId);
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('id') id: string) {
    return this.notificationService.markAsRead(id);
  }

  @Mutation(() => [Notification])
  async markAllNotificationsAsRead(@Args('userId') userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('id') id: string) {
    return this.notificationService.deleteNotification(id);
  }
}
