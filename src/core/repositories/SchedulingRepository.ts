import { Scheduling } from "@/core/entities/Scheduling";

export abstract class SchedulingRepository {
    abstract findByDoctorId(doctorId: string): Promise<Scheduling[]>
    abstract findByPatientId(patientId: string): Promise<Scheduling[]>
    abstract hasConflict(doctorId: string, dateTime: Date): Promise<boolean>
    abstract save(scheduling: Scheduling): Promise<void>
}
