import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { features } from "@/data/features";

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-t border-linen py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeading
          marker="Modules"
          title="Everything the property needs, one system"
          lede={
            <p>
              Each department gets the screen it needs, and every screen writes to the same records.
              Nothing is re-keyed from one department into another.
            </p>
          }
        />

        <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-linen bg-linen sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <li key={feature.id} className="group bg-paper transition-all duration-300 hover:bg-brass-wash hover:-translate-y-1 hover:shadow-lg hover:z-10 relative">
                <Reveal index={index % 3}>
                  <Link
                    href={`/features#${feature.id}`}
                    className="flex h-full flex-col p-6 sm:p-7"
                  >
                    <Icon
                      aria-hidden
                      className="h-5 w-5 text-brass transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
                      strokeWidth={1.6}
                    />
                    <h3 className="optical-text mt-5 font-display text-[1.22rem] leading-snug font-medium">
                      {feature.title}
                    </h3>
                    <p className="mt-2.5 text-[0.92rem] leading-[1.65] text-ink-70">
                      {feature.summary}
                    </p>
                  </Link>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
