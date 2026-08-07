import { MockSurface } from "./mock-surface";
import { MockBar } from "./mock-bar";
import { MockChip } from "./mock-chip";
import { MockRow } from "./mock-row";

const LOCALES = ["EN", "DE", "ES", "FR", "IT", "NL", "PT"];

export function VisualLanguage() {
  return (
    <MockSurface>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {LOCALES.map((l, i) => (
            <MockChip key={l} tone={i === 1 ? "brand" : "muted"}>
              {l}
            </MockChip>
          ))}
          <MockChip>+16</MockChip>
        </div>
        <MockRow>
          <div className="flex w-full flex-col gap-1">
            <MockBar w="w-full" tone="brand" />
            <MockBar w="w-3/5" tone="brand" />
          </div>
        </MockRow>
      </div>
    </MockSurface>
  );
}
