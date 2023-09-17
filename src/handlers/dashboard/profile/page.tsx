import { Button } from "@/components/ui/button";
import { User } from "@/db/schema/user";
import { PasswordChange, UserAttribute } from "./attribute-edit";
import { cx } from "@/utils/cx";

export const ProfilePage = ({ user }: { user: User }) => (
  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
    <div>
      <h2 className="text-base font-semibold leading-7">Profile</h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <dl className="mt-6 space-y-6 divide-y border-t-2 text-sm leading-6 dark:divide-gray-700 dark:border-gray-700">
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">UUID</dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {user.id}
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">
            Full name
          </dt>
          <UserAttribute id={user.id} attribute="name" value={user.name} />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">
            Email address
          </dt>
          <UserAttribute id={user.id} attribute="email" value={user.email} />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">Role</dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {user.role}
          </dd>
        </div>
      </dl>
    </div>

    <div class="pointer-events-none select-none">
      <PasswordChange />
    </div>
  </div>
);
