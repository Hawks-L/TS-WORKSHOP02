export class TicketId {
    private constructor(private readonly value: string) {}

    static new(): TicketId {
    return new TicketId(globalThis.crypto?.randomUUID?.() ?? globalThis.crypto.randomUUID());
  }
  static from(id: string): TicketId { return new TicketId(id); }
  toString(): string { return this.value; }

    // static new(): TicketId {
    //     return new TicketId(randomUUID());
    // }

    // static from(value: string): TicketId {
    //     return new TicketId(value);
    // }

    // toString(): string {
    //     return this.value;
    // }
}
