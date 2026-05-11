export type TicketStatus = "open" | "pending" | "resolved" | "closed";
export type TicketPriority = "low" | "normal" | "high" | "urgent";
export type TicketCategory = "bug" | "billing" | "feature" | "account" | "other";

export type SupportTicket = {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: TicketCategory | null;
  rating: number | null;
  hasUnread: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateTicketInput = {
  subject: string;
  body: string;
  category: TicketCategory;
  priority: TicketPriority;
  attachmentUrl?: string;
};

export type TicketAuthor = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
};

export type TicketReply = {
  id: string;
  body: string;
  attachmentUrl: string | null;
  isAdmin: boolean;
  createdAt: string;
  author: TicketAuthor;
};

export type TicketDetail = {
  ticket: {
    id: string;
    subject: string;
    body: string;
    attachmentUrl: string | null;
    status: TicketStatus;
    priority: TicketPriority;
    category: TicketCategory | null;
    rating: number | null;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
  };
  replies: TicketReply[];
};
