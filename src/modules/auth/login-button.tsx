import { Button } from "@/components/button";
import { dict } from "@/utils/dictionary";

export const LoginButton = () => (
  <Button
    hx-get="/login"
    hx-target="#page-content"
    hx-swap="innerHTML"
    hx-push-url="true"
    intent="primary"
    class="mr-4"
  >
    {dict.get("login")}
  </Button>
);
