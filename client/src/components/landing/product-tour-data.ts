export type TourMeta = { id: string; span: "lg" | "md" };

// Order matches `landing.tour.items` in the message files.
export const TOUR_META: TourMeta[] = [
  { id: "voice", span: "lg" },
  { id: "calendar", span: "md" },
  { id: "inbox", span: "md" },
  { id: "radar", span: "lg" },
];
