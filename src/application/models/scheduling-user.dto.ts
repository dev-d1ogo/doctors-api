import { z } from 'zod'
import { UserRole } from '@/core/enums/UserRole'

export const SchedulingUserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    role: z.nativeEnum(UserRole)
})

export type SchedulingUserDTO = z.infer<typeof SchedulingUserSchema>
