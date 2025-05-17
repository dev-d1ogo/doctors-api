import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { SchedulingRepository } from '@/core/repositories/SchedulingRepository'
import { SchedulingRepositoryPrisma } from '@/adapters/infra/prisma/SchedulingPrismaRepository'
import { SchedulingController } from '@/application/controller/SchedulingController'
import { GetSchedulingsByDoctorUseCase } from '@/application/use-cases/scheduling/GetSchedulingsByDoctorUseCase'
import { GetSchedulingsByPatientUseCase } from '@/application/use-cases/scheduling/GetSchedulingsByPatientUseCase'
import { AuthMiddleware } from '@/application/middleware/auth-middleware'
import { GetSchedulingsService } from '@/application/applicationServices/available-slot/GetSchedulingsService'

@Module({
    controllers: [SchedulingController],
    providers: [
        GetSchedulingsService,
        GetSchedulingsByDoctorUseCase,
        GetSchedulingsByPatientUseCase,
        { provide: SchedulingRepository, useClass: SchedulingRepositoryPrisma }
    ]
})
export class SchedulingModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: 'agendamentos', method: RequestMethod.GET })
    }
}
