import { ObjectType, Field, ID, Float, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum IncidentType {
  ACCIDENT = 'ACCIDENT', ROADWORK = 'ROADWORK', ROAD_CLOSED = 'ROAD_CLOSED', TRAFFIC_JAM = 'TRAFFIC_JAM',
}
export enum IncidentStatus {
  REPORTED = 'REPORTED', IN_PROGRESS = 'IN_PROGRESS', RESOLVED = 'RESOLVED',
}
registerEnumType(IncidentType, { name: 'IncidentType' });
registerEnumType(IncidentStatus, { name: 'IncidentStatus' });

@ObjectType()
export class Incident {
  @Field(() => ID) id: string;
  @Field() title: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => IncidentType) type: IncidentType;
  @Field(() => IncidentStatus) status: IncidentStatus;
  @Field(() => Float) latitude: number;
  @Field(() => Float) longitude: number;
  @Field() reportedBy: string;
  @Field({ nullable: true }) resolvedAt?: Date;
  @Field() createdAt: Date;
  @Field() updatedAt: Date;
}

@InputType()
export class CreateIncidentInput {
  @Field() @IsString() title: string;
  @Field({ nullable: true }) @IsString() @IsOptional() description?: string;
  @Field(() => IncidentType) @IsEnum(IncidentType) type: IncidentType;
  @Field(() => Float) @IsNumber() latitude: number;
  @Field(() => Float) @IsNumber() longitude: number;
  @Field() @IsString() reportedBy: string;
}

@InputType()
export class UpdateIncidentStatusInput {
  @Field() @IsString() id: string;
  @Field(() => IncidentStatus) @IsEnum(IncidentStatus) status: IncidentStatus;
}
