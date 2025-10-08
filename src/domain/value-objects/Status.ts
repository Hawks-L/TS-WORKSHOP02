export const TicketStatus = [
    "OPEN",
    "ASSIGNED",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
    "CANCELLED",
] as const;

export type TicketStatus = (typeof TicketStatus)[number];

// "LOW", "MEDIUM", "HIGH", "CRITICAL" ---> TicketPriority

export const TicketPriority = ["LOW", "MEDIUM", "HIGH", "CRITICAL"] as const;

export type TicketPriority = (typeof TicketPriority)[number];
