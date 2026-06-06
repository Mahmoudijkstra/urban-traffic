import { ObjectType, Field, ID, Float, Int, InputType, registerEnumType } from '@nestjs/graphql';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export enum TrafficDensity {
  LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH',
}
registerEnumType(TrafficDensity, { name: 'TrafficDensity' });

@ObjectType()
export class TrafficMeasurement {
  @Field(() => ID) id: string;
  @Field() zoneId: string;
  @Field(() => Int) vehicleCount: number;
  @Field(() => Float) avgSpeed: number;
  @Field(() => TrafficDensity) density: TrafficDensity;
  @Field() measuredAt: Date;
}

@ObjectType()
export class TrafficZone {
  @Field(() => ID) id: string;
  @Field() name: string;
  @Field({ nullable: true }) description?: string;
  @Field(() => Float) latitude: number;
  @Field(() => Float) longitude: number;
  @Field(() => Float) radius: number;
  @Field() createdAt: Date;
  @Field(() => [TrafficMeasurement], { nullable: true }) measurements?: TrafficMeasurement[];
  @Field(() => TrafficDensity, { nullable: true }) currentDensity?: TrafficDensity;
}

@InputType()
export class CreateZoneInput {
  @Field() @IsString() name: string;
  @Field({ nullable: true }) @IsString() @IsOptional() description?: string;
  @Field(() => Float) @IsNumber() latitude: number;
  @Field(() => Float) @IsNumber() longitude: number;
  @Field(() => Float, { nullable: true }) @IsNumber() @IsOptional() radius?: number;
}

@InputType()
export class MeasureTrafficInput {
  @Field() @IsString() zoneId: string;
  @Field(() => Int) @IsNumber() vehicleCount: number;
  @Field(() => Float) @IsNumber() avgSpeed: number;
}
