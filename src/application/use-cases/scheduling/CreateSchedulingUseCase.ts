import { Injectable } from '@nestjs/common'
import { UseCase } from '@/shared/UseCase'
import { SchedulingRepository } from '@/core/repositories/SchedulingRepository'
import { ApplicationError } from '@/shared/Errors'
import { Scheduling } from '@/core/entities/Scheduling'
import { AvailableSlotRepository } from '@/core/repositories/AvaibleSlotRepository'
import { SchedulingErrorType } from '@/shared/errors/SchedulingErrorType'
import { AvailableSlotErrorType } from '@/shared/errors/AvaibleSlotErrorType'

interface CreateSchedulingInput {
    patientId: string
    slotId: string
}

@Injectable()
export class CreateSchedulingUseCase implements UseCase<CreateSchedulingInput, void> {
    constructor(
        private readonly schedulingRepo: SchedulingRepository,
        private readonly slotRepo: AvailableSlotRepository
    ) { }

    async exec(input: CreateSchedulingInput): Promise<void> {
        const slot = await this.slotRepo.findById(input.slotId)

        if (!slot) {
            throw new ApplicationError({
                message: 'Horário não encontrado',
                code: 404,
                type: AvailableSlotErrorType.SLOT_NOT_FOUND
            })
        }

        const exists = await this.schedulingRepo.hasConflict(slot.doctorId, slot.dateTime)

        if (exists) {
            throw new ApplicationError({
                message: 'Este horário já foi agendado',
                code: 409,
                type: SchedulingErrorType.SCHEDULING_CONFLICT
            })
        }

        const scheduling = new Scheduling({
            id: crypto.randomUUID(),
            doctorId: slot.doctorId,
            patientId: input.patientId,
            dateTime: slot.dateTime
        })

        await this.schedulingRepo.save(scheduling)
    }
}
