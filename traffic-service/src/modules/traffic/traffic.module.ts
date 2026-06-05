import { Module } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficResolver } from './traffic.resolver';

@Module({
  providers: [TrafficService, TrafficResolver],
})
export class TrafficModule {}
