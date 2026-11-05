import { THEMES } from '../data/themes.js';
import { getIconSvg } from '../utils/icons.js';

export function renderThemeSwitcher(currentTheme, onSelectTheme, isCompact = false, isOpen = false, onToggleOpen) {
  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  const dotClass = activeTheme.id === 'pure-black'
    ? 'ring-1.5 ring-white/90 border border-neutral-700'
    : activeTheme.id === 'light'
    ? 'ring-1.5 ring-sky-300/80 shadow-[0_0_6px_rgba(186,230,253,0.5)]'
    : 'ring-1 ring-white/30';

  return `
    <div className="relative theme-switcher-container">
      <button
        id="theme-switcher-toggle"
        class="relative p-2 rounded-xl glass-panel-subtle transition-all flex items-center gap-1.5 focus:outline-none hover:scale-[1.02]"
        style="color: var(--app-text); border-color: var(--panel-border)"
        title="Change Theme (Current: ${activeTheme.name})"
        aria-label="Change website theme"
      >
        ${getIconSvg('palette', 'w-4 h-4 transition-transform group-hover:rotate-12', 'color: var(--primary-accent)')}
        <span
          class="w-2.5 h-2.5 rounded-full shadow-sm ${dotClass}"
          style="background-color: ${activeTheme.dotColor}"
        ></span>
        ${!isCompact ? `<span class="hidden xl:inline text-xs font-semibold" style="color: var(--app-text)">${activeTheme.name.split(' ')[0]}</span>` : ''}
      </button>

      ${isOpen ? `
        <div 
          id="theme-dropdown-menu"
          class="absolute right-0 mt-2 w-72 p-2 rounded-2xl glass-panel z-50 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95"
          style="background-color: var(--modal-bg); border-color: var(--panel-border)"
        >
          <div 
            class="px-3 py-2 border-b mb-1"
            style="border-color: var(--panel-border)"
          >
            <div class="text-[11px] font-bold uppercase tracking-wider" style="color: var(--app-text)">
              Select Theme
            </div>
            <div class="text-[10px]" style="color: var(--app-text-muted)">
              Curated glassmorphism & color atmospheres
            </div>
          </div>

          <div class="space-y-1">
            ${THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme;
              const themeDotClass = theme.id === 'pure-black'
                ? 'ring-1.5 ring-white/90 border border-neutral-700'
                : theme.id === 'light'
                ? 'ring-1.5 ring-sky-300/80 shadow-[0_0_8px_rgba(186,230,253,0.5)]'
                : 'ring-1 ring-white/30';

              return `
                <button
                  data-theme-id="${theme.id}"
                  class="theme-select-option w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition-all"
                  style="
                    background-color: ${isSelected ? 'var(--panel-subtle)' : 'transparent'};
                    border: ${isSelected ? '1px solid var(--primary-accent)' : '1px solid transparent'};
                  "
                >
                  <div class="flex items-center gap-2.5 min-w-0">
                    <span
                      class="w-3.5 h-3.5 rounded-full shrink-0 shadow-md ${themeDotClass}"
                      style="background-color: ${theme.dotColor}"
                    ></span>
                    <div class="min-w-0">
                      <div class="text-xs font-semibold tracking-tight truncate" style="color: var(--app-text)">
                        ${theme.name}
                      </div>
                      <div class="text-[10px] truncate" style="color: var(--app-text-muted)">
                        ${theme.tagline}
                      </div>
                    </div>
                  </div>

                  ${isSelected ? getIconSvg('check', 'w-3.5 h-3.5 shrink-0', 'color: var(--primary-accent)') : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
}
