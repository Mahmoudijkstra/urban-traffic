import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
// import GraphQLJSON from 'graphql-type-json';

export enum NotificationType {
  INCIDENT = 'INCIDENT',
  TRAFFIC = 'TRAFFIC',
  SYSTEM = 'SYSTEM',
  ALERT = 'ALERT',
}

registerEnumType(NotificationType, { name: 'NotificationType' });

@ObjectType()
export class Notification {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  isRead: boolean;

  @Field({ nullable: true })
  readAt?: Date;

  @Field()
  createdAt: Date;
}
