import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { Incident } from './incident.models';
import { CreateIncidentInput, UpdateIncidentStatusInput } from './incident.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';

@Resolver(() => Incident)
@UseGuards(JwtAuthGuard)
export class IncidentResolver {
  constructor(private incidentService: IncidentService) {}

  @Mutation(() => Incident)
  async createIncident(@Args('input') input: CreateIncidentInput) {
    return this.incidentService.createIncident(input);
  }

  @Query(() => [Incident])
  async incidents(
    @Args('type', { nullable: true }) type?: string,
    @Args('status', { nullable: true }) status?: string,
  ) {
    return this.incidentService.getIncidents(type, status);
  }

  @Query(() => Incident)
  async incident(@Args('id') id: string) {
    return this.incidentService.getIncidentById(id);
  }

  @Mutation(() => Incident)
  async updateIncidentStatus(@Args('input') input: UpdateIncidentStatusInput) {
    return this.incidentService.updateStatus(input);
  }

  @Query(() => [Incident])
  async activeIncidents() {
    return this.incidentService.getActiveIncidents();
  }
}
