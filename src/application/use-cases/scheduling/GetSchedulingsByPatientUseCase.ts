import { Injectable } from '@nestjs/common'
import { SchedulingRepository } from '@/core/repositories/SchedulingRepository'
import { Scheduling } from '@/core/entities/Scheduling'
import { UseCase } from '@/shared/UseCase'

export interface GetSchedulingsByPatientInput {
    userId: string
}

@Injectable()
export class GetSchedulingsByPatientUseCase
    implements UseCase<GetSchedulingsByPatientInput, Scheduling[]> {
    constructor(private readonly repo: SchedulingRepository) { }

    async exec(input: GetSchedulingsByPatientInput): Promise<Scheduling[]> {
        return this.repo.findByPatientId(input.userId)
    }
}
