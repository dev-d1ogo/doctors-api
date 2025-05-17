import { Controller, Post, Body, Param, Req, Get, Query } from '@nestjs/common'
import { Request } from 'express'
import { RequestValidator } from '@/helpers/ErrorValidator'
import { ApplicationError } from '@/shared/Errors'
import { UserErrorType } from '@/shared/errors/UserErrorTypes'
import { CreateAvailableSlotUseCase } from '@/application/use-cases/available-slot/CreateAvaibleSlot'
import { CreateAvailableSlotDTO, CreateAvailableSlotSchema } from '@/application/models/create-available-slot.to'
import { GetAvailableSlotsByDoctorUseCase } from '@/application/use-cases/available-slot/GetAvailableSlotsByDoctorUseCase'
import { AvailableSlotMapper } from '@/shared/mappers/AvaibleSlotMapper'
import { DoctorParamDTO, DoctorParamSchema } from '@/application/models/available-slot.schema'
import { GetDoctorsDTO, GetDoctorsSchema } from '@/application/dto/get-doctors.dto'
import { GetAllDoctorsUseCase } from '@/application/use-cases/user/patient/GetAllDoctorsUseCase'
import { UserMapper } from '@/shared/mappers/UserMapper'

@Controller('medicos')
export class DoctorController {
    constructor(private readonly createSlotUseCase: CreateAvailableSlotUseCase,
        private readonly getAvailableUseCase: GetAvailableSlotsByDoctorUseCase,
        private readonly getAllDoctors: GetAllDoctorsUseCase) { }

    @Get(':id/horarios')
    async listAvailable(@Param() params: any) {
        const validated: DoctorParamDTO = RequestValidator.validate(params, DoctorParamSchema)

        const result = await this.getAvailableUseCase.exec({ doctorId: validated.id })

        return AvailableSlotMapper.toResponseList(result)
    }
    @Get()
    async listAll(@Query() query: any) {
        const filters: GetDoctorsDTO = RequestValidator.validate(query, GetDoctorsSchema)
        const result = await this.getAllDoctors.exec(filters)
        return UserMapper.toDoctorResponseList(result)
    }

    @Post(':id/horarios')
    async createSlot(@Param('id') doctorId: string, @Body() body: any, @Req() req: Request) {
        const validated = RequestValidator.validate<CreateAvailableSlotDTO>(body, CreateAvailableSlotSchema)

        const user = req.user

        const invalidUser = !user || user.role !== 'DOCTOR' || user.id !== doctorId

        if (invalidUser) {
            throw new ApplicationError({
                message: 'Acesso não autorizado',
                code: 403,
                type: UserErrorType.UNAUTHORIZED
            })
        }

        await this.createSlotUseCase.exec({
            doctorId,
            dateTime: new Date(validated.dateTime)
        })

        return {
            message: 'Horário criado com sucesso'
        }
    }
}
