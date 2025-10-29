import { Request, Response } from "express";
import z from "zod";
import { ChangeStateBodySchema, TicketIdParamSchema } from "../../../application/dtos/id-and-state";
import { ListTicketsQuerySchema } from "../../../application/dtos/list-tickets";
import { CreateTicketSchema } from "../../../application/dtos/ticket";
import { ChangeTicketState } from "../../../application/use-cases/ChangeTicketState";
import { CreateTicket } from "../../../application/use-case/CreateTicket";
import { GetTicketById } from "../../../application/use-cases/GetTicketById";
import { ListTickets } from "../../../application/use-cases/ListTickets";
import { toHttp } from "../../mappers/TicketMapper";
import { BaseController } from "../base/BaseController";

export class TicketsController extends BaseController {
    constructor (
        private readonly createTicket: CreateTicket,
        private readonly listTickets: ListTickets,
        private readonly getTicketById: GetTicketById,
        private readonly changeTicketState: ChangeTicketState
    ) {
        super();
    }

    async create ( req: Request, res: Response ): Promise<unknown> {
        const parsed = CreateTicketSchema.safeParse( req.body );

        if ( !parsed.success ) {
            return res.status( 400 ).json( {
                errors: z.treeifyError( parsed.error ),
            } );
        }

        const ticket = await this.createTicket.execute( parsed.data );

        res.status( 201 ).json( toHttp( ticket ) );
    }

    async list ( req: Request, res: Response ): Promise<unknown> {
        const parsed = ListTicketsQuerySchema.safeParse( req.query );

        if ( !parsed.success ) return res.status( 400 ).json( {
            errors: z.treeifyError( parsed.error )
        } );

        const result = await this.listTickets.execute( parsed.data );
        res.json( {
            total: result.total,
            offset: result.offset,
            limit: result.limit,
            items: result.items.map( toHttp ),
        } );
    }

    async getById ( req: Request, res: Response ): Promise<unknown> {
        const parsed = TicketIdParamSchema.safeParse( req.params );

        if ( !parsed.success ) return res.status( 400 ).json( {
            errors: z.treeifyError( parsed.error )
        } );

        const ticket = await this.getTicketById.execute( parsed.data.id );

        res.json( toHttp( ticket ) );
    }

    async changeState ( req: Request, res: Response ): Promise<unknown> {
        const idOk = TicketIdParamSchema.safeParse( req.params );

        if ( !idOk.success ) return res.status( 400 ).json( {
            errors: z.treeifyError( idOk.error )
        } );

        const bodyOk = ChangeStateBodySchema.safeParse( req.body );

        if ( !bodyOk.success ) return res.status( 400 ).json( {
            errors: z.treeifyError( bodyOk.error )
        } );

        const ticket = await this.changeTicketState.execute( {
            ticketId: idOk.data.id,
            to: bodyOk.data.to,
            actorId: ( req as Record<string, unknown> & { user?: { id: string } } ).user?.id,
        } );

        res.json( toHttp( ticket ) );
    };
}
