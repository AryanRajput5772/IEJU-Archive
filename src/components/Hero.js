import { getIconSvg } from '../utils/icons.js';

export function renderHero(props = {}) {
  const { searchQuery = '', onOpenSearch, onScrollToSection } = props;

  const section = document.createElement('section');
  section.id = 'hero';
  section.className = 'relative pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 overflow-hidden';

  section.innerHTML = `
    <!-- Background Glow Refractions -->
    <div 
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[200px] sm:h-[350px] blur-[110px] sm:blur-[140px] pointer-events-none rounded-full opacity-60"
      style="background: radial-gradient(circle, var(--mesh-1) 0%, var(--mesh-2) 60%, transparent 100%)"
    ></div>
    <div 
      class="absolute top-10 right-4 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 blur-[90px] pointer-events-none rounded-full opacity-40"
      style="background: var(--mesh-2)"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        <!-- Left Column: Value Proposition -->
        <div class="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
          <!-- Unboxed Metadata Tagline -->
          <div 
            class="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors duration-300"
            style="color: var(--primary-accent)"
          >
            <span>Institute of Engineering</span>
            <span class="opacity-40" aria-hidden="true">·</span>
            <span>Jiwaji University</span>
            <span class="opacity-40 hidden xs:inline" aria-hidden="true">·</span>
            <span class="hidden xs:inline">Est. 2025</span>
          </div>

          <!-- Headline -->
          <h1 
            class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.15] text-balance transition-colors duration-300"
            style="color: var(--app-text)"
          >
            Academic Resources <br class="hidden sm:inline" />
            <span 
              class="text-transparent bg-clip-text transition-all duration-300"
              style="background-image: var(--heading-gradient)"
            >
              Engineered for Excellence.
            </span>
          </h1>

          <!-- Subtitle -->
          <p 
            class="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed transition-colors duration-300"
            style="color: var(--app-text-muted)"
          >
            The premier digital archive for BE engineering students at Jiwaji University. Effortlessly access previous years' question papers, verified unit-wise notes, textbooks, and official syllabi across all eight semesters.
          </p>

          <!-- Hero Search Input -->
          <div class="pt-1 max-w-xl mx-auto lg:mx-0">
            <div class="relative group">
              <div 
                class="absolute -inset-0.5 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition duration-300"
                style="background: var(--heading-gradient)"
              ></div>
              <div 
                class="relative flex items-center glass-panel rounded-2xl p-1.5 sm:p-2 shadow-2xl backdrop-blur-2xl transition-colors"
                style="border-color: var(--panel-border)"
              >
                ${getIconSvg('search', 'w-4 h-4 sm:w-5 sm:h-5 ml-2.5 sm:ml-3 mr-2 shrink-0 transition-colors', 'color: var(--primary-accent)')}
                <input
                  id="hero-search-input"
                  type="text"
                  value="${searchQuery}"
                  placeholder="Search subject code (101, BEEE) or topic..."
                  class="w-full bg-transparent text-xs sm:text-sm focus:outline-none py-1.5 sm:py-2 pr-2 font-normal placeholder:opacity-60 cursor-pointer"
                  style="color: var(--app-text)"
                  readonly
                />
                <button
                  id="hero-browse-btn"
                  data-nav="branches"
                  class="px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold rounded-xl shadow-md transition-all shrink-0 flex items-center gap-1 active:scale-95"
                  style="background-image: var(--btn-bg); color: var(--btn-text)"
                >
                  <span>Browse</span>
                  ${getIconSvg('arrowRight', 'w-3.5 h-3.5')}
                </button>
              </div>
            </div>
          </div>

          <!-- Quick Action Buttons -->
          <div class="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 pt-1">
            <button
              data-nav="branches"
              class="nav-link-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl glass-panel text-xs font-semibold flex items-center gap-2 backdrop-blur-md transition-all hover:scale-[1.02]"
              style="color: var(--app-text); border-color: var(--panel-border)"
            >
              ${getIconSvg('bookOpen', 'w-4 h-4', 'color: var(--primary-accent)')}
              <span>Question Papers & Notes</span>
            </button>
            <button
              data-nav="syllabus"
              class="nav-link-btn px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl glass-panel-subtle text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.02]"
              style="color: var(--app-text-muted); border-color: var(--panel-border)"
            >
              ${getIconSvg('layers', 'w-4 h-4', 'color: var(--primary-accent)')}
              <span>Syllabus Matrix</span>
            </button>
          </div>

          <!-- Stats Bar -->
          <div 
            class="pt-5 sm:pt-6 border-t grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            style="border-color: var(--panel-border)"
          >
            <div class="p-2 sm:p-0">
              <div 
                class="text-xl sm:text-3xl font-display font-bold tracking-tight font-mono"
                style="color: var(--app-text)"
              >
                8 Sem
              </div>
              <div 
                class="text-[11px] sm:text-xs font-medium"
                style="color: var(--app-text-muted)"
              >
                Complete Cycle
              </div>
            </div>
            <div 
              class="p-2 sm:p-0 border-x sm:border-0 px-2 sm:px-0"
              style="border-color: var(--panel-border)"
            >
              <div 
                class="text-xl sm:text-3xl font-display font-bold tracking-tight font-mono transition-colors"
                style="color: var(--primary-accent)"
              >
                3 Streams
              </div>
              <div 
                class="text-[11px] sm:text-xs font-medium"
                style="color: var(--app-text-muted)"
              >
                CSE · EE · CE
              </div>
            </div>
            <div class="p-2 sm:p-0">
              <div 
                class="text-xl sm:text-3xl font-display font-bold tracking-tight font-mono transition-colors"
                style="color: var(--primary-accent)"
              >
                100%
              </div>
              <div 
                class="text-[11px] sm:text-xs font-medium"
                style="color: var(--app-text-muted)"
              >
                Free Access
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Visual Showcase Card -->
        <div class="lg:col-span-5 relative mt-4 lg:mt-0">
          <div 
            class="relative rounded-2xl overflow-hidden glass-panel p-1.5 sm:p-2 shadow-2xl group max-w-md mx-auto lg:max-w-none"
            style="border-color: var(--panel-border)"
          >
            <div class="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden bg-black/60">
              <img
                src="/src/assets/images/hero_ieju_archive_1793718672897.jpg"
                alt="IEJU Archive Engineering Laboratory"
                referrerpolicy="no-referrer"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"></div>
              
              <!-- Floating Glass Highlight Tag -->
              <div class="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3 sm:p-4 rounded-xl glass-panel bg-black/75 border border-white/10 backdrop-blur-xl space-y-1">
                <div 
                  class="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold"
                  style="color: var(--primary-accent)"
                >
                  <span>ARCHIVE VERIFIED</span>
                  <span>JIWAJI UNIVERSITY</span>
                </div>
                <h4 class="text-xs sm:text-sm font-semibold text-white tracking-tight">
                  Centralized Academic Repository
                </h4>
                <p class="text-[11px] sm:text-xs text-neutral-300 line-clamp-1">
                  Previous year papers, lecture notes, textbooks & exam structures.
                </p>
              </div>
            </div>
          </div>

          <!-- Badge -->
          <div 
            class="hidden sm:block absolute -top-4 -left-4 p-2.5 sm:p-3 rounded-xl glass-panel shadow-xl backdrop-blur-xl"
            style="border-color: var(--panel-border); color: var(--app-text)"
          >
            <div class="flex items-center gap-2 text-xs font-medium">
              ${getIconSvg('sparkles', 'w-4 h-4', 'color: var(--primary-accent)')}
              <span>Instant Google Drive Sync</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  // Attach search input click to open search modal
  section.querySelector('#hero-search-input')?.addEventListener('click', () => {
    if (onOpenSearch) onOpenSearch();
  });

  // Attach nav buttons
  section.querySelectorAll('.nav-link-btn, #hero-browse-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const navTarget = btn.getAttribute('data-nav');
      if (navTarget && onScrollToSection) {
        onScrollToSection(navTarget);
      }
    });
  });

  return section;
}
