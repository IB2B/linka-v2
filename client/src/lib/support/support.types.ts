export type TicketStatus = "open" | "pending" | "resolved" | "closed";
export type TicketPriority = "low" | "normal" | "high" | "urgent";
export type TicketCategory = "bug" | "billing" | "feature" | "account" | "other";

export type SupportTicket = {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateTicketInput = {
  subject: string;
  body: string;
  category: TicketCategory;
  priority: TicketPriority;
};
