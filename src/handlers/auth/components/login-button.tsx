import { Button } from "@/components/ui/button";

export const LoginButton = () => (
  <Button
    hx-get="/auth/form"
    hx-target="main"
    hx-swap="innerHTML"
    intent="primary"
  >
    Login
  </Button>
);
