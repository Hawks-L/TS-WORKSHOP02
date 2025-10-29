export const USERS = [
  { id: "5a8d0f70-6b3b-4f6f-9b93-3b2b2e2f0001", name: "Alice Admin",  email: "alice.admin@hospital.edu" },
  { id: "5a8d0f70-6b3b-4f6f-9b93-3b2b2e2f0002", name: "Bob Support",  email: "bob.support@hospital.edu" },
  { id: "5a8d0f70-6b3b-4f6f-9b93-3b2b2e2f0003", name: "Carol Nurse",  email: "carol.nurse@hospital.edu" }
] as const;

export const AREAS = [
  { id: "6b1a9c80-1234-4567-8901-abcdefabcdef", name: "Urgencias" },
  { id: "6b1a9c80-1234-4567-8901-abcdefabcdee", name: "Laboratorio Clínico" },
  { id: "6b1a9c80-1234-4567-8901-abcdefabcded", name: "Imagenología" }
] as const;

export const TICKET_STATUS = ["OPEN","ASSIGNED","IN_PROGRESS","RESOLVED","CLOSED","CANCELLED"] as const;
export const TICKET_PRIORITY = ["LOW","MEDIUM","HIGH","URGENT"] as const;

export type Status = (typeof TICKET_STATUS)[number];
export type Priority = (typeof TICKET_PRIORITY)[number];

export const TICKETS: Array<{
  title: string;
  status: Status;
  priority: Priority;
  userId: string;
  areaId: string;
  createdAt?: Date;
}> = [
  {
    title: "PC de triage no enciende",
    status: "OPEN",
    priority: "HIGH",
    userId: USERS[1].id,
    areaId: AREAS[0].id,
  },
  {
    title: "Impresora de etiquetas sin papel",
    status: "ASSIGNED",
    priority: "MEDIUM",
    userId: USERS[2].id,
    areaId: AREAS[1].id,
  },
  {
    title: "Conexión caída en sala de rayos X",
    status: "IN_PROGRESS",
    priority: "URGENT",
    userId: USERS[0].id,
    areaId: AREAS[2].id,
  },
  {
    title: "Actualización software LIS",
    status: "RESOLVED",
    priority: "LOW",
    userId: USERS[1].id,
    areaId: AREAS[1].id,
  },
  {
    title: "Mouse dañado en estación de enfermería",
    status: "CLOSED",
    priority: "LOW",
    userId: USERS[2].id,
    areaId: AREAS[0].id,
  }
];
