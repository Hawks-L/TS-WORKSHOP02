import { randomUUID } from "node:crypto";

export class TickerId {
    private constructor(private readonly value: string) {}

    static new(): TickerId {
        return new TickerId(randomUUID());
    }

    static from(value: string): TickerId {
        return new TickerId(value);
    }

    toString(): string {
        return this.value;
    }
}
