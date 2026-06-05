import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIncidentInput, UpdateIncidentStatusInput } from './incident.dto';
import { IncidentStatus } from './incident.models';

@Injectable()
export class IncidentService {
  constructor(private prisma: PrismaService) {}

  async createIncident(input: CreateIncidentInput) {
    return this.prisma.incident.create({ data: input });
  }

  async getIncidents(type?: string, status?: string) {
    return this.prisma.incident.findMany({
      where: {
        ...(type && { type: type as any }),
        ...(status && { status: status as any }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getIncidentById(id: string) {
    const incident = await this.prisma.incident.findUnique({ where: { id } });
    if (!incident) throw new NotFoundException(`Incident ${id} not found`);
    return incident;
  }

  async updateStatus(input: UpdateIncidentStatusInput) {
    const incident = await this.prisma.incident.findUnique({ where: { id: input.id } });
    if (!incident) throw new NotFoundException(`Incident ${input.id} not found`);

    return this.prisma.incident.update({
      where: { id: input.id },
      data: {
        status: input.status,
        resolvedAt: input.status === IncidentStatus.RESOLVED ? new Date() : null,
      },
    });
  }

  async getActiveIncidents() {
    return this.prisma.incident.findMany({
      where: { status: { not: IncidentStatus.RESOLVED } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
