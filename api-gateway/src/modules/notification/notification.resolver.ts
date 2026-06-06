import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Notification, SendNotificationInput } from './notification.models';

const NOTIF_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3005/graphql';
const NOTIF_FIELDS = `id userId title message type isRead readAt createdAt`;

@Resolver()
@UseGuards(JwtAuthGuard)
export class NotificationResolver {
  constructor(private http: HttpClientService) {}

  @Mutation(() => Notification)
  async sendNotification(@Args('input') input: SendNotificationInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      mutation SendNotification($input: SendNotificationInput!) {
        sendNotification(input: $input) { ${NOTIF_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.sendNotification;
  }

  @Query(() => [Notification])
  async notifications(@Args('userId') userId: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      query Notifications($userId: String!) {
        notifications(userId: $userId) { ${NOTIF_FIELDS} }
      }
    `, { userId }, ctx.req.token);
    return data.notifications;
  }

  @Query(() => [Notification])
  async unreadNotifications(@Args('userId') userId: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      query UnreadNotifications($userId: String!) {
        unreadNotifications(userId: $userId) { ${NOTIF_FIELDS} }
      }
    `, { userId }, ctx.req.token);
    return data.unreadNotifications;
  }

  @Mutation(() => Notification)
  async markNotificationAsRead(@Args('id') id: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      mutation MarkNotificationAsRead($id: String!) {
        markNotificationAsRead(id: $id) { ${NOTIF_FIELDS} }
      }
    `, { id }, ctx.req.token);
    return data.markNotificationAsRead;
  }

  @Mutation(() => [Notification])
  async markAllNotificationsAsRead(@Args('userId') userId: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      mutation MarkAllNotificationsAsRead($userId: String!) {
        markAllNotificationsAsRead(userId: $userId) { ${NOTIF_FIELDS} }
      }
    `, { userId }, ctx.req.token);
    return data.markAllNotificationsAsRead;
  }

  @Mutation(() => Boolean)
  async deleteNotification(@Args('id') id: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(NOTIF_URL, `
      mutation DeleteNotification($id: String!) {
        deleteNotification(id: $id)
      }
    `, { id }, ctx.req.token);
    return data.deleteNotification;
  }
}
