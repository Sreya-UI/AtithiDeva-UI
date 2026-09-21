import { ButtonLink } from "@/components/common/Button";
import { Container } from "@/components/common/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] items-center bg-paper pt-32 pb-24">
      <Container>
        <div className="max-w-xl">
          <p className="text-[0.8rem] text-brass">Room not found</p>
          <h1 className="optical-display mt-5 text-[2.4rem] leading-[1.05] font-medium sm:text-[3rem]">
            This page is not on the board.
          </h1>
          <p className="mt-5 text-[1rem] leading-[1.7] text-ink-70">
            The address may have changed, or the link may be incomplete. The front desk is this
            way.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/features" variant="secondary">
              Browse the modules
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
