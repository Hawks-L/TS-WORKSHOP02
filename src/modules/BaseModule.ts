import { Clock } from "../application/ports/Clock";
import { EventBus } from "../application/ports/EventBus";

export abstract class BaseModule<Repository> {
    constructor(
        protected readonly repo: Repository,
        protected readonly bus: EventBus,
        protected readonly clock: Clock,
    ) {}
}
