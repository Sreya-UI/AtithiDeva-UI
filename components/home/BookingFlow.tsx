import { ArrowDown, Check } from "lucide-react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatusPill } from "@/components/product/StatusPill";
import { bookingInputs } from "@/data/content";

export function BookingFlow() {
  return (
    <section
      id="booking"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading
          marker="Front desk"
          title="One form, and the room changes state"
          lede={
            <p>
              Check-in collects everything the booking will be judged on later. If the room already
              carries an active booking the form reuses it; if it does not, stale guest and booking
              values are cleared rather than quietly inherited.
            </p>
          }
        />

        <div className="mt-14 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,0.9fr)] lg:items-center lg:gap-10">
          {/* Inputs */}
          <Reveal>
            <div className="rounded-xl border border-linen bg-paper p-5 shadow-lift sm:p-6">
              <p className="text-[0.82rem] font-semibold text-ink">Check-in</p>
              <p className="mt-1 text-[0.76rem] text-ink-50">
                Room 102 · Premium · 3 nights
              </p>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-linen bg-linen">
                {bookingInputs.map((input) => (
                  <div key={input.label} className="bg-paper px-3.5 py-3">
                    <dt className="text-[0.7rem] text-ink-50">{input.label}</dt>
                    <dd className="mt-0.5 truncate text-[0.82rem] font-medium text-ink">
                      {input.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[0.74rem] leading-relaxed text-ink-50">
                Identity documents are collected in the same step, and room-level taxes come from
                invoice settings rather than being typed in by hand.
              </p>
            </div>
          </Reveal>

          {/* Connector */}
          <Reveal index={1} className="flex justify-center">
            <div className="flex items-center gap-3 lg:flex-col">
              <span aria-hidden className="h-px w-10 bg-linen lg:h-10 lg:w-px" />
              <ArrowDown
                aria-hidden
                className="h-4 w-4 shrink-0 -rotate-90 text-brass lg:rotate-0"
              />
              <span aria-hidden className="h-px w-10 bg-linen lg:h-10 lg:w-px" />
            </div>
          </Reveal>

          {/* Result */}
          <Reveal index={2}>
            <div className="space-y-3">
              <div className="rounded-xl border border-[#e5d5b0] bg-state-occupied-wash p-5 sm:p-6">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-state-occupied text-ivory">
                    <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                  <p className="text-[0.88rem] font-semibold text-ink">Booking confirmed</p>
                </div>
                <dl className="mt-4 space-y-2 text-[0.82rem]">
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-50">Guest</dt>
                    <dd className="font-medium text-ink">Stored and updated</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-50">Room charge</dt>
                    <dd data-numeric className="font-medium text-ink">
                      ₹16,200
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-50">Advance recorded</dt>
                    <dd data-numeric className="font-medium text-ink">
                      ₹15,000
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-linen bg-paper px-5 py-4">
                <div>
                  <p data-numeric className="text-[1.1rem] font-semibold text-ink">
                    102
                  </p>
                  <p className="text-[0.74rem] text-ink-50">Premium · Ground</p>
                </div>
                <StatusPill state="occupied" />
              </div>

              <DemoNote />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
