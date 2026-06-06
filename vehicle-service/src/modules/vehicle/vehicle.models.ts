import { ObjectType, Field, ID, Float, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';

export enum VehicleType {
  CAR = 'CAR',
  TRUCK = 'TRUCK',
  MOTORCYCLE = 'MOTORCYCLE',
  BUS = 'BUS',
  EMERGENCY = 'EMERGENCY',
}

registerEnumType(VehicleType, { name: 'VehicleType' });

@ObjectType()
export class GpsPosition {
  @Field(() => ID)
  id: string;

  @Field()
  vehicleId: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  speed: number;

  @Field(() => GraphQLISODateTime)
  timestamp: Date;
}

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id: string;

  @Field()
  licensePlate: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field(() => VehicleType)
  type: VehicleType;

  @Field()
  ownerId: string;

  @Field()
  isActive: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [GpsPosition], { nullable: true })
  positions?: GpsPosition[];
}
