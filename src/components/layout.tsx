import DarkMode from "./ui/dark-mode-toggle";
import { LoginButton } from "@/handlers/auth/components/login-button";

export function Layout({
  isAuth = true,
  children,
}: {
  isAuth?: boolean;
  children?: any;
}) {
  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* HTMX */}
          <script
            src="https://unpkg.com/htmx.org@1.9.5"
            integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
            crossorigin="anonymous"
          />
          {/* Preload Ext */}
          <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
          {/* Target Response Ext */}
          <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
          {/* htmx configuration */}
          <script>htmx.config.globalViewTransitions = true;</script>

          {/* Hyperscript */}
          <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
          {/* TailwindCSS */}
          <link href="/styles.css" rel="preload stylesheet" as="style" />
          {/* Fonts */}
          <link
            href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2&display=swap"
            rel="preload stylesheet"
          />

          <title>Activity</title>
        </head>
        <body
          class="bg-white text-black/80 subpixel-antialiased dark:bg-gray-950 dark:text-white/80"
          hx-boost="true"
          hx-ext="response-targets, preload"
          _={`on every htmx:beforeSend in <button /> tell it toggle @disabled until htmx:afterOnLoad end
        on click add .hidden .opacity-0 .scale-95 to .dropdown end`}
          // Handles click outside for all menus
        >
          {/* Notifications fall all here! */}
          <div id="notification" />
          <div class="min-h-screen">
            <header class="border-b py-3 dark:border-gray-700">
              <div class="mx-auto flex max-w-7xl items-center justify-between px-8">
                <a
                  href="/"
                  class="group flex items-end gap-3 text-xl font-black hover:text-black dark:hover:text-white"
                  tabindex="-1"
                >
                  <i class="i-lucide-activity h-8 w-8 text-gray-500 group-hover:scale-105 group-hover:text-cyan-600" />
                  <span>Activity</span>
                </a>

                {isAuth ? (
                  <i
                    hx-get="/auth/navigation"
                    hx-trigger="load"
                    hx-swap="outerHTML"
                    class="i-lucide-fingerprint h-8 w-8 overflow-hidden rounded-full text-gray-500"
                  />
                ) : (
                  <LoginButton />
                )}
              </div>
            </header>
            <main class="mx-auto max-w-7xl px-0 lg:px-6">{children}</main>
          </div>
          <footer class="border-t dark:border-gray-700">
            <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 p-8 sm:flex-row">
              <i class="i-lucide-activity h-8 w-8" />
              <p class="flex-auto text-center text-sm leading-loose text-gray-600 dark:text-gray-400 sm:text-left">
                Built by{" "}
                <a class="text-black underline underline-offset-2 dark:text-white">
                  bojkomatias
                </a>
                . Source code available on{" "}
                <a class="text-black underline underline-offset-2 dark:text-white">
                  Github
                </a>
              </p>
              <DarkMode />
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
/**
 * A function to help with page refreshes!
 * So when a user triggers a refresh adds the layout. (avoid using redirects on handlers)
 * @hx Indicating a normal hx request, if not defaults to layout
 * @Component the JSX passed
 */
export const withLayout = (hx: boolean, Component: JSX.Element) => {
  return hx ? Component : <Layout>{Component}</Layout>;
};
