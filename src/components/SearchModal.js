import { renderIcon } from '../utils/icons.js';
import { SUBJECT_RESOURCES, SYLLABUS_DATA } from '../data/archiveData.js';

export function renderSearchModal(props) {
  const {
    isOpen,
    onClose,
    onSelectSubject,
    onSelectSyllabus,
    initialQuery = '',
  } = props;

  if (!isOpen) {
    const hidden = document.createElement('div');
    hidden.id = 'search-modal-root';
    return hidden;
  }

  const modalRoot = document.createElement('div');
  modalRoot.id = 'search-modal-root';
  modalRoot.className = 'fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in';

  let query = initialQuery;
  const q = query.trim().toLowerCase();

  const matchedSubjects = q
    ? SUBJECT_RESOURCES.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      )
    : SUBJECT_RESOURCES.slice(0, 5);

  const matchedSyllabus = q
    ? SYLLABUS_DATA.filter(
        (s) =>
          s.branchName.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          `semester ${s.semester}`.includes(q) ||
          `sem ${s.semester}`.includes(q) ||
          s.branch.toLowerCase().includes(q)
      )
    : SYLLABUS_DATA.slice(0, 3);

  modalRoot.innerHTML = `
    <div 
      class="w-full max-w-2xl glass-panel rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
      style="background-color: var(--modal-bg); border-color: var(--panel-border); color: var(--app-text);"
    >
      <!-- Search Input Bar -->
      <div 
        class="p-4 border-b flex items-center gap-3"
        style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
      >
        ${renderIcon('search', 'w-5 h-5 shrink-0', 'color: var(--primary-accent)')}
        <input
          id="search-modal-input"
          type="text"
          value="${query}"
          placeholder="Type subject name, code (101, BEEE), branch, or topic..."
          class="w-full bg-transparent text-sm focus:outline-none py-1 placeholder:opacity-60"
          style="color: var(--app-text)"
        />
        <button
          id="search-close-btn"
          class="p-1 rounded-lg border opacity-70 hover:opacity-100 flex items-center justify-center"
          style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text);"
          title="Close"
        >
          ${renderIcon('x', 'w-4 h-4')}
        </button>
      </div>

      <!-- Results List -->
      <div class="max-h-[60vh] overflow-y-auto p-4 space-y-4">
        
        <!-- Subjects Category -->
        ${matchedSubjects.length > 0 ? `
          <div class="space-y-2">
            <div class="text-[11px] font-semibold uppercase tracking-wider px-2" style="color: var(--app-text-muted)">
              Subjects & Question Papers
            </div>
            <div class="space-y-1.5">
              ${matchedSubjects.map((sub) => `
                <button
                  type="button"
                  data-select-subject-id="${sub.id}"
                  class="w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between group hover:scale-[1.01]"
                  style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
                >
                  <div class="space-y-1 min-w-0 pr-4">
                    <div class="flex items-center gap-2 text-[11px]" style="color: var(--app-text-muted)">
                      <span class="font-mono font-semibold" style="color: var(--primary-accent)">${sub.code}</span>
                      <span>·</span>
                      <span>Semester ${sub.semester}</span>
                      <span>·</span>
                      <span class="uppercase">${sub.branch}</span>
                    </div>
                    <div class="text-sm font-semibold truncate transition-colors" style="color: var(--app-text)">
                      ${sub.name}
                    </div>
                    <div class="text-xs line-clamp-1" style="color: var(--app-text-muted)">
                      ${sub.description}
                    </div>
                  </div>
                  ${renderIcon('arrowRight', 'w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1', 'color: var(--primary-accent)')}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Syllabus Category -->
        ${matchedSyllabus.length > 0 ? `
          <div class="space-y-2 pt-2 border-t" style="border-color: var(--panel-border);">
            <div class="text-[11px] font-semibold uppercase tracking-wider px-2" style="color: var(--app-text-muted)">
              Official Syllabus Documents
            </div>
            <div class="space-y-1.5">
              ${matchedSyllabus.map((syl) => `
                <button
                  type="button"
                  data-select-syllabus-id="${syl.id}"
                  class="w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between group hover:scale-[1.01]"
                  style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
                >
                  <div class="space-y-1 min-w-0 pr-4">
                    <div class="flex items-center gap-2 text-[11px]" style="color: var(--app-text-muted)">
                      ${renderIcon('graduationCap', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                      <span class="uppercase font-mono font-semibold" style="color: var(--primary-accent)">${syl.branch.toUpperCase()}</span>
                      <span>·</span>
                      <span>Semester ${syl.semester}</span>
                    </div>
                    <div class="text-sm font-semibold transition-colors" style="color: var(--app-text)">
                      ${syl.branchName} · Semester ${syl.semester} Official Syllabus
                    </div>
                  </div>
                  ${renderIcon('arrowRight', 'w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1', 'color: var(--primary-accent)')}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${matchedSubjects.length === 0 && matchedSyllabus.length === 0 ? `
          <div class="py-12 text-center text-xs" style="color: var(--app-text-muted)">
            No results found for "${query}". Try searching "Chemistry", "101", "CSE", or "Semester 2".
          </div>
        ` : ''}
      </div>

      <!-- Footer shortcuts -->
      <div 
        class="p-3 border-t flex items-center justify-between text-[11px]"
        style="border-color: var(--panel-border); background-color: var(--panel-subtle); color: var(--app-text-muted);"
      >
        <span>Navigate with mouse or click item to preview</span>
        <div class="flex items-center gap-2">
          <kbd class="px-1.5 py-0.5 rounded font-mono border" style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--app-text)">ESC</kbd>
          <span>to close</span>
        </div>
      </div>
    </div>
  `;

  // Focus input automatically
  setTimeout(() => {
    const input = modalRoot.querySelector('#search-modal-input');
    if (input) {
      input.focus();
      // Set cursor to end
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, 50);

  // Close on backdrop click
  modalRoot.addEventListener('click', (e) => {
    if (e.target === modalRoot) onClose();
  });

  modalRoot.querySelector('#search-close-btn')?.addEventListener('click', onClose);

  // Handle live search typing
  const input = modalRoot.querySelector('#search-modal-input');
  if (input) {
    input.addEventListener('input', (e) => {
      props.initialQuery = e.target.value;
      const updated = renderSearchModal(props);
      modalRoot.replaceWith(updated);
    });
  }

  // Handle selection clicks
  modalRoot.querySelectorAll('button[data-select-subject-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const subId = btn.getAttribute('data-select-subject-id');
      const sub = SUBJECT_RESOURCES.find((s) => s.id === subId);
      if (sub && onSelectSubject) {
        onSelectSubject(sub);
        onClose();
      }
    });
  });

  modalRoot.querySelectorAll('button[data-select-syllabus-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sylId = btn.getAttribute('data-select-syllabus-id');
      const syl = SYLLABUS_DATA.find((s) => s.id === sylId);
      if (syl && onSelectSyllabus) {
        onSelectSyllabus(syl);
        onClose();
      }
    });
  });

  return modalRoot;
}
