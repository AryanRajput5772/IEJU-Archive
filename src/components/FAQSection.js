import { FAQS } from '../data/archiveData.js';
import { getIconSvg } from '../utils/icons.js';

let openFaqIndices = [0];

export function renderFAQSection() {
  const section = document.createElement('section');
  section.id = 'faq';
  section.className = 'py-16 lg:py-24 relative';

  section.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <div 
          class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          style="color: var(--primary-accent)"
        >
          ${getIconSvg('helpCircle', 'w-3.5 h-3.5')}
          <span>Got Questions?</span>
        </div>
        <h2 
          class="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors"
          style="color: var(--app-text)"
        >
          Frequently Asked Questions
        </h2>
        <p class="text-sm max-w-lg mx-auto" style="color: var(--app-text-muted)">
          Everything you need to know about navigating syllabi, downloading question papers, and contributing unit notes.
        </p>
      </div>

      <!-- Accordion List -->
      <div class="space-y-3">
        ${FAQS.map((faq, idx) => {
          const isOpen = openFaqIndices.includes(idx);
          return `
            <div
              class="rounded-2xl glass-panel overflow-hidden transition-all duration-200"
              style="border-color: var(--panel-border)"
            >
              <button
                data-faq-idx="${idx}"
                class="faq-toggle-btn w-full p-5 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none cursor-pointer"
                style="background-color: transparent"
              >
                <span class="text-sm sm:text-base font-semibold tracking-tight" style="color: var(--app-text)">
                  ${faq.question}
                </span>
                <div 
                  class="p-1 rounded-lg transition-transform duration-200"
                  style="
                    transform: ${isOpen ? 'rotate(180deg)' : 'none'};
                    color: ${isOpen ? 'var(--primary-accent)' : 'var(--app-text-muted)'};
                    background-color: var(--panel-subtle);
                  "
                >
                  ${getIconSvg('chevronDown', 'w-4 h-4')}
                </div>
              </button>

              ${
                isOpen
                  ? `
                <div 
                  class="px-5 pb-5 pt-1 border-t text-xs sm:text-sm leading-relaxed space-y-3 animate-fade-in"
                  style="border-color: var(--panel-border); color: var(--app-text-muted)"
                >
                  <p>${faq.answer}</p>
                  ${
                    faq.details
                      ? `
                    <ul class="list-disc list-inside space-y-1.5 pl-1 text-xs">
                      ${faq.details.map((d) => `<li>${d}</li>`).join('')}
                    </ul>
                  `
                      : ''
                  }
                </div>
              `
                  : ''
              }
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  // Attach accordion handlers
  section.querySelectorAll('.faq-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-faq-idx'));
      if (openFaqIndices.includes(idx)) {
        openFaqIndices = openFaqIndices.filter((i) => i !== idx);
      } else {
        openFaqIndices.push(idx);
      }
      const updated = renderFAQSection();
      section.replaceWith(updated);
    });
  });

  return section;
}
