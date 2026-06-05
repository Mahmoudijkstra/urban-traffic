import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { TrafficDensity } from './traffic.models';

@InputType()
export class CreateZoneInput {
  @Field()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field(() => Float)
  @IsNumber()
  latitude: number;

  @Field(() => Float)
  @IsNumber()
  longitude: number;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  radius?: number;
}

@InputType()
export class MeasureTrafficInput {
  @Field()
  @IsString()
  zoneId: string;

  @Field(() => Int)
  @IsNumber()
  vehicleCount: number;

  @Field(() => Float)
  @IsNumber()
  avgSpeed: number;
}
