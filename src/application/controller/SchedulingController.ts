import { GetSchedulingsService } from '@/application/applicationServices/available-slot/GetSchedulingsService'
import { CreateSchedulingDTO, CreateSchedulingSchema } from '@/application/dto/create-scheduling.dto'
import { SchedulingUserDTO, SchedulingUserSchema } from '@/application/models/scheduling-user.dto'
import { CreateSchedulingUseCase } from '@/application/use-cases/scheduling/CreateSchedulingUseCase'
import { UserJwt } from '@/core/models/UserJwt'
import { RequestValidator } from '@/helpers/ErrorValidator'
import { ApplicationError } from '@/shared/Errors'
import { Body, Controller, Get, Post, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('agendamentos')
export class SchedulingController {
    constructor(private readonly getSchedulingsService: GetSchedulingsService, private readonly createSchedulingUseCase: CreateSchedulingUseCase
    ) { }

    @Get()
    async list(@Req() req: Request) {
        const validated = RequestValidator.validate<UserJwt>(req.user, SchedulingUserSchema)
        return this.getSchedulingsService.execute(validated)
    }
    @Post()
    async create(@Req() req: Request, @Body() body: any) {
        console.log(req.body, req.user)

        const user = RequestValidator.validate<SchedulingUserDTO>(req.user, SchedulingUserSchema)
        const data = RequestValidator.validate<CreateSchedulingDTO>(body, CreateSchedulingSchema)

        if (user.role !== 'PATIENT') {
            throw new ApplicationError({
                message: 'Somente pacientes podem criar agendamentos',
                code: 403,
                type: 'UNAUTHORIZED'
            })
        }

        await this.createSchedulingUseCase.exec({
            patientId: user.id,
            slotId: data.slotId
        })

        return {
            message: 'Agendamento criado com sucesso'
        }
    }
}
