import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TrafficModule } from './modules/traffic/traffic.module';
import { IncidentModule } from './modules/incident/incident.module';
import { NotificationModule } from './modules/notification/notification.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '24h' },
    }),
    CommonModule,
    AuthModule,
    VehicleModule,
    TrafficModule,
    IncidentModule,
    NotificationModule,
  ],
})
export class AppModule {}
