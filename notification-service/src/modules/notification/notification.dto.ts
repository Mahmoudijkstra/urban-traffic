import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from './notification.models';

@InputType()
export class SendNotificationInput {
  @Field()
  @IsString()
  userId: string;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  message: string;

  @Field(() => NotificationType)
  @IsEnum(NotificationType)
  type: NotificationType;
}
