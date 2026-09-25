import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-linen bg-gradient-to-b from-paper to-sand/40 py-14 sm:py-16 lg:py-20">
      {/* Background Luminous Radial Sheen */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_100%,rgba(201,160,80,0.14)_0%,transparent_70%)]" />
        <div className="grain-layer absolute inset-0 opacity-30" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brass-soft/40 bg-brass-wash/80 px-4 py-1.5 text-[0.8rem] font-medium text-brass backdrop-blur-md shadow-sm mb-6">
              <Sparkles aria-hidden className="size-3.5 text-brass" />
              <span>Full Operational Control</span>
            </div>
            <h2 className="optical-display text-[2.2rem] leading-[1.06] font-medium sm:text-[2.8rem] lg:text-[3.3rem]">
              Bring every part of your hotel into one place
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[1.04rem] leading-[1.7] text-ink-70">
              We will walk you through the room board, a full stay from check-in to settlement, and
              a night audit on your own property&rsquo;s numbers.
            </p>
          </Reveal>
          <Reveal index={2}>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/contact" size="md" className="shadow-[0_8px_25px_-5px_rgba(25,58,107,0.5)] hover:shadow-[0_12px_30px_-5px_rgba(25,58,107,0.65)] group">
                Request a demo
                <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href="/features" variant="secondary" size="md" className="hover:border-navy/30">
                Explore AtithiDeva Modules
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
