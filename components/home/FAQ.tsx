import { Plus } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { faqs } from "@/data/content";

/**
 * Native <details> elements: keyboard accessible and open-able with no
 * JavaScript at all.
 */
export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <SectionHeading
            marker="Questions"
            title="How the rules behave"
            lede={
              <p>
                The answers below describe what the system does, not what it aspires to.
              </p>
            }
          />

          <div className="divide-y divide-linen border-y border-linen">
            {faqs.map((faq, index) => (
              <Reveal key={faq.question} index={Math.min(index, 3)}>
                <details className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="optical-text font-display text-[1.08rem] leading-snug font-medium sm:text-[1.15rem]">
                      {faq.question}
                    </h3>
                    <Plus
                      aria-hidden
                      className="mt-0.5 h-4 w-4 shrink-0 text-brass transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-45"
                      strokeWidth={1.8}
                    />
                  </summary>
                  <p className="mt-3 max-w-[66ch] pr-10 text-[0.92rem] leading-[1.75] text-ink-70">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
