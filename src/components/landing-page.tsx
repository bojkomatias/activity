export const LandingPage = () => (
  <div class="px-4">
    <section class="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div class="mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <a
          class="bg-muted rounded-2xl px-4 py-1.5 text-sm font-medium"
          target="_blank"
          href="https://twitter.com/shadcn"
        >
          Follow along on Twitter
        </a>
        <h1 class="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
          An example hypermedia driven app built using Elysia.
        </h1>
        <p class="max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
          I'm building a web app with Bun, Elyisia, Turso, Drizzle, HTMX,
          Hyperscript and Tailwind. Follow along as we figure this out together.
        </p>
        <div class="space-x-4">
          <a
            target="_blank"
            rel="noreferrer"
            class="inline-flex h-11 items-center justify-center rounded-md border px-8 text-sm font-medium dark:border-gray-800"
            href="https://github.com/"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
    <section class="space-y-6 pb-48 pt-8 md:pt-12 lg:pt-24">
      <div class="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 class="text-3xl font-bold leading-loose sm:text-3xl md:text-6xl">
          Features
        </h2>
        <p class="max-w-[85%] leading-normal sm:text-lg sm:leading-7">
          The project is meant to serve as an example on how to keep on building
          your hypermedia driven wep application with bleeding edge frameworks
          and tooling.
        </p>
      </div>
      <div class="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div class="relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class="rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">Bun + Elysia</h3>
              <p class="text-sm">
                Supercharged by Bun runtime, Elysia offers a developer focused
                experience.
              </p>
            </div>
          </div>
        </div>
        <div class="relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class="rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">HATEOAS</h3>
              <p class="text-sm">
                HTMX and hypermedia driven patterns and strategies.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-background relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class=" rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">Database</h3>
              <p class="text-sm">
                Using Turso, a blazing fast edge ready SQLite database.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-background relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class=" rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">Tailwind CSS</h3>
              <p class="text-sm">
                UI components built using Tailwind CSS. Animated with
                Hyperscript.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-background relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class=" rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">Authentication</h3>
              <p class="text-sm">
                Roll your own authentication style. Even OAuth2 handler ready.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-background relative overflow-hidden rounded-lg border p-2 dark:border-gray-800">
          <div class=" rounded-md p-6">
            <div class="space-y-2">
              <h3 class="font-bold">ORM</h3>
              <p class="text-sm">
                Drizzle ORM for type safety and drizzle toolkit goodies.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="mx-auto text-center md:max-w-[58rem]">
        <p class="leading-normal text-gray-500 sm:text-base sm:leading-7">
          The project styling is heavy influenced by{" "}
          <a href="https://ui.shadcn.com/" class="underline underline-offset-2">
            shadcn/ui
          </a>
          <br /> Consider this is just a base template, go ahead and customize
          components, colors and fonts.
        </p>
      </div>
    </section>
  </div>
);
