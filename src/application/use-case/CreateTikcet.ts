import { Ticket } from "../../domain/entities/Ticket";
import { CreateTicketInput, CreateTicketSchema } from "../dtos/ticket";
import { Clock } from "../ports/Clock";
import { EventBus } from "../ports/EventBus";

import { TicketRepository } from "../ports/TicketRepository";

export class CreateTicket {
    constructor(
        private readonly repo: TicketRepository,
        private readonly clock: Clock,
        private readonly bus: EventBus,
    ) {}

    async execute(input: CreateTicketInput): Promise<Ticket> {
        const ticket = Ticket.create(CreateTicketSchema.parse(input), this.clock.now());

        await this.repo.save(ticket);

        const events = ticket.pullDomainEvent();
        await this.bus.publishAll(events);

        return ticket;
    }
}
