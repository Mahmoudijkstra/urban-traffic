import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

export enum IncidentType {
  ACCIDENT = 'ACCIDENT',
  ROADWORK = 'ROADWORK',
  ROAD_CLOSED = 'ROAD_CLOSED',
  TRAFFIC_JAM = 'TRAFFIC_JAM',
}

export enum IncidentStatus {
  REPORTED = 'REPORTED',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

registerEnumType(IncidentType, { name: 'IncidentType' });
registerEnumType(IncidentStatus, { name: 'IncidentStatus' });

@ObjectType()
export class Incident {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => IncidentType)
  type: IncidentType;

  @Field(() => IncidentStatus)
  status: IncidentStatus;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  reportedBy: string;

  @Field({ nullable: true })
  resolvedAt?: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
