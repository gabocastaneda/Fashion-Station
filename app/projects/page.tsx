import { FocusCardsDemo } from "@/components/layouts/FocusCard";

import { TypewriterEffectSmoothDemo } from "@/components/layouts/TypeWriter";

export default function ProjectsPage() {
  return (
    <>
      <TypewriterEffectSmoothDemo />
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Los mejores diseños solo aquí
      </h4>
      <br />
      <FocusCardsDemo />
    </>
  );
}
