import { FileDown, FileSpreadsheet } from "lucide-react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { RevenueBars } from "@/components/product/RevenueBars";
import { sampleNightAudit } from "@/data/content";
import { formatINR } from "@/lib/utils";

const reports = [
  "Payment statements",
  "Occupancy metrics",
  "Revenue reports",
  "Restaurant reports",
  "Invoices and detailed financial views",
];

export function Finance() {
  return (
    <section
      id="finance"
      className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <SectionHeading
          marker="Finance and night audit"
          title="Close the business date, not just the shift"
          lede={
            <p>
              The night audit is where the day stops being a set of opinions. Revenue is totalled by
              department, collection is split by method, cash is reconciled against what was in the
              drawer, and occupancy, ADR and RevPAR are stated for the date being closed.
            </p>
          }
        />

        <div className="mt-8 grid gap-5 lg:mt-16 lg:grid-cols-3">
          {/* Revenue */}
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-xl border border-linen bg-paper p-6 shadow-lift sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="text-[0.86rem] font-semibold text-ink">Revenue by department</p>
                  <p className="text-[0.72rem] text-ink-50">Business date 18 Sep</p>
                </div>
                <p
                  data-numeric
                  className="optical-text font-display text-[1.8rem] leading-none font-medium text-ink"
                >
                  {formatINR(
                    sampleNightAudit.revenue.reduce((total, item) => total + item.value, 0),
                  )}
                </p>
              </div>

              <div className="mt-7">
                <RevenueBars data={sampleNightAudit.revenue} />
              </div>

              <div className="mt-8 grid gap-6 border-t border-linen pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[0.8rem] font-semibold text-ink">Collection</p>
                  <div className="mt-3">
                    <RevenueBars data={sampleNightAudit.collection} tone="olive" />
                  </div>
                </div>
                <div>
                  <p className="text-[0.8rem] font-semibold text-ink">Cash movement</p>
                  <dl className="mt-3 space-y-2.5">
                    {sampleNightAudit.cash.map((row) => (
                      <div key={row.label} className="flex justify-between text-[0.82rem]">
                        <dt className="text-ink-70">{row.label}</dt>
                        <dd data-numeric className="font-medium text-ink">
                          {formatINR(row.value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2 border-t border-linen pt-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-linen bg-ivory px-3 py-1.5 text-[0.76rem] text-ink-70">
                  <FileDown aria-hidden className="h-3.5 w-3.5 text-brass" />
                  PDF
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-linen bg-ivory px-3 py-1.5 text-[0.76rem] text-ink-70">
                  <FileSpreadsheet aria-hidden className="h-3.5 w-3.5 text-brass" />
                  CSV export
                </span>
                <span className="inline-flex items-center rounded-full border border-linen bg-ivory px-3 py-1.5 text-[0.76rem] text-ink-70">
                  Audit tasks confirmed manually
                </span>
              </div>
            </div>
          </Reveal>

          {/* Metrics + reports */}
          <div className="space-y-5">
            <Reveal index={1}>
              <div className="rounded-xl border border-linen bg-paper p-6 shadow-lift">
                <p className="text-[0.86rem] font-semibold text-ink">Performance</p>
                <dl className="mt-5 space-y-6">
                  {sampleNightAudit.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dt className="text-[0.76rem] text-ink-50">{metric.label}</dt>
                      <dd
                        data-numeric
                        className="optical-text mt-1 font-display text-[2rem] leading-none font-medium text-ink"
                      >
                        {metric.value}
                      </dd>
                      <p className="mt-1.5 text-[0.74rem] text-ink-30">{metric.note}</p>
                    </div>
                  ))}
                </dl>
                <DemoNote className="mt-6" />
              </div>
            </Reveal>

            <Reveal index={2}>
              <div className="rounded-xl border border-linen bg-sand p-6">
                <p className="text-[0.86rem] font-semibold text-ink">Reporting</p>
                <p className="mt-2 text-[0.86rem] leading-[1.6] text-ink-70">
                  Daily control and end-of-day closure read from the same records.
                </p>
                <ul className="mt-4 space-y-2">
                  {reports.map((report) => (
                    <li
                      key={report}
                      className="flex items-start gap-2.5 text-[0.86rem] text-ink-70"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-brass"
                      />
                      {report}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
