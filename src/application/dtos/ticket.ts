import { z } from "zod";
import { ZTicketPriority, ZTicketStatus } from "../../domain/value-objects/Status.zod";

export const CreateTicketSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    priority: ZTicketPriority,
    userId: z.string(),
    areaId: z.string(),
    createdAt: z.date().optional(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;

export const TicketSchema = z.object({
    id: z.uuidv4(),
    title: z.string().trim(),
    status: ZTicketStatus,
    priority: ZTicketPriority,
    userId: z.string(),
    areaId: z.string(),
    createdAt: z.date(),
});

export type TicketDTO = z.infer<typeof TicketSchema>;

export const RehydrateTicketSchema = z.object({
    id: z.uuidv4(),
    title: z.string().trim(),
    status: ZTicketStatus,
    priority: ZTicketPriority,
    userId: z.string(),
    areaId: z.string(),
    createdAt: z.date(),
});

export type RehydrateTicketDTO = z.infer<typeof RehydrateTicketSchema>;
