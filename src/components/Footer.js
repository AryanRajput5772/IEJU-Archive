import { renderIcon } from '../utils/icons.js';

export function renderFooter(onScrollToSection) {
  const footer = document.createElement('footer');
  footer.className = 'border-t relative py-12 transition-colors';
  footer.style.backgroundColor = 'var(--panel-bg)';
  footer.style.borderColor = 'var(--panel-border)';
  footer.style.color = 'var(--app-text)';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <!-- Brand -->
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <div 
              class="w-6 h-6 rounded-md p-[1px] shadow-sm"
              style="background-image: var(--heading-gradient)"
            >
              <div 
                class="w-full h-full rounded-[5px] flex items-center justify-center font-bold text-[10px]"
                style="background-color: var(--app-bg); color: var(--primary-accent)"
              >
                IE
              </div>
            </div>
            <span class="font-display font-bold text-base tracking-tight" style="color: var(--app-text)">
              IEJU Archive
            </span>
          </div>
          <p class="text-xs max-w-sm" style="color: var(--app-text-muted)">
            Institute of Engineering · Jiwaji University student academic repository.
          </p>
        </div>

        <!-- Quick Nav Mirror -->
        <nav class="flex flex-wrap items-center gap-6 text-xs" style="color: var(--app-text-muted)">
          <button data-scroll="branches" class="hover:opacity-100 transition-opacity">
            Papers & Notes
          </button>
          <button data-scroll="syllabus" class="hover:opacity-100 transition-opacity">
            Syllabus Matrix
          </button>
          <button data-scroll="testimonials" class="hover:opacity-100 transition-opacity">
            Testimonials
          </button>
          <button data-scroll="about" class="hover:opacity-100 transition-opacity">
            About
          </button>
          <button data-scroll="contact" class="hover:opacity-100 transition-opacity">
            Contact
          </button>
        </nav>

        <!-- Back to top -->
        <button
          id="scroll-to-top-btn"
          class="p-2.5 rounded-xl border transition-all hover:scale-105 flex items-center justify-center"
          style="border-color: var(--panel-border); background-color: var(--panel-subtle); color: var(--app-text);"
          title="Scroll to top"
        >
          ${renderIcon('arrowUp', 'w-4 h-4')}
        </button>
      </div>

      <!-- Legal & Attribution -->
      <div 
        class="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
        style="border-color: var(--panel-border); color: var(--app-text-muted);"
      >
        <div>
          Created with dedication by <strong class="font-semibold" style="color: var(--app-text)">Aryan Rajput</strong> in 2025.
        </div>

        <div class="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/-aryan-rajput"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors flex items-center gap-1 hover:underline"
            style="color: var(--primary-accent)"
          >
            ${renderIcon('linkedin', 'w-3.5 h-3.5')}
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/AryanRajput5772"
            target="_blank"
            rel="noopener noreferrer"
            class="transition-colors flex items-center gap-1 hover:underline"
            style="color: var(--app-text)"
          >
            ${renderIcon('github', 'w-3.5 h-3.5')}
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  `;

  // Attach nav handlers
  footer.querySelectorAll('button[data-scroll]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sectionId = btn.getAttribute('data-scroll');
      if (sectionId && onScrollToSection) onScrollToSection(sectionId);
    });
  });

  footer.querySelector('#scroll-to-top-btn')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  return footer;
}
