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
      className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14"
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

        <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[minmax(0,1.25fr)_auto_minmax(0,0.9fr)] lg:items-center lg:gap-10">
          {/* Inputs */}
          <Reveal>
            <div className="rounded-2xl border border-linen bg-paper p-6 shadow-lift sm:p-7 transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.88rem] font-bold text-ink">Check-in</p>
                  <p className="mt-0.5 text-[0.76rem] text-ink-50">
                    Room 102 · Premium Suite · 3 nights
                  </p>
                </div>
                <span className="rounded-full bg-brass-wash px-2.5 py-1 text-[0.72rem] font-semibold text-brass">
                  Direct Inward
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-linen bg-linen">
                {bookingInputs.map((input) => (
                  <div key={input.label} className="bg-paper px-4 py-3.5 hover:bg-sand/30 transition-colors">
                    <dt className="text-[0.72rem] font-medium text-ink-50">{input.label}</dt>
                    <dd className="mt-0.5 truncate text-[0.84rem] font-semibold text-ink">
                      {input.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 text-[0.76rem] leading-relaxed text-ink-50">
                Identity documents are collected in the same step, and room-level taxes come from
                invoice settings rather than being typed in by hand.
              </p>
            </div>
          </Reveal>

          {/* Connector */}
          <Reveal index={1} className="flex justify-center">
            <div className="flex items-center gap-3 lg:flex-col">
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-linen to-brass-soft lg:h-12 lg:w-px lg:bg-gradient-to-b" />
              <div className="flex size-9 items-center justify-center rounded-full bg-brass-wash border border-brass-soft/40 shadow-sm animate-pulse">
                <ArrowDown
                  aria-hidden
                  className="h-4 w-4 shrink-0 -rotate-90 text-brass lg:rotate-0"
                />
              </div>
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-brass-soft to-linen lg:h-12 lg:w-px lg:bg-gradient-to-b" />
            </div>
          </Reveal>

          {/* Result */}
          <Reveal index={2}>
            <div className="space-y-3.5">
              <div className="rounded-2xl border border-[#e5d5b0] bg-gradient-to-br from-state-occupied-wash via-paper to-state-occupied-wash p-6 shadow-lift transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-state-occupied text-ivory shadow-sm">
                    <Check aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <p className="text-[0.92rem] font-bold text-ink">Booking confirmed</p>
                </div>
                <dl className="mt-5 space-y-2.5 text-[0.84rem]">
                  <div className="flex justify-between gap-4 border-b border-linen-soft pb-2">
                    <dt className="text-ink-50">Guest</dt>
                    <dd className="font-semibold text-ink">Stored and updated</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-linen-soft pb-2">
                    <dt className="text-ink-50">Room charge</dt>
                    <dd data-numeric className="font-bold text-ink">
                      ₹16,200
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-ink-50">Advance recorded</dt>
                    <dd data-numeric className="font-bold text-emerald-700">
                      ₹15,000
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-linen bg-paper px-5 py-4 shadow-sm">
                <div>
                  <p data-numeric className="text-[1.15rem] font-bold text-ink">
                    102
                  </p>
                  <p className="text-[0.75rem] text-ink-50 font-medium">Premium · Floor 1</p>
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
