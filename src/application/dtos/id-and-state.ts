import { z } from "zod";
import { ZTicketStatus } from "../../domain/value-objects/Status.zod";

// src/application/dtos/id-and-state.ts
// export const TicketIdParamSchema = z.object({ id: z.string() }); // temporal


export const TicketIdParamSchema = z.object( {
     id: z.uuidv4(),
} );
export type TicketIdParam = z.infer<typeof TicketIdParamSchema>;

export const ChangeStateBodySchema = z.object( {
    to: ZTicketStatus,
} );
export type ChangeStateBody = z.infer<typeof ChangeStateBodySchema>;
