import { button } from "./button";

export const Notification = ({
  title,
  description,
  icon,
  isError,
}: {
  title: string;
  description: string;
  icon?: string;
  isError?: boolean;
}) => {
  return (
    <div
      id="notification"
      hx-swap-oob="true"
      class="fixed right-8 top-16 z-30 w-full max-w-sm translate-x-full overflow-hidden rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-gray-200 dark:bg-gray-950 dark:shadow-black dark:ring-gray-800"
      _="init toggle .transition on me wait then toggle .opacity-0 .translate-x-full on me end
      init wait 4s then toggle .opacity-0 .translate-x-full on me settle then hide me end
      on close toggle .opacity-0 .translate-x-full on me settle then hide me end"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i
              class={
                icon
                  ? icon
                  : isError
                  ? "i-lucide-x-circle h-6 w-6 text-red-600"
                  : "i-lucide-check-circle h-6 w-6 text-emerald-600"
              }
            />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium">{title}</p>
            <p class="mt-1 text-sm font-light text-gray-500">{description}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              class={button({ intent: "ghost", size: "xs" })}
              type="button"
              _="on click send close to #notification"
            >
              <span class="sr-only">Close</span>
              <i class="i-lucide-x" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
