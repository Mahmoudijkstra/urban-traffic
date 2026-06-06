import { Module } from '@nestjs/common';
import { TrafficResolver } from './traffic.resolver';

@Module({ providers: [TrafficResolver] })
export class TrafficModule {}
