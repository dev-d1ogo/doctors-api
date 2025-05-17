import { SchedulingResponseDTO } from "@/application/dto/scheduling-response.dto"
import { Scheduling } from "@/core/entities/Scheduling"

interface SchedulingRaw {
    id: string
    doctorId: string
    patientId: string
    dateTime: Date
}

export class SchedulingMapper {
    static toDomain(raw: SchedulingRaw): Scheduling {
        return new Scheduling({
            id: raw.id,
            doctorId: raw.doctorId,
            patientId: raw.patientId,
            dateTime: raw.dateTime
        })
    }

    static toPersistence(scheduling: Scheduling): SchedulingRaw {
        return {
            id: scheduling.id,
            doctorId: scheduling.doctorId,
            patientId: scheduling.patientId,
            dateTime: scheduling.dateTime
        }
    }

    static toHttp(scheduling: Scheduling): SchedulingResponseDTO {
        return {
            id: scheduling.id,
            doctorId: scheduling.doctorId,
            patientId: scheduling.patientId,
            dateTime: scheduling.dateTime.toISOString()
        }
    }

    static toResponseList(schedulings: Scheduling[]): SchedulingResponseDTO[] {
        return schedulings.map(this.toHttp)
    }
}
