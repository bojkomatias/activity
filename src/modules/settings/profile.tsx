import { InsertUser, SelectUser } from "@/db/schema/user";
import { Button } from "@/components/button";
import Card from "@/components/card";
import Details from "@/components/detail-list";
import { Input } from "@/components/input";
import { dict } from "@/utils/dictionary";

const Profile = ({ user }: { user: SelectUser }) => (
  <Card>
    <Card.Header>
      <Card.Title>Perfil</Card.Title>
      <Card.Description>
        Datos de tu perfil, tené en cuenta que algunos datos son públicos
      </Card.Description>
    </Card.Header>
    <Card.Content class="px-0">
      <Details>
        <Details.Detail>
          <Details.Term>{dict.get("id")}</Details.Term>
          <Details.Description>{user.id}</Details.Description>
        </Details.Detail>
        <Details.Detail>
          <Details.Term>{dict.get("name")}</Details.Term>
          <Details.Description>
            <Profile.Attribute
              id={user.id}
              attribute="name"
              value={user.name}
            />
          </Details.Description>
        </Details.Detail>
        <Details.Detail>
          <Details.Term>{dict.get("email")}</Details.Term>
          <Details.Description>{user.email}</Details.Description>
        </Details.Detail>
        <Details.Detail>
          <Details.Term>{dict.get("role")}</Details.Term>
          <Details.Description class="text-xs uppercase">
            {user.role}
          </Details.Description>
        </Details.Detail>
      </Details>
    </Card.Content>
  </Card>
);

Profile.Attribute = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: keyof InsertUser;
  value: InsertUser[typeof attribute];
}) => {
  return (
    <>
      <span safe>{value}</span>
      <Button
        hx-get={`/d/settings/${id}/${attribute}/edit?value=${value}`}
        hx-target="closest dd"
        hx-swap="innerHTML"
        intent="secondary"
        size="xs"
      >
        {dict.get("update")}
      </Button>
    </>
  );
};

Profile.AttributeEdit = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: keyof InsertUser;
  value: InsertUser[typeof attribute];
}) => {
  return (
    <form
      hx-patch={`/d/settings/${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      class="mt-4 flex h-8 items-center gap-x-4 sm:mt-0"
    >
      <Input
        name={attribute}
        value={value?.toString()}
        type="text"
        class="flex-grow py-0"
        rt
        rb
      />
      <span class="flex gap-2">
        <Button size="xs" intent="primary">
          {dict.get("save")}
        </Button>
        <Button
          hx-get={`/d/settings/${id}/${attribute}?value=${value}`}
          size="xs"
          intent="secondary"
          type="reset"
        >
          {dict.get("cancel")}
        </Button>
      </span>
    </form>
  );
};
export default Profile;
