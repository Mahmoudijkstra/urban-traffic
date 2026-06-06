import { ObjectType, Field, ID, Float, Int, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum VehicleType {
  CAR = 'CAR', TRUCK = 'TRUCK', MOTORCYCLE = 'MOTORCYCLE', BUS = 'BUS', EMERGENCY = 'EMERGENCY',
}
registerEnumType(VehicleType, { name: 'VehicleType' });

@ObjectType()
export class GpsPosition {
  @Field(() => ID) id: string;
  @Field() vehicleId: string;
  @Field(() => Float) latitude: number;
  @Field(() => Float) longitude: number;
  @Field(() => Float) speed: number;
  @Field() timestamp: Date;
}

@ObjectType()
export class Vehicle {
  @Field(() => ID) id: string;
  @Field() licensePlate: string;
  @Field() brand: string;
  @Field() model: string;
  @Field(() => VehicleType) type: VehicleType;
  @Field() ownerId: string;
  @Field() isActive: boolean;
  @Field() createdAt: Date;
  @Field(() => [GpsPosition], { nullable: true }) positions?: GpsPosition[];
}

@InputType()
export class CreateVehicleInput {
  @Field() @IsString() licensePlate: string;
  @Field() @IsString() brand: string;
  @Field() @IsString() model: string;
  @Field(() => VehicleType) @IsEnum(VehicleType) type: VehicleType;
  @Field() @IsString() ownerId: string;
}

@InputType()
export class RecordPositionInput {
  @Field() @IsString() vehicleId: string;
  @Field(() => Float) @IsNumber() latitude: number;
  @Field(() => Float) @IsNumber() longitude: number;
  @Field(() => Float, { nullable: true }) @IsNumber() @IsOptional() speed?: number;
}
