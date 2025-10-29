import { z } from "zod";
import { ZTicketPriority, ZTicketStatus } from "../../domain/value-objects/Status.zod";
import { PaginationSchema } from "./pagination";

export const SortByValues = [ "createdAt", "priority", "title" ] as const;
export const OrderValues = [ "asc", "desc" ] as const;

export const ListTicketsQuerySchema = PaginationSchema.extend( {
    status: ZTicketStatus.optional(),
    priority: ZTicketPriority.optional(),
    areaId: z.uuidv4().optional(),
    userId: z.uuidv4().optional(),
    createdFrom: z.coerce.date().optional(),
    createdTo: z.coerce.date().optional(),
    sortBy: z.enum( SortByValues ).default( "createdAt" ),
    order: z.enum( OrderValues ).default( "desc" ),
} );
export type ListTicketsQuery = z.infer<typeof ListTicketsQuerySchema>;
