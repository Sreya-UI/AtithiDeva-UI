import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { banquetStages } from "@/data/content";

/** Sample calendar strip. Demo data only. */
const calendar = [
  { date: "14", day: "Mon", event: null },
  { date: "15", day: "Tue", event: { name: "Reception", hall: "Darbar Hall" } },
  { date: "16", day: "Wed", event: null },
  { date: "17", day: "Thu", event: { name: "Conference", hall: "Aangan" } },
  { date: "18", day: "Fri", event: { name: "Sangeet", hall: "Darbar Hall" } },
  { date: "19", day: "Sat", event: null },
  { date: "20", day: "Sun", event: { name: "Wedding", hall: "Darbar Hall" } },
];

export function Banquet() {
  return (
    <section
      id="banquets"
      className="scroll-mt-24 bg-ink py-10 text-ivory sm:py-12 lg:py-14"
    >
      <Container>
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-[0.78rem] text-ivory/50">
            <span aria-hidden className="h-px w-8 bg-brass-soft" />
            <span>Banquets and events</span>
          </div>
          <h2 className="optical-display mt-5 text-[2.1rem] leading-[1.06] font-medium text-ivory sm:text-[2.6rem] lg:text-[3rem]">
            Events run on a sales cycle, not a room chart
          </h2>
          <p className="mt-5 text-[1.02rem] leading-[1.65] text-ivory/65">
            A banquet is won long before it is served. AtithiDeva follows it from the first enquiry
            through quotation, confirmation, the calendar, the night itself, the extras added on the
            day, collection and reporting.
          </p>
        </div>

        {/* Pipeline */}
        <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ivory/12 bg-ivory/12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {banquetStages.map((stage, index) => (
            <li key={stage.label} className="bg-ink p-5 sm:p-6">
              <Reveal index={index % 4}>
                <div className="flex items-baseline gap-2.5">
                  <span data-numeric className="text-[0.72rem] font-semibold text-brass-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="optical-text font-display text-[1.1rem] leading-snug font-medium text-ivory">
                    {stage.label}
                  </h3>
                </div>
                <p className="mt-2 text-[0.85rem] leading-[1.6] text-ivory/55">{stage.note}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Calendar strip */}
        <Reveal index={2}>
          <div className="mt-10 overflow-hidden rounded-xl border border-ivory/12 bg-ivory/[0.04]">
            <div className="flex items-center justify-between border-b border-ivory/12 px-5 py-3.5">
              <p className="text-[0.84rem] font-semibold text-ivory">Event calendar</p>
              <p className="text-[0.74rem] text-ivory/45">September</p>
            </div>
            <div className="grid grid-cols-4 gap-px bg-ivory/10 sm:grid-cols-7">
              {calendar.map((cell) => (
                <div key={cell.date} className="min-h-[104px] bg-ink p-3.5">
                  <p className="text-[0.7rem] text-ivory/40">{cell.day}</p>
                  <p data-numeric className="text-[1.05rem] font-medium text-ivory">
                    {cell.date}
                  </p>
                  {cell.event ? (
                    <div className="mt-2.5 rounded-md border-l-2 border-brass-soft bg-brass/15 px-2 py-1.5">
                      <p className="truncate text-[0.74rem] font-medium text-ivory">
                        {cell.event.name}
                      </p>
                      <p className="truncate text-[0.68rem] text-ivory/50">{cell.event.hall}</p>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <DemoNote className="mt-3 text-ivory/35" />
        </Reveal>
      </Container>
    </section>
  );
}
