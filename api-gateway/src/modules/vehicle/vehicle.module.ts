import { Module } from '@nestjs/common';
import { VehicleResolver } from './vehicle.resolver';

@Module({ providers: [VehicleResolver] })
export class VehicleModule {}
