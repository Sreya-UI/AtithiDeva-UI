import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

export function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-linen py-24 sm:py-28 lg:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_50%_100%,#dfeaf6_0%,#f8fafd_62%)]" />
        <div className="grain-layer absolute inset-0 opacity-40" />
      </div>

      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="optical-display text-[2.2rem] leading-[1.06] font-medium sm:text-[2.8rem] lg:text-[3.2rem]">
              Bring every part of your hotel into one place
            </h2>
          </Reveal>
          <Reveal index={1}>
            <p className="mx-auto mt-6 max-w-[52ch] text-[1.02rem] leading-[1.7] text-ink-70">
              We will walk you through the room board, a full stay from check-in to settlement, and
              a night audit on your own property&rsquo;s numbers.
            </p>
          </Reveal>
          <Reveal index={2}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">
                Request a demo
                <ArrowRight aria-hidden className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/features" variant="secondary">
                Explore AtithiDeva
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
