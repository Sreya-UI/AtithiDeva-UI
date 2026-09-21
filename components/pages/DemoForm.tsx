"use client";

import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/common/Button";

/**
 * Demo request form.
 *
 * The site ships without a backend, so submissions are held in component state
 * and logged. To wire it up, replace the body of `submitDemoRequest` with a
 * call to your endpoint (for example `POST /api/demo-request`) and keep the
 * same return contract.
 */
async function submitDemoRequest(payload: Record<string, string>): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.info("[AtithiDeva] demo request", payload);
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
}

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "h-11 w-full rounded-lg border border-linen bg-paper px-3.5 text-[0.93rem] text-ink transition-colors placeholder:text-ink-30 hover:border-brass-soft focus:border-brass focus:outline-none";

const labelClass = "mb-2 block text-[0.83rem] text-ink-70";

export function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form)) as Record<string, string>;

    setStatus("sending");
    try {
      await submitDemoRequest(payload);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brass-soft bg-brass-wash p-8 lg:p-10"
      >
        <h2 className="optical-text text-[1.3rem] font-medium">Request received</h2>
        <p className="mt-3 max-w-md text-[0.95rem] leading-[1.65] text-ink-70">
          Someone will reply with a few times for a walkthrough. If it is urgent, the phone
          number on this page is the faster route.
        </p>
        <Button variant="secondary" className="mt-7" onClick={() => setStatus("idle")}>
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-2xl border border-linen bg-ivory p-7 lg:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="property">
            Property name
          </label>
          <input id="property" name="property" required className={fieldClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="Optional"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="rooms">
            Number of rooms
          </label>
          <input
            id="rooms"
            name="rooms"
            type="number"
            min={1}
            inputMode="numeric"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="departments">
            Departments you run
          </label>
          <select id="departments" name="departments" className={fieldClass} defaultValue="rooms">
            <option value="rooms">Rooms only</option>
            <option value="rooms-fnb">Rooms and restaurant</option>
            <option value="rooms-banquet">Rooms and banquets</option>
            <option value="all">Rooms, restaurant and banquets</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClass} htmlFor="message">
          What would you like to see?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-linen bg-paper px-3.5 py-3 text-[0.93rem] leading-relaxed text-ink transition-colors placeholder:text-ink-30 hover:border-brass-soft focus:border-brass focus:outline-none"
          placeholder="The night audit, the housekeeping cycle, banquet quotations…"
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" strokeWidth={2} />
              Sending
            </>
          ) : (
            "Request a demo"
          )}
        </Button>

        <p className="text-[0.78rem] text-ink-30">
          We use these details only to arrange the walkthrough.
        </p>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-[0.86rem] text-state-maintenance">
          The request did not send. Try again, or email us directly using the address on this
          page.
        </p>
      ) : null}
    </form>
  );
}
