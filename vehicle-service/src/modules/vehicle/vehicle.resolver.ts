import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle, GpsPosition } from './vehicle.models';
import { CreateVehicleInput, RecordPositionInput } from './vehicle.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Resolver(() => Vehicle)
@UseGuards(JwtAuthGuard)
export class VehicleResolver {
  constructor(private vehicleService: VehicleService) {}

  @Mutation(() => Vehicle)
  async createVehicle(@Args('input') input: CreateVehicleInput) {
    return this.vehicleService.createVehicle(input);
  }

  @Query(() => [Vehicle])
  async vehicles() {
    return this.vehicleService.getVehicles();
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string) {
    return this.vehicleService.getVehicleById(id);
  }

  @Mutation(() => GpsPosition)
  async recordPosition(@Args('input') input: RecordPositionInput) {
    return this.vehicleService.recordPosition(input);
  }

  @Query(() => [GpsPosition])
  async vehicleHistory(@Args('vehicleId') vehicleId: string) {
    return this.vehicleService.getVehicleHistory(vehicleId);
  }

  @Mutation(() => [GpsPosition])
  async simulateVehiclePositions(
    @Args('vehicleId') vehicleId: string,
    @Args('count', { type: () => Int, defaultValue: 10 }) count: number,
  ) {
    return this.vehicleService.simulatePositions(vehicleId, count);
  }
}
