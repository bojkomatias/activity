import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const UserAttribute = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: string;
  value: string;
}) => {
  return (
    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
      {value}
      <Button
        hx-get={`/dashboard/${id}/${attribute}?value=${value}`}
        hx-target="closest dd"
        hx-swap="outerHTML"
        size="sm"
      >
        Update
      </Button>
    </dd>
  );
};

export const AttributeEdit = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: string;
  value: string;
}) => {
  return (
    <form
      hx-patch={`/dashboard/${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      class="-mb-3 mt-0 flex items-center justify-between gap-x-6 sm:-mt-4 sm:flex-auto"
    >
      <Input name={attribute} value={value} type="text" />
      <span class="flex gap-2 sm:gap-4">
        <Button size="sm" intent="primary">
          Save
        </Button>
        <Button size="sm" intent="secondary" type="button">
          Cancel{" "}
        </Button>
      </span>
    </form>
  );
};

export const PasswordChange = () => (
  <div>
    <h2 className="text-base font-semibold leading-7">Update Password</h2>
    <p className="mt-1 text-sm leading-6 text-gray-500">
      On password change current session will continue to exists, and changes
      take effect the next time you log in.
    </p>
    <form
      hx-patch="/dashboard/password"
      hx-target="#password-change"
      hx-target-403="#password-change"
      hx-swap="innerHTML"
      class="mt-4 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50"
    >
      <div class="isolate -space-y-px">
        <Input
          name="currentPassword"
          label="current password"
          placeholder="********"
          type="password"
          required="true"
        />
        <Input
          name="password"
          label="new password"
          placeholder="**********"
          type="password"
          required="true"
        />
      </div>

      <div class="flex justify-between">
        <div id="password-change" />
        <Button intent="destructive">Update password</Button>
      </div>
    </form>
  </div>
);
