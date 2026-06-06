import { Module, Global } from '@nestjs/common';
import { HttpClientService } from './http-client.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Global()
@Module({
  providers: [HttpClientService, JwtAuthGuard],
  exports: [HttpClientService, JwtAuthGuard],
})
export class CommonModule {}
