import { siteConfig } from "@/config/site";
import DarkMode from "../components/dark-mode-toggle";
import { button } from "@/components/button";

/** Used to inject into other layouts */
export function BaseLayout({ children }: { children?: any }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="description" content={siteConfig.description} />
        <meta name="keywords" content={siteConfig.keywords} />
        <meta name="author" content={siteConfig.author} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <link href="/styles.css" rel="preload stylesheet" />
        {/* Fonts */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=sora@2,1&display=swap"
          rel="stylesheet"
        />

        {/* Favicon + Title */}
        <link rel="icon" href="/public/vercel.svg" />
        <title>{siteConfig.name}</title>
      </head>
      <body
        class="w-screen overflow-x-hidden bg-background bg-cover text-foreground antialiased"
        hx-boost="true"
        hx-ext="response-targets, preload"
        _="on click send close to .dropdown end
        on mousemove throttled at 20ms send move(x:event.clientX, y:event.clientY) to #radial-gradient end"

        // Handles click outside for all menus
      >
        <div
          id="radial-gradient"
          _="on move(x,y) set my.style.left to (x-500) set my.style.top to (y-500)"
        />
        {/* Notifications fall all here! */}
        <div id="notification" />
        <div id="page-content" class="min-h-[100svh]">
          {children}
        </div>
        <footer class="border-t border-border bg-card">
          <div class="flex flex-col items-center gap-6 px-2 py-8 sm:flex-row sm:px-6 lg:px-16">
            <i class="i-lucide-activity h-8 w-8" />
            <p class="flex-auto text-center text-sm leading-loose text-muted-foreground sm:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
                class={button({ intent: "link", class: "lowercase" })}
              >
                bojkomatias
              </a>
              .<br class="block sm:hidden" /> Source code available on{" "}
              <a
                href={siteConfig.links.github}
                class={button({ intent: "link" })}
              >
                Github
              </a>
            </p>
            <DarkMode />
          </div>
        </footer>
      </body>
    </html>
  );
}
