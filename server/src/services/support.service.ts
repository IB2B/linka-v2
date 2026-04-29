import * as tickets from "../models/support-ticket.model";
import * as replies from "../models/support-reply.model";
import type {
  SupportTicket, TicketWithReplies, TicketPriority, TicketReply,
} from "../types/support";

function fail(status: number, message: string): never {
  throw Object.assign(new Error(message), { status });
}

export async function createTicket(
  userId: string, subject: string, body: string,
  priority: TicketPriority, category: string | null,
): Promise<SupportTicket> {
  return tickets.insertOne(userId, subject, body, priority, category);
}

export async function getTicketForUser(
  userId: string, ticketId: string, isAdmin: boolean,
): Promise<TicketWithReplies> {
  const ticket = await tickets.getById(ticketId);
  if (!ticket) fail(404, "Ticket not found.");
  if (!isAdmin && ticket.userId !== userId) fail(403, "Forbidden.");
  const list = await replies.listByTicket(ticketId);
  return { ...ticket, replies: list };
}

export async function addReply(
  userId: string, ticketId: string, body: string, isAdmin: boolean,
): Promise<TicketReply> {
  const ticket = await tickets.getById(ticketId);
  if (!ticket) fail(404, "Ticket not found.");
  if (!isAdmin && ticket.userId !== userId) fail(403, "Forbidden.");
  return replies.insertReply(ticketId, userId, body, isAdmin);
}
