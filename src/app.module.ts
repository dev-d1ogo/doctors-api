import { AuthModule } from '@/application/modules/auth.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule]

})
export class AppModule { }
