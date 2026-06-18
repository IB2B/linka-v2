export type TrendLocale = "en" | "fr" | "es" | "de" | "it";

const LOCALES: TrendLocale[] = ["en", "fr", "es", "de", "it"];

export function toTrendLocale(v: unknown): TrendLocale {
  return LOCALES.includes(v as TrendLocale) ? (v as TrendLocale) : "en";
}

// Human language name used to instruct the idea-generation model.
export const LANGUAGE_NAME: Record<TrendLocale, string> = {
  en: "English", fr: "French", es: "Spanish", de: "German", it: "Italian",
};

// Angle phrasings (incl. trailing preposition) so the news query reads natively
// in the user's language — this is what makes Tavily return same-language sources.
export const TREND_ANGLES: Record<TrendLocale, string[]> = {
  en: [
    "latest news and announcements about",
    "emerging tools and product launches in",
    "controversial debates and hot takes on",
    "case studies and success stories in",
    "trends and industry reports on",
  ],
  fr: [
    "dernières actualités et annonces sur",
    "nouveaux outils et lancements de produits dans",
    "débats et opinions tranchées sur",
    "études de cas et réussites dans",
    "tendances et rapports du secteur sur",
  ],
  es: [
    "últimas noticias y anuncios sobre",
    "nuevas herramientas y lanzamientos en",
    "debates y opiniones polémicas sobre",
    "casos de éxito e historias en",
    "tendencias e informes del sector sobre",
  ],
  de: [
    "aktuelle Nachrichten und Ankündigungen zu",
    "neue Tools und Produkteinführungen in",
    "kontroverse Debatten und Meinungen zu",
    "Fallstudien und Erfolgsgeschichten in",
    "Trends und Branchenberichte zu",
  ],
  it: [
    "ultime notizie e annunci su",
    "nuovi strumenti e lanci di prodotti in",
    "dibattiti e opinioni controverse su",
    "casi di studio e storie di successo in",
    "tendenze e report di settore su",
  ],
};
