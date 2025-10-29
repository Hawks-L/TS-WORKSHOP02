import type { Ticket } from "../../domain/entities/Ticket";
import type { TicketRepository } from "../ports/TicketRepository";

export class GetTicketById {
    constructor ( private readonly repo: TicketRepository ) { }

    async execute ( id: string ): Promise<Ticket> {
        const ticket = await this.repo.findById( id );
        if ( !ticket ) throw Object.assign(
            new Error( "Ticket not found" ),
            { statusCode: 404 }
        );
        return ticket;
    }
}
