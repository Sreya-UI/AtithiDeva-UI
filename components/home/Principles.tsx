import { Container } from "@/components/common/Container";
import { Reveal } from "@/components/common/Reveal";

const principles = [
  {
    rule: "A room holds one state",
    body: "Available, Occupied, Cleaning or Maintenance. Arrivals and departures are things the board shows you, not states a room can be parked in.",
  },
  {
    rule: "Bookings decide occupancy",
    body: "A room is occupied because it carries an active booking. Cancelled and checked-out bookings drop out, so they never hold a room off the market.",
  },
  {
    rule: "Checkout reads the ledger",
    body: "The balance comes from the booking's own payment records and pending amount, not from a figure recomputed on screen. Nothing shows as paid that was not collected.",
  },
  {
    rule: "Housekeeping closes the loop",
    body: "A room that checks out is not a room you can sell. It becomes available again after cleaning is completed and reception has inspected it.",
  },
];

export function Principles() {
  return (
    <section className="border-t border-linen py-12 sm:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="optical-display text-[2rem] leading-[1.1] font-medium sm:text-[2.4rem]">
                Built around the real rhythm of hotel operations
              </h2>
              <p className="mt-5 max-w-[46ch] text-[1rem] leading-[1.7] text-ink-70">
                These are not marketing lines. They are the rules the system actually enforces, and
                they are the reason the numbers on the board can be trusted at eleven at night.
              </p>
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-xl border border-linen bg-linen sm:grid-cols-2">
            {principles.map((principle, index) => (
              <li key={principle.rule} className="bg-paper p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:z-10 relative">
                <Reveal index={index}>
                  <h3 className="optical-text font-display text-[1.2rem] leading-snug font-medium">
                    {principle.rule}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-[1.7] text-ink-70">{principle.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
