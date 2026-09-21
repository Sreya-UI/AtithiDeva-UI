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
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/contact">Request a demo</ButtonLink>
          <ButtonLink href="/solutions" variant="secondary">
            See it by property type
          </ButtonLink>
        </div>
      </PageHeader>

      <Section tone="ivory" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-linen bg-linen sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <li key={feature.id} id={feature.id} className="scroll-mt-28 bg-paper">
                  <Reveal index={index % 3} className="flex h-full flex-col p-7 lg:p-8">
                    <Icon aria-hidden className="size-5 text-brass" strokeWidth={1.5} />

                    <h2 className="optical-text mt-6 text-[1.28rem] font-medium">
                      {feature.title}
                    </h2>
                    <p className="mt-2.5 text-[0.94rem] leading-[1.6] text-ink-70">
                      {feature.summary}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-linen pt-6 text-[0.87rem] leading-[1.55] text-ink-50">
                      {feature.detail.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-[0.55em] size-1 shrink-0 rounded-full bg-brass-soft"
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

      <Section tone="ink" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="optical-display max-w-xl text-[1.9rem] leading-[1.1] font-medium text-ivory sm:text-[2.4rem]">
              Want to see these modules against your own property?
            </h2>
            <ButtonLink href="/contact" className="shrink-0 bg-ivory text-ink hover:bg-brass-wash">
              Book a walkthrough
              <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
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
