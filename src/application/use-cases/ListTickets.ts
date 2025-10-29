import type { Ticket } from "../../domain/entities/Ticket";
import type { ListTicketsQuery } from "../dtos/list-tickets";
import type { TicketRepository } from "../ports/TicketRepository";

export class ListTickets {
    constructor ( private readonly repo: TicketRepository ) { }

    async execute ( query: ListTicketsQuery ): Promise<{ items: Ticket[]; total: number; offset: number; limit: number; }> {
        const { items, total, offset, limit } = await this.repo.search( query );
        return { items, total, offset, limit };
    }
}
