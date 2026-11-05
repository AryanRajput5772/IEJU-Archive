import { TESTIMONIALS } from '../data/archiveData.js';
import { getIconSvg } from '../utils/icons.js';

let isModalOpen = false;
let submitted = false;
let testimonialsList = [...TESTIMONIALS];

export function renderTestimonialsSection() {
  const section = document.createElement('section');
  section.id = 'testimonials';
  section.className = 'py-16 lg:py-24 relative overflow-hidden';

  section.innerHTML = `
    <!-- Background radial glow -->
    <div 
      class="absolute top-1/2 right-1/4 w-96 h-96 blur-[130px] pointer-events-none rounded-full opacity-30"
      style="background-color: var(--mesh-2)"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
      
      <!-- Header -->
      <div 
        class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b"
        style="border-color: var(--panel-border)"
      >
        <div class="space-y-2">
          <div 
            class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
            style="color: var(--primary-accent)"
          >
            <span>Student Community</span>
            <span class="opacity-40">·</span>
            <span>Wall of Love</span>
          </div>
          <h2 
            class="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors"
            style="color: var(--app-text)"
          >
            Testimonials from IEJU Students
          </h2>
          <p class="text-sm max-w-xl" style="color: var(--app-text-muted)">
            Real feedback from Bachelor of Engineering students at Jiwaji University using the archive for semester exams and study materials.
          </p>
        </div>

        <button
          id="open-testimonial-modal-btn"
          class="px-5 py-2.5 rounded-xl glass-panel text-xs font-semibold flex items-center gap-2 shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-95 cursor-pointer"
          style="border-color: var(--panel-border); color: var(--app-text)"
        >
          ${getIconSvg('messageSquare', 'w-4 h-4', 'color: var(--primary-accent)')}
          <span>Share Your Review</span>
        </button>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${testimonialsList.map((t) => `
          <div
            class="p-6 rounded-2xl glass-panel-interactive flex flex-col justify-between space-y-4 group"
            style="border-color: var(--panel-border)"
          >
            <div class="space-y-3">
              ${getIconSvg('quote', 'w-6 h-6 transition-colors opacity-80', 'color: var(--primary-accent)')}
              <p class="text-xs sm:text-sm leading-relaxed italic" style="color: var(--app-text-muted)">
                "${t.quote}"
              </p>
            </div>

            <div 
              class="pt-4 border-t flex items-center justify-between text-xs"
              style="border-color: var(--panel-border)"
            >
              <div>
                <div class="font-semibold transition-colors" style="color: var(--app-text)">
                  ${t.name}
                </div>
                <div class="text-[11px]" style="color: var(--app-text-muted)">
                  ${t.role || 'BE Engineering Student'}
                </div>
              </div>

              ${
                t.date
                  ? `<span class="text-[10px] font-mono opacity-60" style="color: var(--app-text-muted)">
                      ${t.date}
                     </span>`
                  : ''
              }
            </div>
          </div>
        `).join('')}
      </div>

    </div>

    <!-- Share Testimonial Modal -->
    ${
      isModalOpen
        ? `
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
        <div 
          class="w-full max-w-md glass-panel rounded-2xl shadow-2xl p-6 space-y-5 backdrop-blur-2xl relative"
          style="background-color: var(--modal-bg); border-color: var(--panel-border); color: var(--app-text)"
        >
          <div 
            class="flex items-center justify-between pb-3 border-b"
            style="border-color: var(--panel-border)"
          >
            <h3 class="text-lg font-bold tracking-tight" style="color: var(--app-text)">Share Your Experience</h3>
            <button
              id="close-testimonial-modal-btn"
              class="text-xs p-1 opacity-60 hover:opacity-100 cursor-pointer"
              style="color: var(--app-text)"
            >
              ✕
            </button>
          </div>

          ${
            submitted
              ? `
            <div class="py-8 text-center space-y-2" style="color: var(--primary-accent)">
              ${getIconSvg('check', 'w-10 h-10 mx-auto')}
              <h4 class="text-base font-semibold" style="color: var(--app-text)">Thank you for your feedback!</h4>
              <p class="text-xs" style="color: var(--app-text-muted)">Your testimonial has been added to the archive wall.</p>
              <button
                id="done-testimonial-btn"
                class="mt-4 px-5 py-2 rounded-xl text-xs font-semibold shadow-md cursor-pointer"
                style="background-image: var(--btn-bg); color: var(--btn-text)"
              >
                Close
              </button>
            </div>
          `
              : `
            <form id="testimonial-form" class="space-y-4">
              <div>
                <label class="block text-xs font-medium mb-1" style="color: var(--app-text)">Your Full Name</label>
                <input
                  type="text"
                  id="testimonial-name"
                  required
                  placeholder="e.g. Aryan Sharma"
                  class="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium mb-1" style="color: var(--app-text)">Branch</label>
                  <input
                    type="text"
                    id="testimonial-branch"
                    placeholder="CSE / EE / CE"
                    class="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style="
                      background-color: var(--panel-subtle);
                      border-color: var(--panel-border);
                      color: var(--app-text);
                    "
                  />
                </div>
                <div>
                  <label class="block text-xs font-medium mb-1" style="color: var(--app-text)">Semester</label>
                  <input
                    type="text"
                    id="testimonial-semester"
                    placeholder="e.g. 4th Sem"
                    class="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style="
                      background-color: var(--panel-subtle);
                      border-color: var(--panel-border);
                      color: var(--app-text);
                    "
                  />
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium mb-1" style="color: var(--app-text)">Your Review / Message</label>
                <textarea
                  id="testimonial-quote"
                  required
                  rows="4"
                  placeholder="How has IEJU Archive helped you prepare for exams or access question papers?"
                  class="w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                ></textarea>
              </div>

              <div class="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  id="cancel-testimonial-btn"
                  class="px-4 py-2 text-xs font-medium opacity-60 hover:opacity-100 cursor-pointer"
                  style="color: var(--app-text)"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                  style="
                    background-image: var(--btn-bg);
                    color: var(--btn-text);
                  "
                >
                  ${getIconSvg('send', 'w-3.5 h-3.5')}
                  Submit Review
                </button>
              </div>
            </form>
          `
          }
        </div>
      </div>
    `
        : ''
    }
  `;

  // Attach event handlers
  section.querySelector('#open-testimonial-modal-btn')?.addEventListener('click', () => {
    isModalOpen = true;
    submitted = false;
    const updated = renderTestimonialsSection();
    section.replaceWith(updated);
  });

  section.querySelector('#close-testimonial-modal-btn')?.addEventListener('click', () => {
    isModalOpen = false;
    const updated = renderTestimonialsSection();
    section.replaceWith(updated);
  });

  section.querySelector('#cancel-testimonial-btn')?.addEventListener('click', () => {
    isModalOpen = false;
    const updated = renderTestimonialsSection();
    section.replaceWith(updated);
  });

  section.querySelector('#done-testimonial-btn')?.addEventListener('click', () => {
    isModalOpen = false;
    const updated = renderTestimonialsSection();
    section.replaceWith(updated);
  });

  section.querySelector('#testimonial-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = section.querySelector('#testimonial-name')?.value || 'Anonymous Student';
    const branch = section.querySelector('#testimonial-branch')?.value || 'CSE';
    const sem = section.querySelector('#testimonial-semester')?.value || 'Engineering Student';
    const quote = section.querySelector('#testimonial-quote')?.value || '';

    if (quote.trim()) {
      testimonialsList.unshift({
        id: `custom-${Date.now()}`,
        name,
        quote,
        role: `${branch} · ${sem}`,
        date: 'Just Now',
      });
      submitted = true;
      const updated = renderTestimonialsSection();
      section.replaceWith(updated);
    }
  });

  return section;
}
