import { Mail, MapPin, Phone } from "lucide-react";
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

      <Section tone="paper">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <DemoForm />
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="optical-text text-[1.25rem] font-medium">Other ways to reach us</h2>
                <p className="mt-3 text-[0.95rem] leading-[1.65] text-ink-70">
                  Documentation and support requests go to the same inbox. Anything about an
                  existing installation is best raised by phone.
                </p>
              </Reveal>

              <Reveal index={1}>
                <dl className="mt-9 space-y-6 border-t border-linen pt-9">
                  <div className="flex gap-4">
                    <Mail aria-hidden className="mt-0.5 size-[1.05rem] text-brass" strokeWidth={1.5} />
                    <div>
                      <dt className="text-[0.8rem] text-ink-50">Email</dt>
                      <dd className="mt-1">
                        <a
                          href={`mailto:${site.contact.email}`}
                          className="text-[0.97rem] text-ink underline decoration-brass-soft underline-offset-4 hover:text-brass"
                        >
                          {site.contact.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Phone aria-hidden className="mt-0.5 size-[1.05rem] text-brass" strokeWidth={1.5} />
                    <div>
                      <dt className="text-[0.8rem] text-ink-50">Phone</dt>
                      <dd data-numeric className="mt-1 text-[0.97rem] text-ink">
                        {site.contact.phone}
                      </dd>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <MapPin aria-hidden className="mt-0.5 size-[1.05rem] text-brass" strokeWidth={1.5} />
                    <div>
                      <dt className="text-[0.8rem] text-ink-50">Based in</dt>
                      <dd className="mt-1 text-[0.97rem] text-ink">
                        {site.contact.addressLocality}, {site.contact.addressRegion}
                      </dd>
                    </div>
                  </div>
                </dl>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-9 rounded-xl border border-linen bg-ivory p-5 text-[0.82rem] leading-relaxed text-ink-50">
                  Contact details on this page are placeholders held in{" "}
                  <code className="text-ink-70">lib/site.ts</code>. Replace them with your real
                  business details before the site goes live.
                </p>
              </Reveal>
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
