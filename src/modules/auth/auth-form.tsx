import { BackButton } from "@/components/back-button";
import { buttonStyles, Button } from "@/components/button";
import Card from "@/components/card";
import { Input } from "@/components/input";
import { dict } from "@/utils/dictionary";

const google = new URL("auth", "https://accounts.google.com/o/oauth2/v2/");
google.searchParams.set(
  "redirect_uri",
  "http://localhost:3000/auth/callback/google/",
);
google.searchParams.set("response_type", "code");
google.searchParams.set("scope", "profile email");
google.searchParams.set("client_id", Bun.env.GOOGLE_CLIENT_ID!);

export const AuthForm = (props: { csrfToken: string }) => {
  return (
    <div class="mx-auto mt-48 max-w-xl">
      <BackButton />
      <Card>
        <Card.Header>
          <Card.Title>Volviste!</Card.Title>
          <Card.Description>
            Ingresá con Google o autenticate con tus credenciales.
          </Card.Description>
        </Card.Header>
        <form
          hx-post="/api/auth/login"
          hx-target-4xx="#notification"
          hx-target="body"
          hx-push-url="true"
        >
          <Card.Content>
            <a
              href={google.href}
              class={buttonStyles({
                intent: "primary",
                class:
                  "w-full bg-foreground text-muted hover:bg-foreground hover:text-background",
              })}
            >
              <img
                src="/public/google-svg.svg"
                class="-ml-4 mr-4 h-5 w-5 rounded-full"
              />
              Ingresar con Google
            </a>
            <div class="my-6 h-0 border-b border-border" />
            <input
              type="text"
              name="csrfToken"
              value={props.csrfToken}
              class="hidden"
            />
            <Input
              name="email"
              placeholder="example@example.com"
              type="email"
              required="true"
              rt
            />
            <Input
              name="password"
              placeholder="***********"
              type="password"
              required="true"
              rb
            />
          </Card.Content>
          <Card.Footer class="justify-evenly gap-3 pt-0">
            <Button intent="primary" class="flex-grow">
              Login
            </Button>
            <Button type="reset" intent="secondary" class="flex-grow">
              Crear cuenta
            </Button>
          </Card.Footer>
        </form>
      </Card>
    </div>
  );
};
