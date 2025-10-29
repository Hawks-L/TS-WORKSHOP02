import { Request, Response } from "express";
import { ChangeStateBodySchema, TicketIdParamSchema } from "../../../application/dtos/id-and-state";
import { ListTicketsQuerySchema } from "../../../application/dtos/list-tickets";
import { CreateTicketSchema } from "../../../application/dtos/ticket";
import { BaseMiddleware } from "../base/BaseMiddleware";
import { BaseRouter } from "../base/BaseRouter";
import { TicketsController } from "../controllers/TicketsController";
import { asyncHandler } from "../base/asyncHandler"; // <-- NUEVO

export class TicketsRouter extends BaseRouter<TicketsController, BaseMiddleware> {
  constructor (controller: TicketsController, middleware: BaseMiddleware) {
    super(controller, middleware);
  }

  protected routes (): void {
    this.router.post("/",
      this.middleware.validate("body", CreateTicketSchema),
      asyncHandler((req: Request, res: Response) => this.controller.create(req, res)),
    );

    this.router.get("/",
      this.middleware.validate("query", ListTicketsQuerySchema),
      asyncHandler((req: Request, res: Response) => this.controller.list(req, res)),
    );

    this.router.get("/:id",
      this.middleware.validate("params", TicketIdParamSchema),
      asyncHandler((req: Request, res: Response) => this.controller.getById(req, res)),
    );

    this.router.patch("/:id/state",
      this.middleware.validate("params", TicketIdParamSchema),
      this.middleware.validate("body", ChangeStateBodySchema),
      asyncHandler((req: Request, res: Response) => this.controller.changeState(req, res)),
    );
  }
}
