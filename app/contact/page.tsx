import { Mail, MapPin, Phone, ShieldCheck, Clock, Users } from "lucide-react";
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
                          {site.contact.phone}
                        </dd>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <MapPin aria-hidden className="mt-0.5 size-[1.1rem] text-brass" strokeWidth={1.8} />
                      <div>
                        <dt className="text-[0.76rem] font-semibold uppercase tracking-wider text-ink-50">Based in</dt>
                        <dd className="mt-0.5 text-[0.97rem] font-medium text-ink">
                          {site.contact.addressLocality}, {site.contact.addressRegion}
                        </dd>
                      </div>
                    </div>
                  </dl>
                </Reveal>
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
