import { UserRole } from "@/core/enums/UserRole"

export interface UserJwt {
    id: string
    email: string
    role: UserRole
}
