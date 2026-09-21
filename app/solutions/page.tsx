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

      <Section tone="ivory">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-2">
            {solutionSegments.map((segment, index) => (
              <li key={segment.title}>
                <Reveal
                  index={index % 2}
                  className="flex h-full flex-col rounded-2xl border border-linen bg-paper p-8 lg:p-10"
                >
                  <h2 className="optical-text text-[1.4rem] font-medium">{segment.title}</h2>
                  <p className="mt-3 text-[0.97rem] leading-[1.65] text-ink-70">{segment.body}</p>

                  <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                    {segment.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-linen bg-ivory px-3.5 py-1.5 text-[0.8rem] text-ink-50"
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

      <Section id="rollout" tone="paper" rule>
        <Container>
          <SectionHeading
            marker="Rollout"
            title="Four steps from an empty database to a closed business day."
            lede="A property is live once its masters are loaded and one complete guest cycle has been run end to end."
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-linen bg-linen sm:grid-cols-2">
            {rollout.map((step, index) => (
              <li key={step.title} className="bg-paper">
                <Reveal index={index % 2} className="h-full p-8 lg:p-10">
                  <span
                    data-numeric
                    aria-hidden
                    className="text-[0.82rem] text-brass"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="optical-text mt-4 text-[1.22rem] font-medium">{step.title}</h3>
                  <p className="mt-3 text-[0.93rem] leading-[1.65] text-ink-70">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal index={2} className="mt-12">
            <ButtonLink href="/contact">Talk through your rollout</ButtonLink>
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
