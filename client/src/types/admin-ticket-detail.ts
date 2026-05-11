import type {
  SupportCategory, SupportPriority, SupportStatus, SupportUser,
} from "@/types/admin-support";

export type TicketReply = {
  id: string;
  body: string;
  attachmentUrl: string | null;
  isAdmin: boolean;
  createdAt: string;
  author: SupportUser;
};

export type TicketDetail = {
  ticket: {
    id: string;
    subject: string;
    body: string;
    attachmentUrl: string | null;
    status: SupportStatus;
    priority: SupportPriority;
    category: SupportCategory | null;
    createdAt: string;
    updatedAt: string;
    closedAt: string | null;
    user: SupportUser;
  };
  replies: TicketReply[];
};
