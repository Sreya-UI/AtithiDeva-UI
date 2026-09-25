import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { sampleFolio } from "@/data/content";
import { formatINR } from "@/lib/utils";

export function Billing() {
  const balance = sampleFolio.grandTotal - sampleFolio.paid;
  const paidShare = Math.round((sampleFolio.paid / sampleFolio.grandTotal) * 100);

  return (
    <section
      id="billing"
      className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              marker="Billing"
              title="A folio that agrees with the ledger"
              lede={
                <p>
                  Room charges, extras, food and service charges, the meal plan, the discount and
                  GST resolve into one payable figure. Checkout then works from the booking&rsquo;s
                  own payment records, which is why a bill can never present itself as settled when
                  money is still outstanding.
                </p>
              }
            />

            <Reveal index={3}>
              <ul className="mt-10 space-y-3.5 border-t border-linen pt-7 text-[0.93rem] leading-[1.65] text-ink-70">
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-brass-soft mt-2.5 shrink-0" />
                  <span>Discounts apply as a percentage or a fixed amount, at the rate level.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-brass-soft mt-2.5 shrink-0" />
                  <span>GST comes from invoice settings, including whether it is included in the rate and how CGST and SGST are split.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="size-1.5 rounded-full bg-brass-soft mt-2.5 shrink-0" />
                  <span>The invoice carries hotel details, guest details, the itinerary, itemised charges, taxes and the final payable amount.</span>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="overflow-hidden rounded-2xl border border-linen bg-ivory shadow-panel transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
              <div className="flex items-baseline justify-between border-b border-linen bg-paper px-5 py-4">
                <div>
                  <p className="text-[0.88rem] font-bold text-ink">Guest Folio</p>
                  <p className="text-[0.74rem] text-ink-50">Room 102 · R. Menon · 3 nights</p>
                </div>
                <span className="rounded-full bg-state-occupied-wash px-3 py-1 text-[0.72rem] font-semibold text-state-occupied">
                  Pending Settlement
                </span>
              </div>

              <dl className="divide-y divide-linen-soft px-5">
                {sampleFolio.lines.map((line) => (
                  <div key={line.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <dt className="text-[0.88rem] font-medium text-ink">{line.label}</dt>
                      <p className="text-[0.74rem] text-ink-50">{line.detail}</p>
                    </div>
                    <dd
                      data-numeric
                      className={
                        line.kind === "subtract"
                          ? "text-[0.92rem] font-semibold text-state-available"
                          : "text-[0.92rem] font-medium text-ink"
                      }
                    >
                      {line.kind === "subtract" ? "−" : ""}
                      {formatINR(line.amount)}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-linen bg-paper px-5 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.92rem] font-bold text-ink">Grand total</span>
                  <span
                    data-numeric
                    className="optical-text font-display text-[1.6rem] leading-none font-medium text-navy"
                  >
                    {formatINR(sampleFolio.grandTotal)}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="mt-5 h-2 overflow-hidden rounded-full bg-linen-soft"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-all duration-500"
                    style={{ width: `${paidShare}%` }}
                  />
                </div>

                <div className="mt-3.5 flex items-baseline justify-between text-[0.85rem]">
                  <span className="text-ink-70 font-medium">
                    Total paid{" "}
                    <span data-numeric className="font-bold text-emerald-700">
                      {formatINR(sampleFolio.paid)}
                    </span>
                  </span>
                  <span className="text-ink-70 font-medium">
                    Balance due{" "}
                    <span data-numeric className="font-bold text-rose-600">
                      {formatINR(balance)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <DemoNote className="mt-3" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
