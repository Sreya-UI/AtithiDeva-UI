import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { howItWorks } from "@/data/content";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <SectionHeading
          marker="Getting started"
          title="From empty system to a closed business day"
          lede={<p>Five stages, in the order a property actually goes through them.</p>}
        />

        <ol className="mt-14 lg:mt-16">
          {howItWorks.map((item, index) => (
            <li key={item.step} className="border-t border-linen last:border-b">
              <Reveal index={index}>
                <div className="grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.4fr)] sm:items-baseline">
                  <span
                    data-numeric
                    className="optical-display font-display text-[1.6rem] leading-none font-medium text-brass sm:text-[1.9rem]"
                  >
                    {item.step}
                  </span>
                  <h3 className="optical-text font-display text-[1.3rem] leading-snug font-medium sm:text-[1.5rem]">
                    {item.title}
                  </h3>
                  <p className="max-w-[62ch] text-[0.95rem] leading-[1.7] text-ink-70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
