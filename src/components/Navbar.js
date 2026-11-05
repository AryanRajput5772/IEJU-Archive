import { renderThemeSwitcher } from './ThemeSwitcher.js';
import { THEMES } from '../data/themes.js';
import { getIconSvg } from '../utils/icons.js';

let isMobileMenuOpen = false;
let isThemeSwitcherOpen = false;

// Global listener to close theme switcher dropdown when clicking anywhere outside
if (typeof window !== 'undefined' && !window._themeClickOutsideBound) {
  window._themeClickOutsideBound = true;
  document.addEventListener('click', (e) => {
    if (isThemeSwitcherOpen) {
      const toggleBtn = document.querySelector('#theme-switcher-toggle');
      const dropdownMenu = document.querySelector('#theme-dropdown-menu');
      
      if (
        (toggleBtn && toggleBtn.contains(e.target)) ||
        (dropdownMenu && dropdownMenu.contains(e.target))
      ) {
        return;
      }

      isThemeSwitcherOpen = false;
      const currentHeader = document.querySelector('header');
      if (currentHeader) {
        const dropdown = currentHeader.querySelector('#theme-dropdown-menu');
        if (dropdown) dropdown.remove();
      }
    }
  });
}

export function renderNavbar(props) {
  const {
    currentTheme = 'pure-black',
    bookmarkCount = 0,
    onSelectTheme,
    onOpenSearch,
    onOpenBookmarks,
    onScrollToSection,
  } = props;

  const currentThemeName = THEMES.find((t) => t.id === currentTheme)?.name || 'Nebula Noir';

  const header = document.createElement('header');
  header.className = 'fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 transition-all duration-300';

  header.innerHTML = `
    <div 
      class="max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6 glass-panel shadow-2xl"
      style="border-color: var(--panel-border)"
    >
      <!-- Zone 1: Brand wordmark -->
      <button
        data-nav="hero"
        class="nav-link-btn flex items-center gap-2 text-left group whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
      >
        <div 
          class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg p-[1.5px] shadow-md transition-all shrink-0"
          style="background-image: var(--heading-gradient)"
        >
          <div 
            class="w-full h-full rounded-[6px] flex items-center justify-center font-display font-extrabold text-[11px] sm:text-xs transition-colors"
            style="background-color: var(--app-bg); color: var(--primary-accent)"
          >
            IE
          </div>
        </div>
        <span 
          class="font-display font-bold text-base sm:text-lg tracking-tight transition-colors"
          style="color: var(--app-text)"
        >
          IEJU Archive
        </span>
      </button>

      <!-- Zone 2: Nav links (desktop) -->
      <nav 
        class="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wide uppercase transition-colors"
        style="color: var(--app-text-muted)"
      >
        <button
          data-nav="branches"
          class="nav-link-btn hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style="color: inherit"
        >
          Question Papers
        </button>
        <button
          data-nav="syllabus"
          class="nav-link-btn hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style="color: inherit"
        >
          Syllabus Matrix
        </button>
        <button
          data-nav="testimonials"
          class="nav-link-btn hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style="color: inherit"
        >
          Testimonials
        </button>
        <button
          data-nav="about"
          class="nav-link-btn hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style="color: inherit"
        >
          About
        </button>
        <button
          data-nav="faq"
          class="nav-link-btn hover:opacity-100 transition-opacity whitespace-nowrap shrink-0 cursor-pointer"
          style="color: inherit"
        >
          FAQs
        </button>
      </nav>

      <!-- Zone 3: Actions -->
      <div class="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        
        <!-- Theme Selector Icon Button -->
        ${renderThemeSwitcher(currentTheme, null, false, isThemeSwitcherOpen)}

        <!-- Quick Search Trigger -->
        <button
          id="open-search-btn"
          class="p-2 sm:px-2.5 sm:py-1.5 rounded-xl glass-panel-subtle text-xs flex items-center gap-1.5 transition-all hover:scale-[1.02] cursor-pointer"
          style="color: var(--app-text); border-color: var(--panel-border)"
          title="Search archive (Cmd + K)"
        >
          ${getIconSvg('search', 'w-4 h-4 sm:w-5 sm:h-5', 'color: var(--primary-accent)')}
          <span class="hidden md:inline">Search</span>
          <kbd 
            class="hidden xl:inline text-[10px] px-1.5 py-0.5 rounded font-mono opacity-70"
            style="background-color: var(--panel-subtle); color: var(--app-text-muted)"
          >
            ⌘K
          </kbd>
        </button>

        <!-- Bookmarks Drawer Trigger -->
        <button
          id="open-bookmarks-btn"
          class="relative p-2 rounded-xl glass-panel-subtle transition-all hover:scale-[1.02] cursor-pointer"
          style="color: var(--app-text); border-color: var(--panel-border)"
          title="View saved materials"
        >
          ${getIconSvg('bookmark', 'w-4 h-4')}
          ${
            bookmarkCount > 0
              ? `<span 
                  class="absolute -top-1 -right-1 w-4 h-4 rounded-full font-mono font-bold text-[9px] flex items-center justify-center shadow-md"
                  style="background-color: var(--primary-accent); color: var(--btn-text)"
                 >
                  ${bookmarkCount}
                 </span>`
              : ''
          }
        </button>

        <!-- Primary Action Button -->
        <button
          data-nav="contact"
          class="nav-link-btn hidden sm:inline-flex px-3.5 sm:px-4 py-2 text-xs font-semibold rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
          style="background-image: var(--btn-bg); color: var(--btn-text)"
        >
          Contribute
        </button>

        <!-- Mobile hamburger menu toggle -->
        <button
          id="mobile-menu-toggle"
          class="lg:hidden p-2 rounded-xl glass-panel-subtle cursor-pointer"
          style="color: var(--app-text); border-color: var(--panel-border)"
          aria-label="Toggle navigation menu"
        >
          ${isMobileMenuOpen ? getIconSvg('x', 'w-5 h-5') : getIconSvg('menu', 'w-5 h-5')}
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    ${
      isMobileMenuOpen
        ? `
      <div 
        class="lg:hidden mt-2 max-w-7xl mx-auto rounded-2xl glass-panel p-5 shadow-2xl animate-fade-in space-y-4"
        style="background-color: var(--modal-bg); border-color: var(--panel-border)"
      >
        <!-- Quick Theme Selector Strip on Mobile -->
        <div 
          class="space-y-2 pb-3 border-b"
          style="border-color: var(--panel-border)"
        >
          <div class="flex items-center justify-between text-xs font-semibold" style="color: var(--app-text-muted)">
            <span class="flex items-center gap-1.5">
              ${getIconSvg('palette', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
              Color Theme
            </span>
            <span class="text-[11px] font-mono font-semibold" style="color: var(--primary-accent)">
              ${currentThemeName}
            </span>
          </div>
          <div class="grid grid-cols-6 gap-2">
            ${THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme;
              const dotClass =
                theme.id === 'pure-black'
                  ? 'ring-1.5 ring-white/90 border border-neutral-700'
                  : theme.id === 'light'
                  ? 'ring-1.5 ring-sky-300/80 shadow-[0_0_8px_rgba(186,230,253,0.5)]'
                  : 'ring-1 ring-white/30';

              return `
                <button
                  data-theme-id="${theme.id}"
                  class="mobile-theme-select-btn h-9 rounded-xl flex items-center justify-center border transition-all cursor-pointer ${
                    isSelected ? 'ring-2 bg-white/[0.1]' : 'hover:opacity-80'
                  }"
                  style="
                    border-color: ${isSelected ? 'var(--primary-accent)' : 'var(--panel-border)'};
                    background-color: ${isSelected ? 'var(--panel-subtle)' : 'transparent'};
                  "
                  title="${theme.name}"
                >
                  <span 
                    class="w-4 h-4 rounded-full shadow-md ${dotClass}"
                    style="background-color: ${theme.dotColor}"
                  ></span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Nav Links -->
        <nav class="flex flex-col gap-1.5 text-sm font-medium" style="color: var(--app-text)">
          <button
            data-nav="branches"
            class="nav-link-btn text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Question Papers & Notes
          </button>
          <button
            data-nav="syllabus"
            class="nav-link-btn text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Syllabus Matrix
          </button>
          <button
            data-nav="testimonials"
            class="nav-link-btn text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Student Testimonials
          </button>
          <button
            data-nav="about"
            class="nav-link-btn text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            About Creator & Vision
          </button>
          <button
            data-nav="faq"
            class="nav-link-btn text-left py-2.5 px-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            Frequently Asked Questions
          </button>
        </nav>

        <div 
          class="pt-2 border-t flex items-center justify-between gap-3"
          style="border-color: var(--panel-border)"
        >
          <button
            data-nav="contact"
            class="nav-link-btn w-full py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            style="background-image: var(--btn-bg); color: var(--btn-text)"
          >
            Contribute Notes / Contact
          </button>
        </div>
      </div>
    `
        : ''
    }
  `;

  // Attach event handlers to header DOM node
  header.querySelectorAll('.nav-link-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const navTarget = btn.getAttribute('data-nav');
      if (navTarget && onScrollToSection) {
        onScrollToSection(navTarget);
      }
      isMobileMenuOpen = false;
      isThemeSwitcherOpen = false;
    });
  });

  header.querySelector('#open-search-btn')?.addEventListener('click', () => {
    isThemeSwitcherOpen = false;
    if (onOpenSearch) onOpenSearch();
  });

  header.querySelector('#open-bookmarks-btn')?.addEventListener('click', () => {
    isThemeSwitcherOpen = false;
    if (onOpenBookmarks) onOpenBookmarks();
  });

  // Toggle theme switcher dropdown
  header.querySelector('#theme-switcher-toggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    isThemeSwitcherOpen = !isThemeSwitcherOpen;
    const newHeader = renderNavbar(props);
    header.replaceWith(newHeader);
  });

  // Theme option clicks
  header.querySelectorAll('.theme-select-option, .mobile-theme-select-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      isThemeSwitcherOpen = false; // Set to false BEFORE triggering re-render!
      const themeId = btn.getAttribute('data-theme-id');
      if (themeId && onSelectTheme) {
        onSelectTheme(themeId);
      }
    });
  });

  // Mobile menu toggle
  header.querySelector('#mobile-menu-toggle')?.addEventListener('click', (e) => {
    e.stopPropagation();
    isMobileMenuOpen = !isMobileMenuOpen;
    isThemeSwitcherOpen = false;
    const newHeader = renderNavbar(props);
    header.replaceWith(newHeader);
  });

  return header;
}
