import { GetSchedulingsService } from '@/application/applicationServices/available-slot/GetSchedulingsService'
import { SchedulingUserSchema } from '@/application/models/scheduling-user.dto'
import { UserJwt } from '@/core/models/UserJwt'
import { RequestValidator } from '@/helpers/ErrorValidator'
import { Controller, Get, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('agendamentos')
export class SchedulingController {
    constructor(private readonly getSchedulingsService: GetSchedulingsService) { }

    @Get()
    async list(@Req() req: Request) {
        const validated = RequestValidator.validate<UserJwt>(req.user, SchedulingUserSchema)
        return this.getSchedulingsService.execute(validated)
    }
}
