import { Module } from '@nestjs/common';
import { IncidentResolver } from './incident.resolver';

@Module({ providers: [IncidentResolver] })
export class IncidentModule {}
