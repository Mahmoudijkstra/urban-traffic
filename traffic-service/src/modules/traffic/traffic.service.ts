import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateZoneInput, MeasureTrafficInput } from './traffic.dto';
import { TrafficDensity } from './traffic.models';

@Injectable()
export class TrafficService {
  constructor(private prisma: PrismaService) {}

  private calculateDensity(vehicleCount: number, avgSpeed: number): TrafficDensity {
    // Simple density classification
    if (vehicleCount > 50 || avgSpeed < 20) return TrafficDensity.HIGH;
    if (vehicleCount > 20 || avgSpeed < 50) return TrafficDensity.MEDIUM;
    return TrafficDensity.LOW;
  }

  async createZone(input: CreateZoneInput) {
    return this.prisma.trafficZone.create({ data: { ...input, radius: input.radius || 500 } });
  }

  async getZones() {
    const zones = await this.prisma.trafficZone.findMany({
      include: {
        measurements: { orderBy: { measuredAt: 'desc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    });

    return zones.map(zone => ({
      ...zone,
      currentDensity: zone.measurements[0]?.density || null,
    }));
  }

  async getZoneById(id: string) {
    const zone = await this.prisma.trafficZone.findUnique({
      where: { id },
      include: { measurements: { orderBy: { measuredAt: 'desc' } } },
    });
    if (!zone) throw new NotFoundException(`Zone ${id} not found`);
    return {
      ...zone,
      currentDensity: zone.measurements[0]?.density || null,
    };
  }

  async measureTraffic(input: MeasureTrafficInput) {
    const zone = await this.prisma.trafficZone.findUnique({ where: { id: input.zoneId } });
    if (!zone) throw new NotFoundException(`Zone ${input.zoneId} not found`);

    const density = this.calculateDensity(input.vehicleCount, input.avgSpeed);

    return this.prisma.trafficMeasurement.create({
      data: {
        zoneId: input.zoneId,
        vehicleCount: input.vehicleCount,
        avgSpeed: input.avgSpeed,
        density,
      },
    });
  }

  async getCongestedZones() {
    const zones = await this.getZones();
    return zones.filter(z => z.currentDensity === TrafficDensity.HIGH);
  }

  async getZoneMeasurements(zoneId: string) {
    return this.prisma.trafficMeasurement.findMany({
      where: { zoneId },
      orderBy: { measuredAt: 'desc' },
    });
  }
}
