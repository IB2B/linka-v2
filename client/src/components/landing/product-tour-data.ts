export type TourMeta = { id: string; span: "lg" | "md" };

// Order matches `landing.tour.items` in the message files. Spans pair up to 12
// columns per row: 7+5, 7+5, 5+7.
export const TOUR_META: TourMeta[] = [
  { id: "voice", span: "lg" },
  { id: "calendar", span: "md" },
  { id: "fanout", span: "lg" },
  { id: "avatar", span: "md" },
  { id: "inbox", span: "md" },
  { id: "radar", span: "lg" },
];
