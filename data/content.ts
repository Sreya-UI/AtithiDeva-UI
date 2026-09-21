/**
 * Copy and sample data for the marketing site.
 *
 * Everything describing what the product does is taken from BUSINESS_LOGIC.md.
 * Everything that looks like a number inside a product mockup is sample data
 * and is labelled as such in the UI.
 */

export type RoomState = "available" | "occupied" | "cleaning" | "maintenance";

export type SampleRoom = {
  number: string;
  type: string;
  floor: string;
  state: RoomState;
  guest?: string;
  marker?: "arrival" | "departure";
  rate?: number;
};

export const roomStateLabels: Record<RoomState, string> = {
  available: "Available",
  occupied: "Occupied",
  cleaning: "Cleaning",
  maintenance: "Maintenance",
};

/** Sample room board. Demo data only. */
export const sampleRooms: SampleRoom[] = [
  { number: "101", type: "Deluxe", floor: "Ground", state: "available", rate: 4200 },
  { number: "102", type: "Premium", floor: "Ground", state: "occupied", guest: "R. Menon", marker: "departure", rate: 5400 },
  { number: "103", type: "Suite", floor: "Ground", state: "cleaning", rate: 8900 },
  { number: "104", type: "Deluxe", floor: "Ground", state: "maintenance", rate: 4200 },
  { number: "201", type: "Premium", floor: "First", state: "occupied", guest: "A. Fernandes", rate: 5400 },
  { number: "202", type: "Deluxe", floor: "First", state: "available", marker: "arrival", rate: 4200 },
  { number: "203", type: "Deluxe", floor: "First", state: "occupied", guest: "S. Iyer", rate: 4200 },
  { number: "204", type: "Suite", floor: "First", state: "available", rate: 8900 },
  { number: "301", type: "Premium", floor: "Second", state: "occupied", guest: "K. Bose", marker: "departure", rate: 5400 },
  { number: "302", type: "Deluxe", floor: "Second", state: "cleaning", rate: 4200 },
  { number: "303", type: "Deluxe", floor: "Second", state: "available", rate: 4200 },
  { number: "304", type: "Suite", floor: "Second", state: "occupied", guest: "D. Rao", rate: 8900 },
];

export const housekeepingSteps = [
  { label: "Checked out", note: "The booking is settled and closed." },
  { label: "Cleaning required", note: "The room leaves sellable inventory." },
  { label: "Housekeeper assigned", note: "Ownership of the turnover is named." },
  { label: "Cleaning in progress", note: "The room is being turned over." },
  { label: "Cleaning completed", note: "Housekeeping reports the room ready." },
  { label: "Reception inspection", note: "Reception verifies before release." },
  { label: "Room available", note: "The room returns to the board." },
] as const;

export const banquetStages = [
  { label: "Enquiry", note: "An event request enters the pipeline." },
  { label: "Quotation", note: "Pricing is prepared against the request." },
  { label: "Booking", note: "The event is confirmed and dated." },
  { label: "Event calendar", note: "The date is held on the banquet calendar." },
  { label: "Execution", note: "The event runs against the booking." },
  { label: "Additional services", note: "Extras are attached to the event." },
  { label: "Payment", note: "Collection is recorded against the booking." },
  { label: "Reporting", note: "The event is reported alongside the rest of the business." },
] as const;

/**
 * Sample quotation. Demo data only.
 *
 * The guest (or the OTA/travel agent) asks for one all-inclusive number.
 * Atithideva back-calculates the base rate, discount and GST that add up to
 * exactly that figure, so the quotation can be issued — and converted into a
 * booking — without anyone working the tax backwards by hand.
 */
export const quotationExample = {
  quoteNumber: "QT-2026-0842",
  guest: "Corporate account · 2 adults",
  nights: 2,
  askedFor: 22400,
  gstPercent: 12,
  discountPercent: 10,
  lines: [
    { label: "Back-calculated base rate", detail: "Before discount and GST", amount: 22222.22 },
    { label: "Negotiated discount", detail: "10% corporate rate", amount: -2222.22 },
    { label: "GST", detail: "12% on the discounted rate", amount: 2400 },
  ],
  total: 22400,
  convertedBooking: "BK-2026-1305",
} as const;

export const bookingInputs = [
  { label: "Guest profile", value: "GR number, ID, contact" },
  { label: "Room", value: "Type, floor, bed type" },
  { label: "Dates", value: "Check-in, check-out, nights" },
  { label: "Occupancy", value: "Adults and children" },
  { label: "Meal plan", value: "From meal plan master" },
  { label: "Discount", value: "Percentage or fixed" },
  { label: "GST", value: "From invoice settings" },
  { label: "Advance", value: "Payment method recorded" },
] as const;

/** Sample folio. Demo data only. */
export const sampleFolio = {
  lines: [
    { label: "Room charges", detail: "3 nights × ₹5,400", amount: 16200, kind: "add" },
    { label: "Extra bed", detail: "1 × ₹800", amount: 800, kind: "add" },
    { label: "Restaurant and services", detail: "Charged to room", amount: 2450, kind: "add" },
    { label: "Meal plan", detail: "Breakfast, 2 adults", amount: 1800, kind: "add" },
    { label: "Discount", detail: "10% on room rate", amount: 1620, kind: "subtract" },
    { label: "GST", detail: "CGST 6% + SGST 6%", amount: 2380, kind: "add" },
  ],
  grandTotal: 22010,
  paid: 15000,
} as const;

