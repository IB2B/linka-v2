import { RecyclerCandidateRow } from "./recycler-candidate-row";
import type { RecycleCandidate } from "@/types/recycler";

const HEADERS: { label: string; align?: "right" }[] = [
  { label: "Post" },
  { label: "Reason" },
  { label: "Likes", align: "right" },
  { label: "Eng. rate", align: "right" },
  { label: "Posted" },
  { label: "" },
];

export function RecyclerCandidateList({
  candidates,
}: { candidates: RecycleCandidate[] }) {
  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-sm font-medium">Candidates</h2>
        <p className="text-xs text-muted-foreground">
          Top {candidates.length} posts ranked by engagement and reach.
        </p>
      </div>
      <div className="overflow-x-auto rounded-md border bg-card">
        <table className="w-full text-left">
          <thead className="bg-muted/40 text-xs text-muted-foreground">
            <tr>
              {HEADERS.map((h, i) => (
                <th
                  key={i}
                  className={`px-3 py-2 font-medium ${h.align === "right" ? "text-right" : ""}`}
                >
                  {h.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <RecyclerCandidateRow key={c.post.id} candidate={c} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
