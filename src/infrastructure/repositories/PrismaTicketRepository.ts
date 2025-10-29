import { RehydrateTicketDTO } from "../../application/dtos/ticket";
import { TicketRepository } from "../../application/ports/TicketRepository";
import { Ticket } from "../../domain/entities/Ticket";
import { prismaClient } from "../db/prisma";

export class PrismaticketRepository implements TicketRepository {
    search(_params: { offset: number; limit: number; status?: Ticket["status"]; priority?: Ticket["priority"]; userId?: string; areaId?: string; createdFrom?: Date; createdTo?: Date; sortBy?: "createdAt" | "priority" | "title"; order?: "asc" | "desc"; }): Promise<{ items: Ticket[]; total: number; offset: number; limit: number; }> {
        throw new Error("Method not implemented.");
    }
    async save(ticket: Ticket): Promise<void> {
        await prismaClient.ticket.upsert({
            where: { id: ticket.id.toString() },
            create: {
                id: ticket.id.toString(),
                title: ticket.title,
                status: ticket.status,
                priority: ticket.priority,
                userId: ticket.userId,
                areaId: ticket.areaId,
                createdAt: ticket.createdAt,
            },
            update: {
                title: ticket.title,
                status: ticket.status,
                updatedAt: new Date(),
            },
        });
    }
    async findById(id: string): Promise<Ticket | null> {
        const row = await prismaClient.ticket.findUnique({
            where: { id },
        });
        if (!row) {
            return null;
        }
        return row ? Ticket.rehydrate(row as RehydrateTicketDTO) : null;
    }

    async list(): Promise<Ticket[]> {
        const rows = await prismaClient.ticket.findMany({
            orderBy: { createdAt: "desc" },
        });

        return rows.map((row) => Ticket.rehydrate(row as RehydrateTicketDTO));
    }
}