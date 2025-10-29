import { Router } from "express";
import { Clock } from "../application/ports/Clock";
import { EventBus } from "../application/ports/EventBus";
import { TicketRepository } from "../application/ports/TicketRepository";
import { ChangeTicketState } from "../application/use-cases/ChangeTicketState";
import { CreateTicket } from "../application/use-case/CreateTicket";
import { GetTicketById } from "../application/use-cases/GetTicketById";
import { ListTickets } from '../application/use-cases/ListTickets';
import { BaseMiddleware } from "../interfaces/http/base/BaseMiddleware";
import { TicketsController } from "../interfaces/http/controllers/TicketsController";
import { TicketsRouter } from "../interfaces/http/routes/TicketsRouter";
import { BaseModule } from "./BaseModule";

export class TicketModule extends BaseModule<TicketRepository> {
    constructor ( repo: TicketRepository, bus: EventBus, clock: Clock ) {
        super( repo, bus, clock );
    }

    public router (): Router {
        const createTicket = new CreateTicket( this.repo, this.clock, this.bus );
        const listTickets = new ListTickets( this.repo );
        const getTicketById = new GetTicketById( this.repo );
        const changeTicketState = new ChangeTicketState( this.repo, this.clock, this.bus );

        const controller = new TicketsController( createTicket, listTickets, getTicketById, changeTicketState );
        const middleware = new BaseMiddleware();

        const router = Router();
        router.use( "/tickets", new TicketsRouter( controller, middleware ).router );

        return router;
    }
}
