import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    throw redirect({ to: "/areas-of-expertise", statusCode: 301 } as any);
  },
  component: () => null,
});
