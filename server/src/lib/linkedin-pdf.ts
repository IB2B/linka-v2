// eslint-disable-next-line @typescript-eslint/no-require-imports
const { parsePdf } = require("./pdf-parse-compat.js") as { parsePdf: (b: Buffer) => Promise<{ text: string }> };

export type LinkedInData = { samples: string[]; jobTitle?: string };

const SECTION_HEADERS = [
  "Summary", "Experience", "Education", "Skills", "Licenses & Certifications",
  "Accomplishments", "Volunteer Experience", "Publications", "Honors & Awards",
  "Languages", "Projects", "Recommendations", "Contact",
];

function extractSection(text: string, header: string): string {
  const marker = `\n${header}\n`;
  const start = text.indexOf(marker);
  if (start === -1) return "";
  const after = text.slice(start + marker.length);
  const next = SECTION_HEADERS.filter((h) => h !== header)
    .map((h) => after.indexOf(`\n${h}\n`))
    .filter((i) => i > 0)
    .sort((a, b) => a - b)[0];
  return (next !== undefined ? after.slice(0, next) : after).trim();
}

export async function parseLinkedInPdf(buffer: Buffer): Promise<LinkedInData> {
  const { text } = await parsePdf(buffer);
  const summary = extractSection(text, "Summary");
  const experience = extractSection(text, "Experience");

  const samples: string[] = [];
  if (summary) samples.push(summary);
  if (experience) samples.push(experience.slice(0, 3000));

  const jobTitle = experience.split("\n").find((l) => l.trim().length > 2)?.trim();

  return {
    samples: samples.length ? samples : [text.slice(0, 3000)],
    jobTitle,
  };
}
