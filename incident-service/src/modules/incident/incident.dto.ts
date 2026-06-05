import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { IncidentType, IncidentStatus } from './incident.models';

@InputType()
export class CreateIncidentInput {
  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => IncidentType)
  @IsEnum(IncidentType)
  type: IncidentType;

  @Field(() => Float)
  @IsNumber()
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  longitude: number;

  @Field()
  @IsString()
  reportedBy: string;
}

@InputType()
export class UpdateIncidentStatusInput {
  @Field()
  @IsString()
  id: string;

  @Field(() => IncidentStatus)
  @IsEnum(IncidentStatus)
  status: IncidentStatus;
}
