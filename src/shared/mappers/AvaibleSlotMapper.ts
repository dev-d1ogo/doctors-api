import { AvailableSlot } from "@/core/entities/AvaibleSlot"

interface AvailableSlotRaw {
    id: string
    doctorId: string
    dateTime: Date
}

export class AvailableSlotMapper {
    static toDomain(raw: AvailableSlotRaw): AvailableSlot {
        return new AvailableSlot({
            id: raw.id,
            doctorId: raw.doctorId,
            dateTime: raw.dateTime
        })
    }

    static toPersistence(slot: AvailableSlot): AvailableSlotRaw {
        return {
            id: slot.id,
            doctorId: slot.doctorId,
            dateTime: slot.dateTime
        }
    }

    static toHttp(slot: AvailableSlot) {
        return {
            id: slot.id,
            doctorId: slot.doctorId,
            dateTime: slot.dateTime
        }
    }
}