/** Sample night audit figures. Demo data only. */
export const sampleNightAudit = {
  revenue: [
    { label: "Room", value: 184500 },
    { label: "Restaurant", value: 46200 },
    { label: "Bar", value: 18900 },
    { label: "Banquet", value: 92000 },
  ],
  collection: [
    { label: "Cash", value: 96400 },
    { label: "Card", value: 245200 },
  ],
  cash: [
    { label: "Opening cash", value: 25000 },
    { label: "Cash received", value: 96400 },
    { label: "Cash paid out", value: 12300 },
  ],
  metrics: [
    { label: "Occupancy", value: "82%", note: "Rooms sold against rooms available" },
    { label: "ADR", value: "₹5,127", note: "Average daily rate" },
    { label: "RevPAR", value: "₹4,204", note: "Revenue per available room" },
  ],
} as const;

export const faqs = [
  {
    question: "Does a checked-out room become available immediately?",
    answer:
      "No. Checkout moves the room into the housekeeping cycle. It passes through cleaning required, housekeeper assigned, cleaning in progress and cleaning completed, and only returns to the board as available after reception inspection. That rule is what keeps the room board honest.",
  },
  {
    question: "How does AtithiDeva decide whether a room is occupied?",
    answer:
      "Occupancy is driven by the booking, not by a label on the room. A room is occupied when it carries an active booking. Cancelled and checked-out bookings are filtered out of the active set, so they never hold a room hostage.",
  },
  {
    question: "What happens to arrivals and departures on the board?",
    answer:
      "The board shows an arrival marker when the check-in date is today or the day before, and a departure marker when the check-out date is today or the day before. Arrivals and departures are operational filters rather than room states.",
  },
  {
    question: "How is the bill calculated at checkout?",
    answer:
      "The live bill is assembled from the room charge, extra charges, discount, service charges and payments already received. Checkout reads the booking's own payment records and pending amount rather than a recomputed display value, so grand total, total paid and balance due always agree.",
  },
  {
    question: "Can GST and discounts be configured per property?",
    answer:
      "Yes. GST lives in invoice settings and is loaded into the room form and the invoice pipeline, including whether GST is included in or excluded from the rate and how CGST and SGST are split. Discounts can be a percentage or a fixed amount, applied at the rate level before final billing.",
  },
  {
    question: "Do restaurant and banquet sales reach the same books?",
    answer:
      "They do. Food items and meal plans price into the guest's billing object, and banquets run their own enquiry-to-payment cycle. The night audit then reports room, restaurant, bar and banquet revenue against a single business date.",
  },
  {
    question: "What does the night audit actually close?",
    answer:
      "It closes the business date. It totals revenue by department, cash and card collection, opening cash, cash received and cash paid out, and reports occupancy, ADR and RevPAR. Output can be generated as a PDF or exported to CSV.",
  },
] as const;

export const howItWorks = [
  {
    step: "01",
    title: "Set up your hotel",
    body: "Load the room master, meal plans, food categories and items, travel agents, customers and OTAs. Set hotel, invoice and payment settings once so every department reads the same values.",
  },
  {
    step: "02",
    title: "Manage rooms and reservations",
    body: "Work the room board by state and by arrivals and departures. Open a room to check in, view an occupied stay, send it to housekeeping or flag it for maintenance.",
  },
  {
    step: "03",
    title: "Run daily operations",
    body: "Take bookings, record advances, charge meals and services to the room, and move rooms through the housekeeping cycle as guests leave.",
  },
  {
    step: "04",
    title: "Track billing and finance",
    body: "Settle folios against the booking ledger, generate invoices, and watch collections through the finance desk and cash box.",
  },
  {
    step: "05",
    title: "Close the business day",
    body: "Run the night audit. Reconcile revenue, cash and card collection and occupancy, confirm the audit tasks, and export the day.",
  },
] as const;

export const solutionSegments = [
  {
    title: "Independent hotels",
    body: "One property, one team wearing several hats. The room board, the folio and the night audit are the whole job, and they sit one click apart.",
    points: ["Room board with state filters", "Folio that matches the booking ledger", "Night audit with PDF and CSV output"],
  },
  {
    title: "Resorts and properties with F&B",
    body: "Meal plans and restaurant charges belong on the guest's bill. Food categories and items are master data, so pricing stays consistent across outlets.",
    points: ["Meal plan master", "Food category and item master", "Service charges into the invoice total"],
  },
  {
    title: "Banquet-led properties",
    body: "Events run on their own sales cycle. Enquiry through quotation, booking, calendar, execution, services, payment and reporting.",
    points: ["Event calendar", "Additional services per event", "Banquet payments and reports"],
  },
  {
    title: "Multi-department operations",
    body: "Front office, housekeeping, restaurant, banquet and finance each have their own desk, with permissions, roles and users defined centrally.",
    points: ["Permissions and roles", "Business and finance desks", "Cash box reconciliation"],
  },
] as const;
