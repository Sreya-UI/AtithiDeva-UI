import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { housekeepingSteps } from "@/data/content";

export function Housekeeping() {
  return (
    <section
      id="housekeeping"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading
          marker="Housekeeping"
          title="Checked out is not the same as available"
          lede={
            <p>
              The gap between a guest leaving and a room being sellable again is where most
              properties lose a night. AtithiDeva makes that gap an explicit cycle with an owner at
              every step, and the room only returns to the board at the end of it.
            </p>
          }
        />

        <ol className="mt-14 grid gap-y-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {housekeepingSteps.map((step, index) => {
            const isLast = index === housekeepingSteps.length - 1;
            return (
              <li key={step.label} className="relative pr-6">
                <Reveal index={index}>
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                        isLast
                          ? "border-state-available bg-state-available text-ivory"
                          : "border-linen bg-paper text-brass",
                      ].join(" ")}
                    >
                      <span data-numeric>{index + 1}</span>
                    </span>
                    <span
                      aria-hidden
                      className={[
                        "h-px flex-1",
                        isLast ? "bg-transparent" : "bg-linen",
                      ].join(" ")}
                    />
                  </div>

                  <h3 className="optical-text mt-4 font-display text-[1.08rem] leading-snug font-medium">
                    {step.label}
                  </h3>
                  <p className="mt-1.5 max-w-[30ch] text-[0.86rem] leading-[1.6] text-ink-70">
                    {step.note}
                  </p>
                </Reveal>
              </li>
            );
          })}

          {/* Rule restated where it matters, in the eighth cell of the grid. */}
          <li className="sm:col-span-2 lg:col-span-1">
            <Reveal index={7}>
              <div className="h-full rounded-xl border border-linen bg-paper p-5">
                <p className="text-[0.88rem] leading-[1.65] text-ink-70">
                  Until this cycle closes, the room cannot be shown as occupied again or sold as
                  available. Maintenance follows the same principle: blocked stock stays blocked
                  until it is repaired and released.
                </p>
              </div>
            </Reveal>
          </li>
        </ol>
      </Container>
    </section>
  );
}
