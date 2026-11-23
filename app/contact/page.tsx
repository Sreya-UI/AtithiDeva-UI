import { Mail, MapPin, Phone, ShieldCheck, Clock, Users, Sparkles, Film } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { Section } from "@/components/common/Section";
import { DemoForm } from "@/components/pages/DemoForm";
import { PageHeader } from "@/components/pages/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { createMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Request a walkthrough of AtithiDeva, or reach the team about implementation, support and documentation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        marker="Contact"
        title="Tell us how your property runs today."
        lede="A walkthrough works best when it follows your own operation — your room types, your meal plans, the way your day currently closes."
      />

      <Section tone="paper" className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <DemoForm />
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-linen bg-ivory/60 p-7 lg:p-8 shadow-lift">
                <Reveal>
                  <h2 className="optical-text text-[1.3rem] font-bold text-ink">What to expect</h2>
                  <ul className="mt-4 space-y-3.5 text-[0.92rem] text-ink-70">
                    <li className="flex items-start gap-3">
                      <Users className="size-4 text-brass mt-1 shrink-0" />
                      <span>Direct walkthrough with a hospitality system architect</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="size-4 text-brass mt-1 shrink-0" />
                      <span>Customized to your room inventory & food service model</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="size-4 text-brass mt-1 shrink-0" />
                      <span>Prompt response within 24 hours</span>
                    </li>
                  </ul>
                </Reveal>

                <Reveal index={1}>
                  <dl className="mt-8 space-y-5 border-t border-linen pt-7">
                    <div className="flex gap-4">
                      <Mail aria-hidden className="mt-0.5 size-[1.1rem] text-brass" strokeWidth={1.8} />
                      <div>
                        <dt className="text-[0.76rem] font-semibold uppercase tracking-wider text-ink-50">Email</dt>
                        <dd className="mt-0.5">
                          <a
                            href={`mailto:${site.contact.email}`}
                            className="text-[0.97rem] font-medium text-ink underline decoration-brass-soft underline-offset-4 hover:text-brass"
                          >
                            {site.contact.email}
                          </a>
                        </dd>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Phone aria-hidden className="mt-0.5 size-[1.1rem] text-brass" strokeWidth={1.8} />
                      <div>
                        <dt className="text-[0.76rem] font-semibold uppercase tracking-wider text-ink-50">Phone</dt>
                        <dd data-numeric className="mt-0.5 text-[0.97rem] font-medium text-ink">
                          <a href={`tel:${site.contact.phone.replace(/\s+/g, "")}`} className="hover:text-brass">
                            {site.contact.phone}
                          </a>
                        </dd>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <MapPin aria-hidden className="mt-0.5 size-[1.1rem] text-brass" strokeWidth={1.8} />
                      <div>
                        <dt className="text-[0.76rem] font-semibold uppercase tracking-wider text-ink-50">Address</dt>
                        <dd className="mt-0.5 text-[0.97rem] font-medium text-ink leading-relaxed">
                          {site.contact.fullAddress}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </Reveal>
              </div>

              {/* Instant Guided Walkthrough Video Card */}
              <div className="rounded-3xl border border-brass-soft/40 bg-navy text-white p-6 sm:p-7 shadow-lift overflow-hidden relative">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-brass/15 blur-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-brass/20 border border-brass/30 px-3 py-1 text-[0.72rem] font-semibold text-brass mb-3">
                    <Sparkles className="h-3 w-3" />
                    <span>Instant Self-Serve Demo</span>
                  </div>
                  <h3 className="optical-text text-[1.2rem] font-bold text-white">
                    Can&apos;t wait for a live call?
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-white/80">
                    Watch the complete 4-minute guided walkthrough of AtithiDeva right now.
                  </p>

                  {/* Embedded Video player */}
                  <div className="mt-4 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-inner">
                    <video
                      src="/videos/demo_hotel_2.mp4"
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="mt-2.5 text-[0.74rem] text-white/60 text-center">
                    Full System Tour • 4 min 11 sec
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <JsonLd
        id="schema-breadcrumb-contact"
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
