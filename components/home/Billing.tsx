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
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
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
              <ul className="mt-10 space-y-3 border-t border-linen pt-7 text-[0.92rem] leading-[1.65] text-ink-70">
                <li>Discounts apply as a percentage or a fixed amount, at the rate level.</li>
                <li>
                  GST comes from invoice settings, including whether it is included in the rate and
                  how CGST and SGST are split.
                </li>
                <li>
                  The invoice carries hotel details, guest details, the itinerary, itemised charges,
                  taxes and the final payable amount.
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="overflow-hidden rounded-xl border border-linen bg-ivory shadow-lift">
              <div className="flex items-baseline justify-between border-b border-linen bg-paper px-5 py-4">
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">Folio</p>
                  <p className="text-[0.72rem] text-ink-50">Room 102 · R. Menon · 3 nights</p>
                </div>
                <span className="rounded-full bg-state-occupied-wash px-2.5 py-1 text-[0.7rem] font-medium text-state-occupied">
                  Pending
                </span>
              </div>

              <dl className="divide-y divide-linen-soft px-5">
                {sampleFolio.lines.map((line) => (
                  <div key={line.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <dt className="text-[0.88rem] text-ink">{line.label}</dt>
                      <p className="text-[0.72rem] text-ink-50">{line.detail}</p>
                    </div>
                    <dd
                      data-numeric
                      className={
                        line.kind === "subtract"
                          ? "text-[0.9rem] font-medium text-state-available"
                          : "text-[0.9rem] font-medium text-ink"
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
                  <span className="text-[0.9rem] font-semibold text-ink">Grand total</span>
                  <span
                    data-numeric
                    className="optical-text font-display text-[1.5rem] leading-none font-medium text-ink"
                  >
                    {formatINR(sampleFolio.grandTotal)}
                  </span>
                </div>

                <div
                  aria-hidden
                  className="mt-5 h-1.5 overflow-hidden rounded-full bg-linen-soft"
                >
                  <div
                    className="h-full rounded-full bg-state-available"
                    style={{ width: `${paidShare}%` }}
                  />
                </div>

                <div className="mt-3 flex items-baseline justify-between text-[0.84rem]">
                  <span className="text-ink-50">
                    Total paid{" "}
                    <span data-numeric className="font-medium text-ink">
                      {formatINR(sampleFolio.paid)}
                    </span>
                  </span>
                  <span className="text-ink-50">
                    Balance due{" "}
                    <span data-numeric className="font-medium text-state-maintenance">
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
