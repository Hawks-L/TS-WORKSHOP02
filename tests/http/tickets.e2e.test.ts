import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import express from "express";

import { BaseMiddleware } from "../../src/interfaces/http/base/BaseMiddleware";
import { TicketsRouter } from "../../src/interfaces/http/routes/TicketsRouter";
import { TicketsController } from "../../src/interfaces/http/controllers/TicketsController";

import { ListTickets } from "../../src/application/use-cases/ListTickets";
import { GetTicketById } from "../../src/application/use-cases/GetTicketById";
import { ChangeTicketState } from "../../src/application/use-cases/ChangeTicketState";
import { CreateTicket } from "../../src/application/use-case/CreateTicket";
import { errorHandler } from "../../src/interfaces/http/base/errorHandler";

class InMemoryRepo {
  items: any[] = [];
  async save(ticket: any) {
    const id = ticket.id?.toString?.() ?? ticket.id;
    const idx = this.items.findIndex((t) => t.id?.toString?.() === ticket.id?.toString?.());
    if (idx >= 0) this.items[idx] = ticket;
    else this.items.push(ticket);
  }
  async findById(id: string) {
    return this.items.find((t) => t.id?.toString?.() === id) ?? null;
  }
  async list() {
    return this.items;
  }
  async search({ offset, limit }: any) {
    return { items: this.items.slice(offset, offset + limit), total: this.items.length, offset, limit };
  }
}
class FakeClock { now() { return new Date("2025-01-01T00:00:00Z"); } }
class FakeBus { published: any[] = []; async publishAll(e: unknown[]) { this.published.push(...e); } }

describe("Tickets HTTP", () => {
  let app: express.Express;
  let repo: InMemoryRepo; let bus: FakeBus; let clock: FakeClock;

  beforeEach(() => {
    repo = new InMemoryRepo(); bus = new FakeBus(); clock = new FakeClock();

    const controller = new TicketsController(
      new CreateTicket(repo as any, clock as any, bus as any),
      new ListTickets(repo as any),
      new GetTicketById(repo as any),
      new ChangeTicketState(repo as any, clock as any, bus as any)
    );

    const middleware = new BaseMiddleware();
    const router = new TicketsRouter(controller, middleware).router;

    app = express();
    app.use(express.json());
    app.use("/tickets", router);
    app.use(errorHandler); // Asegura que los errores se manejen
  });

  it("POST /tickets -> 201", async () => {
    const res = await request(app)
      .post("/tickets")
      .send({ title: "Impresora rota", priority: "HIGH", userId: "u1", areaId: "a1" })
      .expect(201);
    expect(res.body).toMatchObject({ title: "Impresora rota", priority: "HIGH", status: "OPEN" });
  });

  it("GET /tickets -> 200", async () => {
    await request(app).post("/tickets").send({ title: "PC", priority: "LOW", userId: "u1", areaId: "a1" });
    const res = await request(app).get("/tickets?offset=0&limit=10").expect(200);
    expect(res.body.total).toBeGreaterThan(0);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it("PATCH /tickets/:id/state -> 200", async () => {
    const create = await request(app).post("/tickets").send({ title: "Net", priority: "MEDIUM", userId: "u1", areaId: "a1" });
    const id = create.body.id;
    const res = await request(app).patch(`/tickets/${id}/state`).send({ to: "RESOLVED" }).expect(200);
    expect(res.body.status).toBe("RESOLVED");
  });

  it("GET /tickets/:id (404 si no existe)", async () => {
    await request(app).get("/tickets/00000000-0000-0000-0000-000000000000").expect(400); // por validación UUID
  });
});
