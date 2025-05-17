import { AvailableSlotRepositoryPrisma } from '@/adapters/infra/prisma/AvaibleSlotPrismaRepository'
import { DoctorController } from '@/application/controller/DoctorController'
import { AuthMiddleware } from '@/application/middleware/auth-middleware'
import { CreateAvailableSlotUseCase } from '@/application/use-cases/available-slot/CreateAvaibleSlot'
import { GetAvailableSlotsByDoctorUseCase } from '@/application/use-cases/available-slot/GetAvailableSlotsByDoctorUseCase'
import { AvailableSlotRepository } from '@/core/repositories/AvaibleSlotRepository'
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'


@Module({
    controllers: [DoctorController],
    providers: [
        CreateAvailableSlotUseCase,
        GetAvailableSlotsByDoctorUseCase,
        { provide: AvailableSlotRepository, useClass: AvailableSlotRepositoryPrisma }
    ]
})
export class MedicoModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes({ path: 'medicos/:id/horarios', method: RequestMethod.POST })
    }
}
