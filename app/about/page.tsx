import { Container } from "@/components/common/Container";
import { ButtonLink } from "@/components/common/Button";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/pages/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "About",
  description:
    "AtithiDeva is a hotel property management system built around how a property actually runs: one state per room, one ledger per booking, and a business day that closes.",
  path: "/about",
});

const beliefs = [
  {
    title: "A room has one state",
    body: "Available, occupied, cleaning or maintenance. Arrivals and departures are markers on top of that state, not states of their own. Ambiguity on the board becomes an argument at the front desk.",
  },
  {
    title: "The booking holds the money",
    body: "Checkout reads the booking's payment records and pending amount, not a figure recomputed on screen. A folio that disagrees with the ledger is worse than no folio.",
  },
  {
    title: "Checkout is not the end",
    body: "A room that has been vacated is not a room that can be sold. It returns to the board after cleaning is completed and reception has inspected it.",
  },
  {
    title: "Configuration lives in one place",
    body: "Rates, taxes, meal plans and food items are master data. When they are edited in one screen, every department bills from the same numbers.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        marker="About"
        title="Built around the rhythm of a working property."
        lede="AtithiDeva came out of the operational details that decide whether a hotel's evening goes smoothly: who is arriving, which rooms are back, what the folio owes, and whether the day closed clean."
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                marker="Position"
                title="A property management system, not a booking widget."
                lede="The guest-facing side of hospitality is well served. The side that runs the property — the board, the folio, the housekeeping loop and the night audit — is where the work actually happens, and that is what this system is for."
              />
            </div>

            <div className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-linen bg-linen sm:grid-cols-2">
                {beliefs.map((belief, index) => (
                  <li key={belief.title} className="bg-paper">
                    <Reveal index={index % 2} className="h-full p-7 lg:p-8">
                      <h2 className="optical-text text-[1.14rem] font-medium">{belief.title}</h2>
                      <p className="mt-3 text-[0.92rem] leading-[1.65] text-ink-70">
                        {belief.body}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="paper" rule>
        <Container>
          <div className="max-w-2xl">
            <SectionHeading
              marker="What we publish"
              title="No numbers we cannot stand behind."
              lede="You will not find customer counts, hours saved or revenue lifted on this site. The figures inside the product visuals are sample data, labelled as such, and everything described in the modules is something the system does."
            />
            <Reveal index={3} className="mt-9">
              <ButtonLink href="/contact">Ask us anything</ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      <JsonLd
        id="schema-breadcrumb-about"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
