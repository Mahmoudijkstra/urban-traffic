import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { TrafficZone, TrafficMeasurement } from './traffic.models';
import { CreateZoneInput, MeasureTrafficInput } from './traffic.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Resolver(() => TrafficZone)
@UseGuards(JwtAuthGuard)
export class TrafficResolver {
  constructor(private trafficService: TrafficService) {}

  @Mutation(() => TrafficZone)
  async createTrafficZone(@Args('input') input: CreateZoneInput) {
    return this.trafficService.createZone(input);
  }

  @Query(() => [TrafficZone])
  async trafficZones() {
    return this.trafficService.getZones();
  }

  @Query(() => TrafficZone)
  async trafficZone(@Args('id') id: string) {
    return this.trafficService.getZoneById(id);
  }

  @Mutation(() => TrafficMeasurement)
  async measureTraffic(@Args('input') input: MeasureTrafficInput) {
    return this.trafficService.measureTraffic(input);
  }

  @Query(() => [TrafficZone])
  async congestedZones() {
    return this.trafficService.getCongestedZones();
  }

  @Query(() => [TrafficMeasurement])
  async zoneMeasurements(@Args('zoneId') zoneId: string) {
    return this.trafficService.getZoneMeasurements(zoneId);
  }
}
