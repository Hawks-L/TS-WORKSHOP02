import type { Ticket } from "../../domain/entities/Ticket";
import { canTransition } from "../../domain/services/TicketStateMachine";
import type { TicketStatus } from "../../domain/value-objects/Status";
import type { Clock } from "../ports/Clock";
import type { EventBus } from "../ports/EventBus";
import type { TicketRepository } from "../ports/TicketRepository";

export class ChangeTicketState {
    constructor (
        private readonly repo: TicketRepository,
        private readonly clock: Clock,
        private readonly bus: EventBus,
    ) { }

    async execute ( input: { ticketId: string; to: TicketStatus; actorId?: string; } ): Promise<Ticket> {
        const ticket = await this.repo.findById( input.ticketId );
        if ( !ticket ) throw Object.assign(
            new Error( "Ticket not found" ),
            { statusCode: 404 }
        );

        if ( !canTransition( ticket.status, input.to ) ) {
            throw Object.assign(
                new Error( `Invalid transition from ${ ticket.status } to ${ input.to }` ),
                { statusCode: 422 },
            );
        }

        const prev = ticket.status;
        ticket.status = input.to;
        await this.repo.save( ticket );

        await this.bus.publishAll( [
            {
                type: "ticket.state_changed",
                occurredAt: this.clock.now(),
                payload: {
                    id: ticket.id.toString(),
                    to: input.to,
                    from: prev,
                    actorId: input.actorId ?? null,
                },
            },
        ] );

        return ticket;
    }
}
