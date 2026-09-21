import { Check } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { SectionHeading } from "@/components/common/SectionHeading";
import { PageHeader } from "@/components/pages/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Pricing",
  description:
    "AtithiDeva is quoted per property, based on the modules a hotel runs. See what each edition covers and ask for a quote.",
  path: "/pricing",
});

const editions = [
  {
    name: "Front Office",
    scope: "Rooms, reservations and billing",
    body: "For properties that need the room board, the folio and a clean invoice, without food or event operations.",
    includes: [
      "Room master and room state board",
      "Reservations, check-in and checkout",
      "Discounts, GST and invoice generation",
      "Housekeeping and maintenance cycle",
      "Payment statements and occupancy reports",
    ],
  },
  {
    name: "Full Property",
    scope: "Front office, F&B and finance",
    body: "The complete operational set for a hotel running rooms alongside a restaurant, with the business day closed in the system.",
    includes: [
      "Everything in Front Office",
      "Meal plans, food categories and food items",
      "Guest and room meals charged to the folio",
      "Business desk, finance desk and cash box",
      "Night audit with PDF and CSV export",
    ],
    featured: true,
  },
  {
    name: "Property & Events",
    scope: "Everything, including banquets",
    body: "For properties where events carry their own sales cycle beside room occupancy.",
    includes: [
      "Everything in Full Property",
      "Banquet enquiries and quotations",
      "Event calendar and execution tracking",
      "Additional services per event",
      "Banquet payments and reports",
    ],
  },
];

const faqs = [
  {
    q: "Why is there no price on this page?",
    a: "Because it would be a guess. What a property pays depends on room count, which modules it runs and how the rollout is handled, so the figure is quoted after a short conversation rather than printed here.",
  },
  {
    q: "Can we start with part of the system?",
    a: "Yes. The masters and the room board are the foundation; restaurant, banquet and finance desks sit on top of them and can be opened later without re-entering data.",
  },
  {
    q: "What do we need before a demo?",
    a: "Nothing prepared. It helps to know your room count, room types, whether you run food service or banquets, and who closes the business day today.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        marker="Pricing"
        title="Quoted per property, once we know what you run."
        lede="Three editions, separated by which desks a property opens. The figure attached to each one depends on your room count and rollout, so we quote it rather than publish it."
      />

      <Section tone="ivory">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3">
            {editions.map((edition, index) => (
              <li key={edition.name}>
                <Reveal
                  index={index}
                  className={`flex h-full flex-col rounded-2xl border p-8 lg:p-9 ${
                    edition.featured
                      ? "border-brass-soft bg-brass-wash"
                      : "border-linen bg-paper"
                  }`}
                >
                  <h2 className="optical-text text-[1.35rem] font-medium">{edition.name}</h2>
                  <p className="mt-1.5 text-[0.84rem] text-brass">{edition.scope}</p>
                  <p className="mt-4 text-[0.94rem] leading-[1.6] text-ink-70">{edition.body}</p>

                  <ul className="mt-7 space-y-3 border-t border-linen pt-7 text-[0.89rem] leading-[1.5] text-ink-70">
                    {edition.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <Check
                          aria-hidden
                          className="mt-0.5 size-[0.95rem] shrink-0 text-brass"
                          strokeWidth={2}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href="/contact"
                    variant={edition.featured ? "primary" : "secondary"}
                    className="mt-9 w-full"
                  >
                    Request a quote
                  </ButtonLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" rule>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading marker="Before you ask" title="Three things people ask first." />
            </div>

            <dl className="lg:col-span-7">
              {faqs.map((item, index) => (
                <Reveal
                  key={item.q}
                  index={index}
                  className="border-t border-linen py-7 first:border-t-0 first:pt-0"
                >
                  <dt className="optical-text text-[1.08rem] font-medium text-ink">{item.q}</dt>
                  <dd className="mt-2.5 max-w-xl text-[0.95rem] leading-[1.65] text-ink-70">
                    {item.a}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      <JsonLd
        id="schema-breadcrumb-pricing"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
    </>
  );
}
