export default function DarkMode() {
  return (
    <>
      <div
        id="sun"
        class="h-10 w-10 cursor-pointer rounded-full p-2.5 hover:bg-white/5 active:scale-95"
        _="on click window.localStorage.setItem('theme','light') take .dark from <html/> show #moon hide me"
      >
        <i class="i-lucide-sun h-5 w-5" />
      </div>
      <div
        id="moon"
        class="h-10 w-10 cursor-pointer rounded-full p-2.5 hover:bg-black/5"
        _="on click window.localStorage.setItem('theme','dark') add .dark to <html/> show #sun hide me"
      >
        <i class="i-lucide-moon h-5 w-5" />
      </div>

      {/* Script initializes local storage for theme based on match user media */}
      <div
        _="init 
            if window.localStorage.getItem('theme') === undefined 
              then js window.localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') end
              end
            if window.localStorage.getItem('theme') === 'dark' then add .dark to <html/> hide #moon else hide #sun end
        "
      />
    </>
  );
}
