import { ArrowRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import { DemoNote } from "@/components/common/DemoNote";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";

const menu = [
  {
    category: "Breakfast",
    items: [
      { name: "Continental plate", price: 450 },
      { name: "Luchi and aloor dom", price: 320 },
    ],
  },
  {
    category: "Main course",
    items: [
      { name: "Kosha mangsho", price: 620 },
      { name: "Daab chingri", price: 780 },
    ],
  },
  {
    category: "Beverages",
    items: [{ name: "Masala chai, pot", price: 180 }],
  },
];

const mealPlans = [
  { code: "EP", label: "Room only" },
  { code: "CP", label: "Breakfast included" },
  { code: "MAP", label: "Breakfast and one meal" },
  { code: "AP", label: "All meals" },
];

export function Restaurant() {
  return (
    <section
      id="restaurant"
      className="scroll-mt-24 border-t border-linen py-10 sm:py-12 lg:py-14"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <Reveal className="order-2 min-w-0 lg:order-1">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] sm:items-start">
              {/* Menu master */}
              <div className="overflow-hidden rounded-xl border border-linen bg-ivory shadow-lift">
                <div className="border-b border-linen bg-paper px-5 py-3.5">
                  <p className="text-[0.84rem] font-semibold text-ink">Food service master</p>
                  <p className="text-[0.72rem] text-ink-50">Categories and items</p>
                </div>
                <div className="divide-y divide-linen-soft">
                  {menu.map((group) => (
                    <div key={group.category} className="px-5 py-4">
                      <p className="text-[0.74rem] text-brass">{group.category}</p>
                      <ul className="mt-2.5 space-y-2">
                        {group.items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-baseline justify-between gap-4 text-[0.86rem]"
                          >
                            <span className="text-ink">{item.name}</span>
                            <span data-numeric className="text-ink-50">
                              ₹{item.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where it lands */}
              <div className="space-y-4">
                <div className="rounded-xl border border-linen bg-ivory p-5">
                  <p className="text-[0.84rem] font-semibold text-ink">Meal plans</p>
                  <ul className="mt-3 space-y-2">
                    {mealPlans.map((plan) => (
                      <li key={plan.code} className="flex items-baseline gap-3 text-[0.84rem]">
                        <span
                          data-numeric
                          className="w-10 shrink-0 rounded bg-brass-wash px-1.5 py-0.5 text-center text-[0.7rem] font-semibold text-brass"
                        >
                          {plan.code}
                        </span>
                        <span className="text-ink-70">{plan.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-2 px-1 text-[0.78rem] text-ink-50">
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 text-brass" />
                  Charged to the stay
                </div>

                <div className="rounded-xl border border-[#e5d5b0] bg-state-occupied-wash p-5">
                  <p className="text-[0.84rem] font-semibold text-ink">Room 102 · folio</p>
                  <div className="mt-3 flex items-baseline justify-between text-[0.86rem]">
                    <span className="text-ink-70">Service charges</span>
                    <span data-numeric className="font-medium text-ink">
                      ₹2,450
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between text-[0.86rem]">
                    <span className="text-ink-70">Meal plan</span>
                    <span data-numeric className="font-medium text-ink">
                      ₹1,800
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <DemoNote className="mt-4" />
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              marker="Restaurant"
              title="Food belongs on the guest&rsquo;s bill"
              lede={
                <p>
                  Categories, items and meal plans are master data, so a dish is priced the same way
                  whoever rings it up. Room and guest meals are priced into the billing object as the
                  stay runs, and the items selected feed service charges and the final invoice total.
                </p>
              }
            />
            <Reveal index={3}>
              <p className="mt-8 max-w-[46ch] border-t border-linen pt-7 text-[0.92rem] leading-[1.7] text-ink-70">
                The meal plan chosen at check-in is loaded into the room form, so what the guest was
                promised at booking is what appears on the folio at departure.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
