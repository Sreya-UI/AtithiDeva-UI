import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { quotationExample } from "@/data/content";
import { formatINR } from "@/lib/utils";

/**
 * Quotations, worked backwards from the number the guest actually asked for.
 * Replaces the earlier operational-journey timeline on the client's request.
 */
export function QuotationFlow() {
  return (
    <section
      id="quotations"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <SectionHeading
              marker="Quotations"
              title="Quote the number the guest asked for"
              lede={
                <p>
                  A corporate client or a travel agent rarely asks for a rate — they ask for a
                  final figure. AtithiDeva takes that number and works backwards through the
                  discount and GST to find the base rate that produces it exactly, so the
                  quotation is correct before it is ever sent.
                </p>
              }
            />

            <Reveal index={3}>
              <ul className="mt-10 space-y-3 border-t border-linen pt-7 text-[0.92rem] leading-[1.65] text-ink-70">
                <li>Enter the all-inclusive figure the guest or agent asked for.</li>
                <li>
                  The base rate, negotiated discount and GST are back-calculated to add up to
                  that exact number.
                </li>
                <li>A confirmed quotation converts directly into a booking, with the same figures carried across.</li>
              </ul>
            </Reveal>
          </div>

          <Reveal index={2}>
            <div className="overflow-hidden rounded-xl border border-linen bg-ivory shadow-lift transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex items-baseline justify-between border-b border-linen bg-paper px-5 py-4">
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">Quotation</p>
                  <p className="text-[0.72rem] text-ink-50">
                    {quotationExample.quoteNumber} · {quotationExample.guest} ·{" "}
                    {quotationExample.nights} nights
                  </p>
                </div>
                <span className="rounded-full bg-navy-wash px-2.5 py-1 text-[0.7rem] font-medium text-navy">
                  Quoted
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-4 border-b border-linen-soft px-5 py-4">
                <span className="text-[0.88rem] text-ink-70">Asked for, all-inclusive</span>
                <span data-numeric className="text-[0.98rem] font-semibold text-ink">
                  {formatINR(quotationExample.askedFor)}
                </span>
              </div>

              <div className="px-5 pt-4 pb-1">
                <p className="text-[0.7rem] tracking-wide text-ink-30 uppercase">
                  Back-calculated
                </p>
              </div>

              <dl className="divide-y divide-linen-soft px-5">
                {quotationExample.lines.map((line) => (
                  <div key={line.label} className="flex items-baseline justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <dt className="text-[0.88rem] text-ink">{line.label}</dt>
                      <p className="text-[0.72rem] text-ink-50">{line.detail}</p>
                    </div>
                    <dd
                      data-numeric
                      className={
                        line.amount < 0
                          ? "text-[0.9rem] font-medium text-state-available"
                          : "text-[0.9rem] font-medium text-ink"
                      }
                    >
                      {line.amount < 0 ? "−" : ""}
                      {formatINR(Math.abs(line.amount))}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-linen bg-paper px-5 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[0.9rem] font-semibold text-ink">Quotation total</span>
                  <span
                    data-numeric
                    className="optical-text font-display text-[1.5rem] leading-none font-medium text-ink"
                  >
                    {formatINR(quotationExample.total)}
                  </span>
                </div>
                <p className="mt-1.5 text-[0.76rem] text-ink-50">
                  Matches the figure the guest asked for, exactly.
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-linen bg-navy-wash px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 aria-hidden className="size-4 text-navy" strokeWidth={2} />
                  <span className="text-[0.84rem] text-navy">Converted to booking</span>
                </div>
                <span className="flex items-center gap-1.5 text-[0.78rem] font-medium text-navy">
                  {quotationExample.convertedBooking}
                  <ArrowRight aria-hidden className="size-3.5" strokeWidth={2} />
                </span>
              </div>
            </div>
            <DemoNote className="mt-3" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
