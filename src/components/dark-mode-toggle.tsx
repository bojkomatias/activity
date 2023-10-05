export default function DarkMode() {
  return (
    <div class="flex items-center text-muted-foreground">
      <div
        id="moon"
        class="rounded-full p-2 hover:text-foreground"
        _="on click window.localStorage.setItem('theme','dark') add .dark to <html/> take .bg-muted take .text-foreground"
      >
        <i class="i-lucide-moon h-5 w-5" />
      </div>
      <div
        id="sun"
        class="rounded-full p-2 hover:text-foreground active:scale-95"
        _="on click window.localStorage.setItem('theme','light') remove .dark from <html/> take .bg-muted take .text-foreground"
      >
        <i class="i-lucide-sun h-5 w-5" />
      </div>
      <div
        id="system"
        class="rounded-full p-2 hover:text-foreground active:scale-95"
        _="on click window.localStorage.removeItem('theme') if window.matchMedia('(prefers-color-scheme: dark)').matches then add .dark to <html/> else remove .dark from <html/> end take .bg-muted take .text-foreground"
      >
        <i class="i-lucide-monitor h-5 w-5" />
      </div>

      {/* Script initializes local storage for theme based on match user media */}
      <div
        _="init 
        if window.localStorage.getItem('theme') === 'light' then remove .dark from <html/> add .bg-muted .text-foreground to #sun else
        if window.localStorage.getItem('theme') === 'dark' then add .dark to <html/> add .bg-muted .text-foreground to #moon else 
        if window.matchMedia('(prefers-color-scheme: dark)').matches then add .dark to <html/> add .bg-muted .text-foreground to #system 
        else remove .dark from <html/> add .bg-muted .text-foreground to #system end"
      />
    </div>
  );
}
