import { AuthService } from '@/adapters/auth/AuthService';
import { UserRepositoryPrisma } from '@/adapters/infra/prisma/UserPrismaRepository';
import { RegisterUserService } from '@/application/applicationServices/user/RegisterUserService';
import { AuthController } from '@/application/controller/AuthController';
import { RegisterDoctorUseCase } from '@/application/use-cases/user/auth/RegisterDoctor';
import { RegisterPatientUseCase } from '@/application/use-cases/user/auth/RegisterPatient';
import { UserRepository } from '@/core/repositories/UserRepository';
import { Module } from '@nestjs/common'
import { IAuthService } from '@/core/services/IAuthService';

@Module({
    controllers: [AuthController],
    providers: [
        RegisterUserService,
        RegisterDoctorUseCase,
        RegisterPatientUseCase, // ← ESSENCIAL: estava faltando
        { provide: IAuthService, useClass: AuthService },
        { provide: UserRepository, useClass: UserRepositoryPrisma }]
})
export class AuthModule { }
