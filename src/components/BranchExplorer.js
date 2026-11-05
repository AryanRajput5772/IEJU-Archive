import { BRANCHES, SUBJECT_RESOURCES } from '../data/archiveData.js';
import { getIconSvg } from '../utils/icons.js';

let currentSemesterFilter = 'all';
let showNotice = true;

export function renderBranchExplorer(props = {}) {
  const {
    bookmarkedIds = [],
    onToggleBookmark,
    onSelectPreview,
  } = props;

  const activeBranch = 'cse';
  const activeSemester = currentSemesterFilter;

  const filteredSubjects = SUBJECT_RESOURCES.filter((sub) => {
    if (sub.branch !== activeBranch) return false;
    if (activeSemester !== 'all' && sub.semester !== Number(activeSemester)) return false;
    return true;
  });

  const section = document.createElement('section');
  section.id = 'branches';
  section.className = 'py-12 sm:py-16 lg:py-24 relative';

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
      
      <!-- Section Header -->
      <div 
        class="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-4 border-b"
        style="border-color: var(--panel-border)"
      >
        <div class="space-y-2">
          <div 
            class="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors"
            style="color: var(--primary-accent)"
          >
            <span>Department Archives</span>
            <span class="opacity-40">·</span>
            <span>Question Papers & Notes</span>
          </div>
          <h2 
            class="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight transition-colors"
            style="color: var(--app-text)"
          >
            Explore Branch Repositories
          </h2>
          <p 
            class="text-xs sm:text-sm max-w-xl leading-relaxed"
            style="color: var(--app-text-muted)"
          >
            Select your engineering branch and semester to access past year exam papers, unit notes, and prescribed textbooks.
          </p>
        </div>

        <!-- PDF Download Notice Banner -->
        ${
          showNotice
            ? `
          <div 
            class="p-3 sm:p-3.5 rounded-xl glass-panel w-full md:max-w-md flex items-start gap-2.5 sm:gap-3 relative"
            style="border-color: var(--panel-border)"
          >
            ${getIconSvg('info', 'w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5', 'color: var(--primary-accent)')}
            <div class="text-[11px] sm:text-xs leading-relaxed pr-6" style="color: var(--app-text-muted)">
              <strong class="font-semibold block mb-0.5" style="color: var(--app-text)">Preview Tip:</strong>
              If any textbook PDF fails to render in browser preview, please click download directly on Google Drive.
            </div>
            <button
              id="dismiss-notice-btn"
              class="absolute top-2 right-2 text-xs p-1 opacity-60 hover:opacity-100"
              style="color: var(--app-text)"
              aria-label="Dismiss notice"
            >
              ✕
            </button>
          </div>
        `
            : ''
        }
      </div>

      <!-- Active Archive Branch Banner -->
      <div class="grid grid-cols-1 gap-3 sm:gap-4">
        ${BRANCHES.map((b) => {
          return `
            <div
              class="p-4 sm:p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden glass-panel shadow-lg"
              style="border-color: var(--panel-border); background-color: var(--panel-subtle)"
            >
              <div 
                class="absolute -top-12 -right-12 w-28 h-28 blur-2xl pointer-events-none rounded-full opacity-30"
                style="background-color: var(--primary-accent)"
              ></div>

              <div class="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
                <div class="flex items-center gap-2">
                  <span 
                    class="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md border"
                    style="border-color: var(--primary-accent); color: var(--primary-accent); background-color: var(--panel-subtle)"
                  >
                    ${b.code}
                  </span>
                  <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Materials Repository
                  </span>
                </div>
                <span class="text-[11px] sm:text-xs font-medium" style="color: var(--app-text-muted)">
                  All 8 Semesters Available (40 Subjects)
                </span>
              </div>

              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div class="space-y-1">
                  <h3 
                    class="text-lg sm:text-xl font-bold tracking-tight"
                    style="color: var(--app-text)"
                  >
                    ${b.name}
                  </h3>
                  <p class="text-xs sm:text-sm leading-relaxed" style="color: var(--app-text-muted)">
                    ${b.shortDescription}
                  </p>
                </div>
                <a
                  href="#syllabus"
                  class="self-start md:self-center shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold glass-panel-subtle border flex items-center gap-2 transition-all hover:scale-[1.02]"
                  style="border-color: var(--panel-border); color: var(--primary-accent)"
                >
                  <span>Chemical & Electronics Syllabus</span>
                  <span class="text-xs">↓</span>
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Semester Sub-Filters -->
      <div 
        class="space-y-3.5 p-3.5 sm:p-5 rounded-2xl glass-panel"
        style="border-color: var(--panel-border)"
      >
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none touch-pan-x">
            <span class="text-[11px] sm:text-xs font-semibold mr-1.5 shrink-0 uppercase tracking-wider" style="color: var(--app-text-muted)">
              Sem:
            </span>
            <button
              data-sem="all"
              class="sem-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 active:scale-95 cursor-pointer"
              style="
                background-image: ${activeSemester === 'all' ? 'var(--btn-bg)' : 'none'};
                color: ${activeSemester === 'all' ? 'var(--btn-text)' : 'var(--app-text-muted)'};
                background-color: ${activeSemester === 'all' ? 'transparent' : 'var(--panel-subtle)'};
              "
            >
              All
            </button>
            ${[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => {
              const isActive = String(activeSemester) === String(sem);
              return `
                <button
                  data-sem="${sem}"
                  class="sem-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 active:scale-95 cursor-pointer"
                  style="
                    background-image: ${isActive ? 'var(--btn-bg)' : 'none'};
                    color: ${isActive ? 'var(--btn-text)' : 'var(--app-text-muted)'};
                    background-color: ${isActive ? 'transparent' : 'var(--panel-subtle)'};
                  "
                >
                  Sem ${sem}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Subject Archive Cards Grid -->
      ${
        filteredSubjects.length > 0
          ? `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          ${filteredSubjects.map((sub) => {
            const isBookmarked = bookmarkedIds.includes(sub.id);
            const availableUnits = sub.units.filter((u) => u.isAvailable).length;

            return `
              <div
                class="relative group rounded-2xl glass-panel-interactive p-5 sm:p-6 flex flex-col justify-between transition-all duration-300"
                style="border-color: var(--panel-border)"
              >
                <!-- Top Row: Code, Semester & Bookmark -->
                <div class="space-y-2.5 sm:space-y-3">
                  <div class="flex items-center justify-between text-xs" style="color: var(--app-text-muted)">
                    <div class="flex items-center gap-1.5 sm:gap-2">
                      <span 
                        class="font-mono font-semibold px-2 py-0.5 rounded border text-[11px] sm:text-xs"
                        style="
                          color: var(--primary-accent);
                          background-color: var(--panel-subtle);
                          border-color: var(--panel-border);
                        "
                      >
                        ${sub.code}
                      </span>
                      <span>·</span>
                      <span>Semester ${sub.semester}</span>
                    </div>

                    <button
                      data-bookmark-id="${sub.id}"
                      class="toggle-bookmark-btn p-1.5 rounded-lg border transition-all cursor-pointer"
                      style="
                        background-color: ${isBookmarked ? 'var(--primary-accent-subtle)' : 'var(--panel-subtle)'};
                        border-color: ${isBookmarked ? 'var(--primary-accent)' : 'var(--panel-border)'};
                        color: ${isBookmarked ? 'var(--primary-accent)' : 'var(--app-text-muted)'};
                      "
                      title="${isBookmarked ? 'Remove bookmark' : 'Bookmark this subject'}"
                    >
                      ${isBookmarked ? getIconSvg('bookmarkCheck', 'w-4 h-4') : getIconSvg('bookmark', 'w-4 h-4')}
                    </button>
                  </div>

                  <!-- Title -->
                  <h3 
                    class="text-base sm:text-lg font-bold tracking-tight transition-colors"
                    style="color: var(--app-text)"
                  >
                    ${sub.code} - (${sub.name})
                  </h3>

                  <!-- Description -->
                  <p class="text-[11px] sm:text-xs line-clamp-2 leading-relaxed" style="color: var(--app-text-muted)">
                    ${sub.description}
                  </p>

                  <!-- Resource Links Box -->
                  <div 
                    class="p-3 rounded-xl border space-y-1.5 text-xs font-medium my-2"
                    style="
                      background-color: var(--panel-subtle);
                      border-color: var(--panel-border);
                    "
                  >
                    <!-- Books -->
                    ${
                      sub.booksUrl && sub.booksAvailable !== false
                        ? `
                      <a
                        href="${sub.booksUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                        style="color: var(--app-text)"
                      >
                        <span class="flex items-center gap-2">
                          ${getIconSvg('bookOpen', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                          <span>Books</span>
                        </span>
                        <span class="text-[10px] opacity-60 group-hover:opacity-100 flex items-center gap-0.5">
                          Drive ${getIconSvg('externalLink', 'w-2.5 h-2.5')}
                        </span>
                      </a>
                    `
                        : `
                      <div class="flex items-center justify-between py-1.5 px-2.5 rounded-lg opacity-35 cursor-not-allowed text-[11px]">
                        <span class="flex items-center gap-2">
                          ${getIconSvg('bookOpen', 'w-3.5 h-3.5')}
                          <span>Books</span>
                        </span>
                        <span class="text-[9px] uppercase tracking-wider opacity-60">Pending</span>
                      </div>
                    `
                    }

                    <!-- Notes: UNIT - 1 to 5 -->
                    ${sub.units.map((unit) => {
                      if (unit.isAvailable && unit.notesUrl) {
                        return `
                          <a
                            href="${unit.notesUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                            style="color: var(--app-text)"
                          >
                            <span class="flex items-center gap-2">
                              <span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--primary-accent)"></span>
                              <span>Notes: UNIT - ${unit.unitNumber}</span>
                            </span>
                            <span 
                              class="text-[10px] font-mono px-1.5 py-0.5 rounded border"
                              style="
                                border-color: var(--primary-accent);
                                color: var(--primary-accent);
                                background-color: var(--panel-bg);
                              "
                            >
                              Ready
                            </span>
                          </a>
                        `;
                      }
                      return `
                        <div
                          class="flex items-center justify-between py-1 px-2.5 rounded-lg opacity-35 cursor-not-allowed select-none text-[11px]"
                          title="Notes for this unit are pending student contribution"
                        >
                          <span class="flex items-center gap-2">
                            <span class="w-1.5 h-1.5 rounded-full bg-neutral-600"></span>
                            <span>Notes: UNIT - ${unit.unitNumber}</span>
                          </span>
                          <span class="text-[9px] uppercase tracking-wider opacity-60 font-mono">Pending</span>
                        </div>
                      `;
                    }).join('')}

                    <!-- Previous Year Questions -->
                    ${
                      sub.pyqUrl && sub.pyqAvailable !== false
                        ? `
                      <a
                        href="${sub.pyqUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                        style="color: var(--app-text)"
                      >
                        <span class="flex items-center gap-2">
                          ${getIconSvg('fileText', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                          <span>Previous Year Questions</span>
                        </span>
                        <span class="text-[10px] opacity-60 group-hover:opacity-100 flex items-center gap-0.5">
                          Drive ${getIconSvg('externalLink', 'w-2.5 h-2.5')}
                        </span>
                      </a>
                    `
                        : `
                      <div class="flex items-center justify-between py-1.5 px-2.5 rounded-lg opacity-35 cursor-not-allowed text-[11px]">
                        <span class="flex items-center gap-2">
                          ${getIconSvg('fileText', 'w-3.5 h-3.5')}
                          <span>Previous Year Questions</span>
                        </span>
                        <span class="text-[9px] uppercase tracking-wider opacity-60">Pending</span>
                      </div>
                    `
                    }

                    <!-- Playlists -->
                    ${
                      sub.playlistUrl
                        ? `
                      <a
                        href="${sub.playlistUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-between py-1.5 px-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                        style="color: var(--app-text)"
                      >
                        <span class="flex items-center gap-2">
                          ${getIconSvg('playCircle', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                          <span>Playlists</span>
                        </span>
                        <span class="text-[10px] opacity-60 group-hover:opacity-100 flex items-center gap-0.5">
                          Open ${getIconSvg('externalLink', 'w-2.5 h-2.5')}
                        </span>
                      </a>
                    `
                        : sub.playlistAvailable === false
                        ? `
                      <div
                        class="flex items-center justify-between py-1 px-2.5 rounded-lg opacity-35 cursor-not-allowed select-none text-[11px]"
                        title="Playlists pending"
                      >
                        <span class="flex items-center gap-2">
                          ${getIconSvg('playCircle', 'w-3.5 h-3.5')}
                          <span>Playlists</span>
                        </span>
                        <span class="text-[9px] uppercase tracking-wider opacity-60 font-mono">Pending</span>
                      </div>
                    `
                        : ''
                    }
                  </div>

                  <!-- Progress Bar Summary -->
                  <div class="flex items-center justify-between text-[11px] pt-1" style="color: var(--app-text-muted)">
                    <span class="flex items-center gap-1 font-medium" style="color: var(--primary-accent)">
                      ${getIconSvg('layers', 'w-3 h-3 sm:w-3.5 sm:h-3.5')}
                      <span>Unit Notes Status</span>
                    </span>
                    <span class="font-mono text-[10px] sm:text-xs">
                      ${availableUnits}/${sub.units.length} Ready
                    </span>
                  </div>
                </div>

                <!-- Actions Bar -->
                <div 
                  class="pt-3 mt-3 border-t"
                  style="border-color: var(--panel-border)"
                >
                  <button
                    data-preview-subject-id="${sub.id}"
                    class="open-subject-preview-btn w-full py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    style="
                      border-color: var(--panel-border);
                      background-color: var(--panel-subtle);
                      color: var(--app-text);
                    "
                  >
                    ${getIconSvg('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                    <span>Quick Preview & Syllabus</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `
          : `
        <div 
          class="p-8 sm:p-12 text-center rounded-2xl glass-panel space-y-3"
          style="border-color: var(--panel-border)"
        >
          ${getIconSvg('alertCircle', 'w-8 h-8 sm:w-10 sm:h-10 mx-auto opacity-40', 'color: var(--app-text)')}
          <h4 class="text-sm sm:text-base font-semibold" style="color: var(--app-text)">No Subjects Found</h4>
          <p class="text-xs max-w-sm mx-auto" style="color: var(--app-text-muted)">
            No archive materials match the selected branch and semester criteria. Try resetting your filters.
          </p>
          <button
            id="reset-semester-filter-btn"
            class="mt-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-95 cursor-pointer"
            style="
              background-image: var(--btn-bg);
              color: var(--btn-text);
            "
          >
            Reset Filters
          </button>
        </div>
      `
      }

    </div>
  `;

  // Attach event handlers
  section.querySelectorAll('.sem-filter-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentSemesterFilter = btn.getAttribute('data-sem');
      const updated = renderBranchExplorer(props);
      section.replaceWith(updated);
    });
  });

  section.querySelectorAll('.toggle-bookmark-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-bookmark-id');
      if (id && onToggleBookmark) onToggleBookmark(id);
    });
  });

  section.querySelectorAll('.open-subject-preview-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preview-subject-id');
      const sub = SUBJECT_RESOURCES.find((s) => s.id === id);
      if (sub && onSelectPreview) onSelectPreview(sub);
    });
  });

  section.querySelector('#dismiss-notice-btn')?.addEventListener('click', () => {
    showNotice = false;
    const updated = renderBranchExplorer(props);
    section.replaceWith(updated);
  });

  section.querySelector('#reset-semester-filter-btn')?.addEventListener('click', () => {
    currentSemesterFilter = 'all';
    const updated = renderBranchExplorer(props);
    section.replaceWith(updated);
  });

  return section;
}
