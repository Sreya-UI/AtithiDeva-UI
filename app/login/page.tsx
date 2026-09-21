import Link from "next/link";
import { Reveal } from "@/components/common/Reveal";
import { Button } from "@/components/common/Button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | Atithideva",
  description: "Log in to your Atithideva account.",
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory pt-24 pb-12 sm:pt-32">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full bg-brass/10 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[800px] w-[800px] rounded-full bg-sage/10 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-linen bg-white/60 p-8 shadow-xl backdrop-blur-xl sm:p-10">
            <div className="mb-8 text-center">
              <h1 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-ink-70">
                Log in to your Atithideva account to manage your property.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-ink-70 mb-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-linen bg-white/80 px-4 py-2.5 text-ink transition-colors focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass placeholder:text-ink-30"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-ink-70"
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-xs font-medium text-brass transition-colors hover:text-brass-dark"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  className="w-full rounded-xl border border-linen bg-white/80 px-4 py-2.5 text-ink transition-colors focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass placeholder:text-ink-30"
                  placeholder="••••••••"
                />
              </div>

              <div className="pt-2">
                <Button type="submit" className="w-full justify-center">
                  Log in
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-ink-70">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-brass transition-colors hover:text-brass-dark"
              >
                Add your property
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
