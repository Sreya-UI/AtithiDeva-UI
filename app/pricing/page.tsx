import { Check, Sparkles } from "lucide-react";
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
    badge: "Essential",
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
    badge: "Most Popular",
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
    badge: "Enterprise",
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

      <Section tone="ivory" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-6 lg:grid-cols-3 items-stretch">
            {editions.map((edition, index) => (
              <li key={edition.name} className="flex">
                <Reveal
                  index={index}
                  className={`relative flex w-full flex-col rounded-3xl border p-8 lg:p-9 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    edition.featured
                      ? "border-brass-soft bg-gradient-to-b from-brass-wash/80 via-paper to-paper shadow-panel ring-2 ring-brass/20"
                      : "border-linen bg-paper shadow-lift hover:border-brass-soft/60"
                  }`}
                >
                  {edition.featured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brass via-brass-soft to-brass px-4 py-1 text-[0.75rem] font-bold text-white shadow-md uppercase tracking-wider">
                        <Sparkles className="size-3 text-white" />
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="flex items-baseline justify-between mt-1">
                    <h2 className="optical-text text-[1.4rem] font-bold text-ink">{edition.name}</h2>
                    <span className="rounded-full bg-sand/60 px-3 py-1 text-[0.72rem] font-semibold text-ink-70">
                      {edition.badge}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.86rem] font-semibold text-brass">{edition.scope}</p>
                  <p className="mt-4 text-[0.93rem] leading-[1.65] text-ink-70">{edition.body}</p>

                  <ul className="mt-7 space-y-3.5 border-t border-linen pt-7 text-[0.9rem] leading-[1.55] text-ink-70 flex-1">
                    {edition.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brass-wash text-brass">
                          <Check
                            aria-hidden
                            className="size-3.5"
                            strokeWidth={2.5}
                          />
                        </div>
                        <span className="font-medium text-ink/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <ButtonLink
                    href="/contact"
                    variant={edition.featured ? "primary" : "secondary"}
                    className={`mt-9 w-full shadow-sm ${edition.featured ? "shadow-[0_8px_20px_rgba(25,58,107,0.4)]" : ""}`}
                  >
                    Request a quote
                  </ButtonLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" rule className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading marker="Before you ask" title="Three things people ask first." />
            </div>

            <dl className="lg:col-span-7 space-y-3">
              {faqs.map((item, index) => (
                <Reveal
                  key={item.q}
                  index={index}
                  className="rounded-2xl border border-linen bg-ivory/60 p-6 transition-all hover:bg-paper hover:shadow-md hover:border-brass-soft/60"
                >
                  <dt className="optical-text text-[1.12rem] font-bold text-ink">{item.q}</dt>
                  <dd className="mt-3 max-w-xl text-[0.95rem] leading-[1.65] text-ink-70">
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
