import { InputType, Field, Float } from '@nestjs/graphql';
import { IsString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { VehicleType } from './vehicle.models';

@InputType()
export class CreateVehicleInput {
  @Field()
  @IsString()
  licensePlate: string;

  @Field()
  @IsString()
  brand: string;

  @Field()
  @IsString()
  model: string;

  @Field(() => VehicleType)
  @IsEnum(VehicleType)
  type: VehicleType;

  @Field()
  @IsString()
  ownerId: string;
}

@InputType()
export class RecordPositionInput {
  @Field()
  @IsString()
  vehicleId: string;

  @Field(() => Float)
  @IsNumber()
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  longitude: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  speed?: number;
}
