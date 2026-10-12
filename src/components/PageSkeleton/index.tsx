import { Skeleton as CandidateSkeleton } from "../../pages/CandidateKit/styles";
import { Skeleton as StaffSkeleton } from "../../pages/StaffKit/styles";

// Placeholder shown while a page loads. Announces itself politely to screen readers.
// `kit` picks the primitives of the area the page belongs to (the two kits stay separate).
export function PageSkeleton({ kit, rows = 3 }: { kit: "staff" | "candidate"; rows?: number }) {
  const Bar = kit === "staff" ? StaffSkeleton : CandidateSkeleton;

  return (
    <div role="status" aria-live="polite" aria-busy="true" style={{ display: "grid", gap: "16px" }}>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Carregando...</span>
      <Bar size="title" />
      {Array.from({ length: rows }, (_, index) => (
        <Bar key={index} size="block" />
      ))}
    </div>
  );
}
