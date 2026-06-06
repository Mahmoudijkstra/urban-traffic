import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { TrafficZone, TrafficMeasurement, CreateZoneInput, MeasureTrafficInput } from './traffic.models';

const TRAFFIC_URL = process.env.TRAFFIC_SERVICE_URL || 'http://localhost:3003/graphql';
const ZONE_FIELDS = `id name description latitude longitude radius createdAt currentDensity`;
const MEAS_FIELDS = `id zoneId vehicleCount avgSpeed density measuredAt`;

@Resolver()
@UseGuards(JwtAuthGuard)
export class TrafficResolver {
  constructor(private http: HttpClientService) {}

  @Mutation(() => TrafficZone)
  async createTrafficZone(@Args('input') input: CreateZoneInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      mutation CreateTrafficZone($input: CreateZoneInput!) {
        createTrafficZone(input: $input) { ${ZONE_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.createTrafficZone;
  }

  @Query(() => [TrafficZone])
  async trafficZones(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      query { trafficZones { ${ZONE_FIELDS} measurements { ${MEAS_FIELDS} } } }
    `, {}, ctx.req.token);
    return data.trafficZones;
  }

  @Query(() => TrafficZone)
  async trafficZone(@Args('id') id: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      query TrafficZone($id: String!) {
        trafficZone(id: $id) { ${ZONE_FIELDS} measurements { ${MEAS_FIELDS} } }
      }
    `, { id }, ctx.req.token);
    return data.trafficZone;
  }

  @Mutation(() => TrafficMeasurement)
  async measureTraffic(@Args('input') input: MeasureTrafficInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      mutation MeasureTraffic($input: MeasureTrafficInput!) {
        measureTraffic(input: $input) { ${MEAS_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.measureTraffic;
  }

  @Query(() => [TrafficZone])
  async congestedZones(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      query { congestedZones { ${ZONE_FIELDS} } }
    `, {}, ctx.req.token);
    return data.congestedZones;
  }

  @Query(() => [TrafficMeasurement])
  async zoneMeasurements(@Args('zoneId') zoneId: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(TRAFFIC_URL, `
      query ZoneMeasurements($zoneId: String!) {
        zoneMeasurements(zoneId: $zoneId) { ${MEAS_FIELDS} }
      }
    `, { zoneId }, ctx.req.token);
    return data.zoneMeasurements;
  }
}
