import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVehicleInput, RecordPositionInput } from './vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(private prisma: PrismaService) {}

  async createVehicle(input: CreateVehicleInput) {
    return this.prisma.vehicle.create({ data: input });
  }

  async getVehicles() {
    return this.prisma.vehicle.findMany({
      orderBy: { createdAt: 'desc' },
      include: { positions: { orderBy: { timestamp: 'desc' }, take: 1 } },
    });
  }

  async getVehicleById(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: { positions: { orderBy: { timestamp: 'desc' } } },
    });
    if (!vehicle) throw new NotFoundException(`Vehicle ${id} not found`);
    return vehicle;
  }

  async recordPosition(input: RecordPositionInput) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: input.vehicleId } });
    if (!vehicle) throw new NotFoundException(`Vehicle ${input.vehicleId} not found`);

    return this.prisma.gpsPosition.create({
      data: {
        vehicleId: input.vehicleId,
        latitude: input.latitude,
        longitude: input.longitude,
        speed: input.speed || 0,
      },
    });
  }

  async getVehicleHistory(vehicleId: string) {
    return this.prisma.gpsPosition.findMany({
      where: { vehicleId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async simulatePositions(vehicleId: string, count: number = 10) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id: vehicleId } });
    if (!vehicle) throw new NotFoundException(`Vehicle ${vehicleId} not found`);

    const baseLat = 36.8065 + (Math.random() - 0.5) * 0.1;
    const baseLng = 10.1815 + (Math.random() - 0.5) * 0.1;

    const positions = [];
    for (let i = 0; i < count; i++) {
      const pos = await this.prisma.gpsPosition.create({
        data: {
          vehicleId,
          latitude: baseLat + (Math.random() - 0.5) * 0.01,
          longitude: baseLng + (Math.random() - 0.5) * 0.01,
          speed: Math.random() * 120,
          timestamp: new Date(Date.now() - i * 60000),
        },
      });
      positions.push(pos);
    }
    return positions;
  }
}
