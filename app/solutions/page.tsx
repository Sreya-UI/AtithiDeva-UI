import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/pages/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { solutionSegments } from "@/data/content";
import { breadcrumbSchema } from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Solutions",
  description:
    "How AtithiDeva fits independent hotels, resorts with food and beverage, banquet-led properties and multi-department operations — plus how a rollout is sequenced.",
  path: "/solutions",
});

const rollout = [
  {
    title: "Configure the masters",
    body: "Rooms, floors, room types, bed types and base rates. Meal plans, food categories and food items. Travel agents, customers and OTAs. Hotel, invoice and payment settings.",
  },
  {
    title: "Set permissions and users",
    body: "Roles and permissions decide which desk each person opens into. Front office, housekeeping, restaurant, banquet and finance can be separated or combined.",
  },
  {
    title: "Open the room board",
    body: "Every room carries one state — available, occupied, cleaning or maintenance — and arrivals and departures surface on top of it for the current day and the day before.",
  },
  {
    title: "Run a full cycle",
    body: "Take one booking through check-in, charges, checkout and housekeeping, then close the date with a night audit. That single loop exercises most of the system.",
  },
];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        marker="Solutions"
        title="The same system, weighted differently by property."
        lede="Room-led, food-led and event-led properties use different parts of AtithiDeva heavily. Nothing is bolted on for any of them — the emphasis simply moves."
      />

      <Section tone="ivory" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-2">
            {solutionSegments.map((segment, index) => (
              <li key={segment.title} className="flex">
                <Reveal
                  index={index % 2}
                  className="flex h-full w-full flex-col rounded-3xl border border-linen bg-paper p-8 lg:p-10 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brass-soft/70"
                >
                  <h2 className="optical-text text-[1.45rem] font-bold text-ink">{segment.title}</h2>
                  <p className="mt-3 text-[0.98rem] leading-[1.65] text-ink-70">{segment.body}</p>

                  <ul className="mt-auto flex flex-wrap gap-2.5 pt-8">
                    {segment.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-linen-soft bg-sand/40 px-3.5 py-1.5 text-[0.82rem] font-medium text-ink-70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="rollout" tone="paper" rule className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeading
            marker="Rollout"
            title="Four steps from an empty database to a closed business day."
            lede="A property is live once its masters are loaded and one complete guest cycle has been run end to end."
          />

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rollout.map((step, index) => (
              <li key={step.title} className="flex">
                <Reveal index={index % 4} className="flex h-full w-full flex-col rounded-2xl border border-linen bg-ivory/60 p-7 lg:p-8 shadow-sm transition-all duration-300 hover:bg-paper hover:shadow-xl hover:border-brass-soft/70 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span
                      data-numeric
                      aria-hidden
                      className="font-display text-[1.5rem] font-bold text-brass"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="size-2 rounded-full bg-brass-soft/50" />
                  </div>
                  <h3 className="optical-text mt-4 text-[1.2rem] font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-[1.65] text-ink-70 flex-1">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal index={2} className="mt-12">
            <ButtonLink href="/contact" className="shadow-[0_4px_14px_rgba(25,58,107,0.35)]">
              Talk through your rollout
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      <JsonLd
        id="schema-breadcrumb-solutions"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
    </>
  );
}
