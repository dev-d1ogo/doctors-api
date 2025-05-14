import { RegisterUserService } from '@/application/applicationServices/user/RegisterUserService'
import { RegisterUserDTO, RegisterUserSchema } from '@/application/models/register-user.dto'
import { RequestValidator } from '@/helpers/ErrorValidator'
import { ApplicationError } from '@/shared/Errors'
import { Body, Controller, Post } from '@nestjs/common'


@Controller('auth')
export class AuthController {
    constructor(
        private readonly registerUserService: RegisterUserService,
        // private readonly authenticateUser: AuthenticateUserUseCase
    ) { }

    @Post('register')
    async register(@Body() body: any) {
        if (!body) {
            throw new ApplicationError({ message: "O corpo da requisição não pode ser vazio", type: "Corpo da requisição vazio", code: 404 })
        }

        const validated = RequestValidator.validate<RegisterUserDTO>(body, RegisterUserSchema)
        await this.registerUserService.execute(validated)

        return {
            message: 'Usuario registrado'
        }
    }

    // @Post('login')
    // async login(@Body() body: any) {
    //     const validated = RequestValidator.validate<LoginDTO>(body, LoginSchema)
    //     const result = await this.authenticateUser.exec(validated)

    //     return {
    //         accessToken: result.token,
    //         user: UserMapper.toHttp(result.user)
    //     }
    // }
}
