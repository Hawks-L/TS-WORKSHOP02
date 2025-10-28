import { DomainEvent } from "./DomainEvent";

export interface TicketCreated extends DomainEvent {
    type: "ticket.created";
    payload: {
        id: string;
        title: string;
        userId: string;
        areaId: string;
    };
}
