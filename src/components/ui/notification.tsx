export const Notification = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  return (
    <div
      id="notification"
      hx-swap-oob="true"
      class="fixed right-8 top-16 w-full max-w-sm translate-x-full overflow-hidden rounded-lg bg-white opacity-0 shadow-lg ring-1 ring-gray-200 dark:bg-gray-950 dark:shadow-black dark:ring-gray-800"
      _="init toggle .transition on me wait then toggle .opacity-0 .translate-x-full on me end
      init wait 4s then toggle .opacity-0 .translate-x-full on me settle then hide me end
      on close toggle .opacity-0 .translate-x-full on me settle then hide me end"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <i class={icon} />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium">{title}</p>
            <p class="mt-1 text-sm font-light text-gray-500">{description}</p>
          </div>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="inline-flex rounded-lg p-1 focus-within:outline-gray-500 hover:bg-gray-50 focus:outline focus:outline-gray-500 focus-visible:outline-offset-0 dark:hover:bg-gray-900"
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
