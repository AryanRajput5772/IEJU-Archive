import { renderIcon } from '../utils/icons.js';
import { SUBJECT_RESOURCES, SYLLABUS_DATA } from '../data/archiveData.js';

export function renderBookmarksDrawer(props) {
  const {
    isOpen,
    onClose,
    bookmarkedIds = [],
    onToggleBookmark,
    onSelectPreview,
  } = props;

  if (!isOpen) {
    const hidden = document.createElement('div');
    hidden.id = 'bookmarks-drawer-root';
    return hidden;
  }

  const drawerRoot = document.createElement('div');
  drawerRoot.id = 'bookmarks-drawer-root';
  drawerRoot.className = 'fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fade-in';

  const bookmarkedSubjects = SUBJECT_RESOURCES.filter((s) => bookmarkedIds.includes(s.id));
  const bookmarkedSyllabus = SYLLABUS_DATA.filter((s) => bookmarkedIds.includes(s.id));
  const totalCount = bookmarkedSubjects.length + bookmarkedSyllabus.length;

  drawerRoot.innerHTML = `
    <div 
      class="absolute inset-y-0 right-0 max-w-full flex pl-10"
    >
      <div 
        class="w-screen max-w-md glass-panel border-l shadow-2xl flex flex-col justify-between backdrop-blur-2xl"
        style="background-color: var(--modal-bg); border-color: var(--panel-border); color: var(--app-text);"
      >
        <!-- Header -->
        <div 
          class="p-6 border-b flex items-center justify-between"
          style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
        >
          <div class="flex items-center gap-2.5">
            <div 
              class="p-2 rounded-lg border flex items-center justify-center"
              style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--primary-accent);"
            >
              ${renderIcon('bookmark', 'w-5 h-5')}
            </div>
            <div>
              <h3 class="text-lg font-bold tracking-tight" style="color: var(--app-text)">Saved Materials</h3>
              <p class="text-xs" style="color: var(--app-text-muted)">Quick access to your pinned subjects & papers</p>
            </div>
          </div>

          <button
            id="drawer-close-btn"
            class="p-1.5 rounded-lg border opacity-70 hover:opacity-100 flex items-center justify-center"
            style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text);"
            title="Close drawer"
          >
            ${renderIcon('x', 'w-5 h-5')}
          </button>
        </div>

        <!-- List of Bookmarks -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          ${totalCount > 0 ? `
            <div class="space-y-3">
              ${bookmarkedSubjects.map((sub) => `
                <div
                  class="p-4 rounded-xl border transition-all space-y-3 group hover:scale-[1.01]"
                  style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <div class="flex items-center gap-2 text-[11px]" style="color: var(--app-text-muted)">
                        <span class="font-mono font-semibold" style="color: var(--primary-accent)">${sub.code}</span>
                        <span>·</span>
                        <span>Sem ${sub.semester}</span>
                        <span>·</span>
                        <span class="uppercase">${sub.branch}</span>
                      </div>
                      <h4 class="text-sm font-semibold mt-1 transition-colors" style="color: var(--app-text)">
                        ${sub.name}
                      </h4>
                    </div>

                    <button
                      data-remove-bookmark="${sub.id}"
                      class="opacity-50 hover:opacity-100 p-1 text-rose-400 transition-opacity flex items-center justify-center"
                      title="Remove bookmark"
                    >
                      ${renderIcon('trash2', 'w-4 h-4')}
                    </button>
                  </div>

                  <div class="flex items-center gap-2 pt-1 border-t" style="border-color: var(--panel-border);">
                    <button
                      data-preview-subject="${sub.id}"
                      class="flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                      style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--app-text);"
                    >
                      ${renderIcon('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                      Quick Preview
                    </button>
                    ${sub.pyqUrl ? `
                      <a
                        href="${sub.pyqUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="p-1.5 rounded-lg border transition-opacity opacity-75 hover:opacity-100 flex items-center justify-center"
                        style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--app-text);"
                        title="Open Question Papers in Google Drive"
                      >
                        ${renderIcon('externalLink', 'w-3.5 h-3.5')}
                      </a>
                    ` : ''}
                  </div>
                </div>
              `).join('')}

              ${bookmarkedSyllabus.map((syl) => `
                <div
                  class="p-4 rounded-xl border transition-all space-y-3 group hover:scale-[1.01]"
                  style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div>
                      <div class="text-[11px] font-mono uppercase font-semibold" style="color: var(--primary-accent)">
                        ${syl.branchName}
                      </div>
                      <h4 class="text-sm font-semibold mt-0.5" style="color: var(--app-text)">
                        Semester ${syl.semester} Syllabus
                      </h4>
                    </div>

                    <button
                      data-remove-bookmark="${syl.id}"
                      class="opacity-50 hover:opacity-100 p-1 text-rose-400 transition-opacity flex items-center justify-center"
                      title="Remove bookmark"
                    >
                      ${renderIcon('trash2', 'w-4 h-4')}
                    </button>
                  </div>

                  <div class="flex items-center gap-2 pt-1 border-t" style="border-color: var(--panel-border);">
                    <button
                      data-preview-syllabus="${syl.id}"
                      class="flex-1 py-1.5 px-3 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
                      style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--app-text);"
                    >
                      ${renderIcon('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                      Preview
                    </button>
                    <a
                      href="${syl.driveUrl}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-1.5 rounded-lg border transition-opacity opacity-75 hover:opacity-100 flex items-center justify-center"
                      style="background-color: var(--panel-bg); border-color: var(--panel-border); color: var(--app-text);"
                      title="Open Syllabus in Drive"
                    >
                      ${renderIcon('externalLink', 'w-3.5 h-3.5')}
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="text-center py-20 space-y-3" style="color: var(--app-text-muted)">
              <div class="w-10 h-10 mx-auto opacity-40 flex items-center justify-center">
                ${renderIcon('bookmark', 'w-10 h-10')}
              </div>
              <h4 class="text-sm font-semibold" style="color: var(--app-text)">No saved items yet</h4>
              <p class="text-xs max-w-xs mx-auto">
                Click the bookmark icon on any subject or syllabus item to save it here for instant one-click access.
              </p>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div 
          class="p-4 border-t text-center"
          style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
        >
          <span class="text-xs" style="color: var(--app-text-muted)">
            Saved locally in your browser storage
          </span>
        </div>
      </div>
    </div>
  `;

  // Close on backdrop click
  drawerRoot.addEventListener('click', (e) => {
    if (e.target === drawerRoot) onClose();
  });

  drawerRoot.querySelector('#drawer-close-btn')?.addEventListener('click', onClose);

  // Remove bookmark handlers
  drawerRoot.querySelectorAll('button[data-remove-bookmark]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove-bookmark');
      if (id && onToggleBookmark) onToggleBookmark(id);
    });
  });

  // Preview handlers
  drawerRoot.querySelectorAll('button[data-preview-subject]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preview-subject');
      const sub = SUBJECT_RESOURCES.find((s) => s.id === id);
      if (sub && onSelectPreview) {
        onSelectPreview(sub);
        onClose();
      }
    });
  });

  drawerRoot.querySelectorAll('button[data-preview-syllabus]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-preview-syllabus');
      const syl = SYLLABUS_DATA.find((s) => s.id === id);
      if (syl && onSelectPreview) {
        onSelectPreview(syl);
        onClose();
      }
    });
  });

  return drawerRoot;
}
