import { Injectable } from '@nestjs/common'
import { SchedulingRepository } from '@/core/repositories/SchedulingRepository'
import { Scheduling } from '@/core/entities/Scheduling'
import { UseCase } from '@/shared/UseCase'

export interface GetSchedulingsByDoctorInput {
    userId: string
}

@Injectable()
export class GetSchedulingsByDoctorUseCase
    implements UseCase<GetSchedulingsByDoctorInput, Scheduling[]> {
    constructor(private readonly repo: SchedulingRepository) { }

    async exec(input: GetSchedulingsByDoctorInput): Promise<Scheduling[]> {
        return this.repo.findByDoctorId(input.userId)
    }
}
