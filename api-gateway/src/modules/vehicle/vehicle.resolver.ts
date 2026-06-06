import { Resolver, Query, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Vehicle, GpsPosition, CreateVehicleInput, RecordPositionInput } from './vehicle.models';

const VEHICLE_URL = process.env.VEHICLE_SERVICE_URL || 'http://localhost:3002/graphql';

const VEHICLE_FIELDS = `id licensePlate brand model type ownerId isActive createdAt`;
const GPS_FIELDS = `id vehicleId latitude longitude speed timestamp`;

@Resolver()
@UseGuards(JwtAuthGuard)
export class VehicleResolver {
  constructor(private http: HttpClientService) {}

  @Mutation(() => Vehicle)
  async createVehicle(@Args('input') input: CreateVehicleInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      mutation CreateVehicle($input: CreateVehicleInput!) {
        createVehicle(input: $input) { ${VEHICLE_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.createVehicle;
  }

  @Query(() => [Vehicle])
  async vehicles(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      query { vehicles { ${VEHICLE_FIELDS} positions { ${GPS_FIELDS} } } }
    `, {}, ctx.req.token);
    return data.vehicles;
  }

  @Query(() => Vehicle)
  async vehicle(@Args('id') id: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      query Vehicle($id: String!) {
        vehicle(id: $id) { ${VEHICLE_FIELDS} positions { ${GPS_FIELDS} } }
      }
    `, { id }, ctx.req.token);
    return data.vehicle;
  }

  @Mutation(() => GpsPosition)
  async recordPosition(@Args('input') input: RecordPositionInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      mutation RecordPosition($input: RecordPositionInput!) {
        recordPosition(input: $input) { ${GPS_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.recordPosition;
  }

  @Query(() => [GpsPosition])
  async vehicleHistory(@Args('vehicleId') vehicleId: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      query VehicleHistory($vehicleId: String!) {
        vehicleHistory(vehicleId: $vehicleId) { ${GPS_FIELDS} }
      }
    `, { vehicleId }, ctx.req.token);
    return data.vehicleHistory;
  }

  @Mutation(() => [GpsPosition])
  async simulateVehiclePositions(
    @Args('vehicleId') vehicleId: string,
    @Args('count', { type: () => Int, defaultValue: 10 }) count: number,
    @Context() ctx: any,
  ) {
    const data = await this.http.graphqlRequest(VEHICLE_URL, `
      mutation SimulateVehiclePositions($vehicleId: String!, $count: Int!) {
        simulateVehiclePositions(vehicleId: $vehicleId, count: $count) { ${GPS_FIELDS} }
      }
    `, { vehicleId, count }, ctx.req.token);
    return data.simulateVehiclePositions;
  }
}
