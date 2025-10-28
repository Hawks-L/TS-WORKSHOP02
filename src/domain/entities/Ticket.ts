import { CreateTicketInput, RehydrateTicketDTO } from "../../application/dtos/ticket";
import { TicketCreated } from "../events/TicketCreated";
import { TicketPriority, TicketStatus } from "../value-objects/Status";
import { TicketId } from "../value-objects/Ticketld";

import { BaseEntity } from "./BaseEntity";

export class Ticket extends BaseEntity<TicketId> {
    public constructor(
        id: TicketId,
        public title: string,
        public status: TicketStatus,
        public priority: TicketPriority,
        public readonly userId: string,
        public readonly areaId: string,
        public createdAt: Date,
    ) {
        super(id, createdAt);
    }

    public static create(dto: CreateTicketInput, now: Date): Ticket {
        const ticket = new Ticket(
            TicketId.new(),
            dto.title,
            "OPEN",
            dto.priority,
            dto.userId,
            dto.areaId,
            dto.createdAt ?? now,
        );

        const event: TicketCreated = {
            type: "ticket.created",
            occurredAt: now,
            payload: {
                id: ticket.id.toString(),
                title: ticket.title,
                userId: ticket.userId,
                areaId: ticket.areaId,
            },
        };

        ticket.recordEvent(event);

        return ticket;
    }

    public static rehydrate(row: RehydrateTicketDTO): Ticket {
        return new Ticket(
            TicketId.from(row.id),
            row.title,
            row.status,
            row.priority,
            row.userId,
            row.areaId,
            new Date(row.createdAt),
        );
    }
}
