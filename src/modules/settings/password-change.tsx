import { Button } from "@/components/button";
import Card from "@/components/card";
import { Input } from "@/components/input";
import { dict } from "@/utils/dictionary";

export const PasswordChange = () => (
  <Card class="border-destructive">
    <Card.Header>
      <Card.Title>{"Cambiar " + dict.get("password")}</Card.Title>
      <Card.Description>
        Los cambios se verán reflejados la proxima vez que ingreses
      </Card.Description>
    </Card.Header>
    <form
      hx-patch="/d/password"
      hx-target="#notification"
      hx-target-403="#notification"
      hx-swap="none"
    >
      <Card.Content>
        <Input
          name="currentPassword"
          placeholder="********"
          type="password"
          required="true"
          rt
        />
        <Input
          name="password"
          placeholder="**********"
          type="password"
          required="true"
          rb
        />
      </Card.Content>
      <Card.Footer class="justify-end bg-destructive/20">
        <Button intent="destructive" size="sm">
          {dict.get("update")} {dict.get("password")}
        </Button>
      </Card.Footer>
    </form>
  </Card>
);
