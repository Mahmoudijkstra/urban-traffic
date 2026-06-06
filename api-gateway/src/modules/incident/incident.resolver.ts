import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { Incident, CreateIncidentInput, UpdateIncidentStatusInput } from './incident.models';

const INCIDENT_URL = process.env.INCIDENT_SERVICE_URL || 'http://localhost:3004/graphql';
const INC_FIELDS = `id title description type status latitude longitude reportedBy resolvedAt createdAt updatedAt`;

@Resolver()
@UseGuards(JwtAuthGuard)
export class IncidentResolver {
  constructor(private http: HttpClientService) {}

  @Mutation(() => Incident)
  async createIncident(@Args('input') input: CreateIncidentInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(INCIDENT_URL, `
      mutation CreateIncident($input: CreateIncidentInput!) {
        createIncident(input: $input) { ${INC_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.createIncident;
  }

  @Query(() => [Incident])
  async incidents(
    @Args('type', { nullable: true }) type: string,
    @Args('status', { nullable: true }) status: string,
    @Context() ctx: any,
  ) {
    const data = await this.http.graphqlRequest(INCIDENT_URL, `
      query Incidents($type: String, $status: String) {
        incidents(type: $type, status: $status) { ${INC_FIELDS} }
      }
    `, { type, status }, ctx.req.token);
    return data.incidents;
  }

  @Query(() => Incident)
  async incident(@Args('id') id: string, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(INCIDENT_URL, `
      query Incident($id: String!) {
        incident(id: $id) { ${INC_FIELDS} }
      }
    `, { id }, ctx.req.token);
    return data.incident;
  }

  @Mutation(() => Incident)
  async updateIncidentStatus(@Args('input') input: UpdateIncidentStatusInput, @Context() ctx: any) {
    const data = await this.http.graphqlRequest(INCIDENT_URL, `
      mutation UpdateIncidentStatus($input: UpdateIncidentStatusInput!) {
        updateIncidentStatus(input: $input) { ${INC_FIELDS} }
      }
    `, { input }, ctx.req.token);
    return data.updateIncidentStatus;
  }

  @Query(() => [Incident])
  async activeIncidents(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(INCIDENT_URL, `
      query { activeIncidents { ${INC_FIELDS} } }
    `, {}, ctx.req.token);
    return data.activeIncidents;
  }
}
