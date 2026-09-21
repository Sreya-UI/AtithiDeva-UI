import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

const groups = [
  {
    title: "Inventory and partners",
    items: ["Room master", "Travel agent master", "Customer and OTA master"],
  },
  {
    title: "Food and plans",
    items: ["Food service category", "Food service item", "Meal plan master"],
  },
  {
    title: "Property settings",
    items: ["Hotel settings", "Invoice settings", "Payment settings"],
  },
  {
    title: "Access",
    items: ["Permissions", "Roles", "Users"],
  },
];

export function MasterData() {
  return (
    <section
      id="master-data"
      className="scroll-mt-24 border-t border-linen py-12 sm:py-16"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <SectionHeading
            marker="Master data"
            title="Configure once, and every desk agrees"
            lede={
              <p>
                Rates, taxes, meal plans and food prices live in one place. When invoice settings
                change, the room form and the invoice pipeline both pick it up, so departments do
                not drift apart over a season.
              </p>
            }
          />

          <ul className="grid gap-px overflow-hidden rounded-xl border border-linen bg-linen sm:grid-cols-2">
            {groups.map((group, index) => (
              <li key={group.title} className="bg-ivory p-6">
                <Reveal index={index}>
                  <h3 className="text-[0.86rem] font-semibold text-ink">{group.title}</h3>
                  <ul className="mt-3.5 space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[0.88rem] text-ink-70">
                        <span aria-hidden className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-brass" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
