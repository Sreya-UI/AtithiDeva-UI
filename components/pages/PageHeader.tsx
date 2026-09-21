import type { ReactNode } from "react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

/**
 * The opening block of every inner page. Deliberately quieter than the home
 * hero so the hero stays the one loud moment on the site.
 */
export function PageHeader({
  marker,
  title,
  lede,
  children,
}: {
  marker: string;
  title: string;
  lede: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-linen bg-paper pt-36 pb-16 sm:pt-40 sm:pb-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 text-[0.78rem] text-ink-50">
                <span aria-hidden className="h-px w-8 bg-brass-soft" />
                <span>{marker}</span>
              </div>
            </Reveal>

            <Reveal index={1}>
              <h1 className="optical-display mt-5 text-[2.4rem] leading-[1.03] font-medium sm:text-[3.1rem] lg:text-[3.6rem]">
                {title}
              </h1>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal index={2}>
              <p className="max-w-md text-[1.02rem] leading-[1.7] text-ink-70">{lede}</p>
            </Reveal>
            {children ? <Reveal index={3}>{children}</Reveal> : null}
          </div>
        </div>
      </Container>
    </header>
  );
}
