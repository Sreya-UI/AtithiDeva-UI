import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/pages/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { features } from "@/data/features";
import { breadcrumbSchema } from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Features",
  description:
    "Front desk, reservations, room operations, billing, housekeeping, restaurant, banquets, finance, night audit and reporting — every AtithiDeva module, described by what it actually does.",
  path: "/features",
});

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        marker="Modules"
        title="Every department, working from the same record."
        lede="AtithiDeva is one system with several desks attached to it. Below is what each desk holds, written from the operational rules the product runs on rather than from a feature checklist."
      >
        <div className="mt-8 flex flex-wrap gap-3.5">
          <ButtonLink href="/contact" className="shadow-[0_4px_14px_rgba(25,58,107,0.35)]">
            Request a demo
          </ButtonLink>
          <ButtonLink href="/solutions" variant="secondary">
            See it by property type
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="ivory" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={feature.id} id={feature.id} className="scroll-mt-28 flex">
                  <Reveal index={index % 3} className="flex h-full w-full flex-col rounded-3xl border border-linen bg-paper p-7 lg:p-8 shadow-lift transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-brass-soft/70">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-brass-wash text-brass shadow-sm">
                      <Icon aria-hidden className="size-6 text-brass" strokeWidth={1.8} />
                    </div>

                    <h2 className="optical-text mt-6 text-[1.32rem] font-bold text-ink">
                      {feature.title}
                    </h2>
                    <p className="mt-2.5 text-[0.94rem] leading-[1.65] text-ink-70">
                      {feature.summary}
                    </p>

                    <ul className="mt-6 space-y-3 border-t border-linen pt-6 text-[0.88rem] leading-[1.55] text-ink-70 flex-1">
                      {feature.detail.map((point) => (
                        <li key={point} className="flex items-start gap-3">
                          <span
                            aria-hidden
                            className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-brass"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="ink" className="py-20 sm:py-24 bg-gradient-to-r from-ink via-navy-deep to-ink">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-[0.8rem] font-semibold uppercase tracking-wider text-brass-soft">Custom Walkthrough</span>
              <h2 className="optical-display mt-2 max-w-xl text-[2rem] leading-[1.1] font-medium text-ivory sm:text-[2.6rem]">
                Want to see these modules against your own property?
              </h2>
            </div>
            <ButtonLink href="/contact" size="md" className="shrink-0 bg-ivory text-ink hover:bg-brass-wash shadow-xl">
              Book a walkthrough
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <JsonLd
        id="schema-breadcrumb-features"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Features", path: "/features" },
        ])}
      />
    </>
  );
}
