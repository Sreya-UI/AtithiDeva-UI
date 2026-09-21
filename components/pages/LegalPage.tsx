import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/pages/PageHeader";

export type LegalSection = { heading: string; body: string[] };

/** Shared shell for the privacy and terms pages. */
export function LegalPage({
  marker,
  title,
  lede,
  updated,
  sections,
}: {
  marker: string;
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHeader marker={marker} title={title} lede={lede}>
        <p className="mt-6 text-[0.82rem] text-ink-50">Last updated {updated}</p>
      </PageHeader>

      <Section tone="paper">
        <Container>
          <div className="max-w-[46rem]">
            <Reveal>
              <p className="rounded-xl border border-linen bg-ivory p-5 text-[0.85rem] leading-relaxed text-ink-50">
                This is a template. Have it reviewed and adapted to your jurisdiction and actual
                data practices before publishing.
              </p>
            </Reveal>

            {sections.map((section, index) => (
              <Reveal key={section.heading} index={Math.min(index, 3)}>
                <section className="mt-12 border-t border-linen pt-10 first-of-type:mt-14">
                  <h2 className="optical-text text-[1.3rem] font-medium">{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="mt-4 text-[0.97rem] leading-[1.75] text-ink-70"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
