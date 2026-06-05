import { ObjectType, Field, ID, Float, Int, registerEnumType } from '@nestjs/graphql';

export enum TrafficDensity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

registerEnumType(TrafficDensity, { name: 'TrafficDensity' });

@ObjectType()
export class TrafficMeasurement {
  @Field(() => ID)
  id: string;

  @Field()
  zoneId: string;

  @Field(() => Int)
  vehicleCount: number;

  @Field(() => Float)
  avgSpeed: number;

  @Field(() => TrafficDensity)
  density: TrafficDensity;

  @Field()
  measuredAt: Date;
}

@ObjectType()
export class TrafficZone {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  radius: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [TrafficMeasurement], { nullable: true })
  measurements?: TrafficMeasurement[];

  @Field(() => TrafficDensity, { nullable: true })
  currentDensity?: TrafficDensity;
}
