import { Module } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { IncidentResolver } from './incident.resolver';

@Module({
  providers: [IncidentService, IncidentResolver],
})
export class IncidentModule {}
