export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] };

export type LegalSection = {
  id: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};
