import { Ticket } from "../../domain/entities/Ticket";

export interface TicketRepository {
    save(ticket: Ticket): Promise<void>;
    findById(id: string): Promise<Ticket | null>;
    list(): Promise<Ticket[]>;
    search ( params: {
        offset: number;
        limit: number;
        status?: Ticket[ "status" ];
        priority?: Ticket[ "priority" ];
        userId?: string;
        areaId?: string;
        createdFrom?: Date;
        createdTo?: Date;
        sortBy?: "createdAt" | "priority" | "title";
        order?: "asc" | "desc";
    } ): Promise<{ items: Ticket[]; total: number; offset: number; limit: number; }>;
}
