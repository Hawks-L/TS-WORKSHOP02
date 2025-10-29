import { Request, Response } from "express";
import { CreateTicket } from "../../application/use-case/CreateTicket";
import { CreateTicketSchema } from "../../application/dtos/ticket";
import z from "zod";
import { toHttp } from "../mappers/TicketMapper";

export class TicketController {
    constructor(private readonly createTicket: CreateTicket) {}

    async create(req: Request, res: Response): Promise<unknown> {
        const parsed = CreateTicketSchema.safeParse(req.body);

        if (!parsed.success) {
            return res.status(400).json({
                errors: z.treeifyError(parsed.error),
            });
        }

        const ticket = await this.createTicket.execute(parsed.data);

        res.status(201).json(toHttp(ticket));
    }

    async list(req: Request, res: Response): Promise<unknown> {
        return res.status(501).json({ message: "Not implemented" });
    }
}
