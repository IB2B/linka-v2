export type TicketStatus = "open" | "pending" | "resolved" | "closed";
export type TicketPriority = "low" | "normal" | "high" | "urgent";

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  body: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
}

export interface TicketReply {
  id: string;
  ticketId: string;
  authorId: string;
  body: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface TicketWithReplies extends SupportTicket {
  replies: TicketReply[];
}
