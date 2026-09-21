import { sampleFolio, sampleNightAudit } from "@/data/content";
import { formatINR } from "@/lib/utils";

const fields = [
  { label: "Guest name", value: "R. Menon" },
  { label: "GR number", value: "GR-20418" },
  { label: "Mobile", value: "+91 98xxx xxx12" },
  { label: "ID type", value: "Passport" },
  { label: "Nationality", value: "Indian" },
  { label: "Check-in", value: "15 Sep 2026" },
  { label: "Check-out", value: "18 Sep 2026" },
  { label: "Nights", value: "3" },
  { label: "Adults", value: "2" },
  { label: "Children", value: "1" },
  { label: "Booking source", value: "Direct" },
  { label: "Booking type", value: "Confirmed" },
];

export function MockCheckIn() {
  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.88rem] font-semibold text-ink">Check-in · Room 102</p>
        <span className="rounded-full bg-state-available-wash px-2.5 py-1 text-[0.7rem] font-medium text-state-available">
          Available
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3.5 sm:grid-cols-3">
        {fields.map((field) => (
          <div key={field.label} className="border-b border-linen-soft pb-2">
            <dt className="text-[0.68rem] text-ink-50">{field.label}</dt>
            <dd data-numeric className="mt-0.5 truncate text-[0.82rem] text-ink">
              {field.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Meal plan", value: "CP · Breakfast" },
          { label: "Discount", value: "10% on rate" },
          { label: "Advance", value: "₹15,000 · Card" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg bg-brass-wash px-3.5 py-2.5">
            <p className="text-[0.68rem] text-brass">{item.label}</p>
            <p data-numeric className="mt-0.5 text-[0.82rem] font-medium text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MockCheckout() {
  const balance = sampleFolio.grandTotal - sampleFolio.paid;

  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.88rem] font-semibold text-ink">Checkout · Room 102</p>
        <span className="rounded-full bg-state-occupied-wash px-2.5 py-1 text-[0.7rem] font-medium text-state-occupied">
          Pending
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Grand total", value: formatINR(sampleFolio.grandTotal), tone: "text-ink" },
          { label: "Total paid", value: formatINR(sampleFolio.paid), tone: "text-state-available" },
          { label: "Balance due", value: formatINR(balance), tone: "text-state-maintenance" },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-linen bg-ivory px-4 py-3">
            <p className="text-[0.7rem] text-ink-50">{item.label}</p>
            <p
              data-numeric
              className={`optical-text mt-1 font-display text-[1.35rem] leading-none font-medium ${item.tone}`}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-5 divide-y divide-linen-soft">
        {sampleFolio.lines.map((line) => (
          <div key={line.label} className="flex justify-between py-2.5 text-[0.82rem]">
            <dt className="text-ink-70">{line.label}</dt>
            <dd data-numeric className="text-ink">
              {line.kind === "subtract" ? "−" : ""}
              {formatINR(line.amount)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function MockNightAudit() {
  const total = sampleNightAudit.revenue.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-5">
      <div className="flex items-baseline justify-between">
        <p className="text-[0.88rem] font-semibold text-ink">Night audit · 18 Sep</p>
        <span className="rounded-full bg-state-cleaning-wash px-2.5 py-1 text-[0.7rem] font-medium text-state-cleaning">
          In progress
        </span>
      </div>

      <p
        data-numeric
        className="optical-text mt-4 font-display text-[2.1rem] leading-none font-medium text-ink"
      >
        {formatINR(total)}
      </p>
      <p className="mt-1 text-[0.72rem] text-ink-50">Total revenue for the business date</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        {sampleNightAudit.revenue.map((item) => (
          <div key={item.label} className="rounded-lg border border-linen bg-ivory px-3.5 py-3">
            <p className="text-[0.68rem] text-ink-50">{item.label}</p>
            <p data-numeric className="mt-1 text-[0.92rem] font-semibold text-ink">
              {formatINR(item.value)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {sampleNightAudit.metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-brass-wash px-3.5 py-3">
            <p className="text-[0.68rem] text-brass">{metric.label}</p>
            <p data-numeric className="mt-1 text-[1.05rem] font-semibold text-ink">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
