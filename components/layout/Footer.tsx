import { SocialLinks } from "@/components/common/SocialLinks";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Logo } from "@/components/layout/Logo";
import { footerNav } from "@/data/navigation";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory border-t border-linen/10">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2fr)]">
          <div className="max-w-sm">
            <Logo tone="ivory" />
            <p className="mt-5 text-[0.92rem] leading-[1.7] text-ivory/65">
              Hotel operations software for properties that run rooms, food and events out of the
              same building, and want them to close out of the same books.
            </p>
            <SocialLinks className="mt-6" />
            <p className="mt-6 text-[0.88rem] text-ivory/60">
              <a
                href={`mailto:${site.contact.email}`}
                className="underline-offset-4 transition-colors hover:text-ivory hover:underline"
              >
                {site.contact.email}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.title}>
                <h2 className="font-sans text-[0.78rem] font-bold tracking-wider uppercase text-ivory/50">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="text-[0.88rem] text-ivory/75 underline-offset-4 transition-colors hover:text-brass-soft hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/12 pt-7 text-[0.8rem] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p>
            Figures shown in product visuals across this site are sample data.
          </p>
        </div>
      </Container>
    </footer>
  );
}
