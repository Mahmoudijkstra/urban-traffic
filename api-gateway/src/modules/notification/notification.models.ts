import { ObjectType, Field, ID, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsEnum } from 'class-validator';

export enum NotificationType {
  INCIDENT = 'INCIDENT', TRAFFIC = 'TRAFFIC', SYSTEM = 'SYSTEM', ALERT = 'ALERT',
}
registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
export class Notification {
  @Field(() => ID) id: string;
  @Field() userId: string;
  @Field() title: string;
  @Field() message: string;
  @Field(() => NotificationType) type: NotificationType;
  @Field() isRead: boolean;
  @Field({ nullable: true }) readAt?: Date;
  @Field() createdAt: Date;
}

@InputType()
export class SendNotificationInput {
  @Field() @IsString() userId: string;
  @Field() @IsString() title: string;
  @Field() @IsString() message: string;
  @Field(() => NotificationType) @IsEnum(NotificationType) type: NotificationType;
}
