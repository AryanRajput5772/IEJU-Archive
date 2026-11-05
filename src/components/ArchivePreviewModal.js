import { renderIcon } from '../utils/icons.js';

export function renderArchivePreviewModal(props) {
  const {
    item,
    isOpen,
    onClose,
    isBookmarked,
    onToggleBookmark,
    activeTab: initialActiveTab = 'details',
    selectedDocId: initialSelectedDocId = '',
  } = props;

  if (!isOpen || !item) {
    const hidden = document.createElement('div');
    hidden.id = 'archive-preview-modal-root';
    return hidden;
  }

  const modalRoot = document.createElement('div');
  modalRoot.id = 'archive-preview-modal-root';
  modalRoot.className = 'fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in';

  let activeTab = initialActiveTab;

  const isSubject = 'units' in item;
  const subject = isSubject ? item : null;
  const syllabus = !isSubject ? item : null;

  // Build the list of previewable documents
  const previewDocs = [];

  if (subject) {
    // Add available unit notes
    subject.units.forEach((u) => {
      if (u.isAvailable && u.notesUrl) {
        previewDocs.push({
          id: `unit-${u.unitNumber}`,
          title: `Unit ${u.unitNumber}`,
          subtitle: u.title,
          url: u.notesUrl,
          category: 'unit',
          unitNumber: u.unitNumber,
        });
      }
    });

    // Add textbooks
    if (subject.booksUrl && subject.booksAvailable !== false) {
      previewDocs.push({
        id: 'books',
        title: 'Books',
        subtitle: 'Prescribed Textbooks',
        url: subject.booksUrl,
        category: 'books',
      });
    }

    // Add PYQs
    if (subject.pyqUrl && subject.pyqAvailable !== false) {
      previewDocs.push({
        id: 'pyq',
        title: 'PYQs',
        subtitle: 'Previous Year Papers',
        url: subject.pyqUrl,
        category: 'pyq',
      });
    }
  } else if (syllabus) {
    if (syllabus.driveUrl) {
      previewDocs.push({
        id: 'syllabus',
        title: 'Syllabus',
        subtitle: `${syllabus.branchName} Sem ${syllabus.semester}`,
        url: syllabus.driveUrl,
        category: 'syllabus',
      });
    }
  }

  let selectedDocId = initialSelectedDocId || (previewDocs.length > 0 ? previewDocs[0].id : '');

  const title = isSubject ? subject.name : `${syllabus.branchName} - Semester ${syllabus.semester} Syllabus`;
  const code = isSubject ? subject.code : `SEM-${syllabus.semester}`;

  const currentDoc = previewDocs.find((d) => d.id === selectedDocId) || previewDocs[0] || null;
  const activeUrl = currentDoc ? currentDoc.url : (isSubject ? (subject.booksUrl || subject.pyqUrl || '') : syllabus.driveUrl);

  const getEmbedUrl = (url) => {
    if (!url) return '';
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch && fileMatch[1]) {
      return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
    }
    const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch && folderMatch[1]) {
      return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
    }
    return '';
  };

  const previewEmbedUrl = activeUrl ? getEmbedUrl(activeUrl) : '';

  modalRoot.innerHTML = `
    <div 
      class="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden glass-panel"
      style="background-color: var(--modal-bg); border-color: var(--panel-border); color: var(--app-text);"
    >
      <!-- Modal Header -->
      <div 
        class="relative px-4 sm:px-6 py-4 sm:py-5 border-b flex items-start justify-between gap-3"
        style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
      >
        <div class="space-y-1 min-w-0 pr-2">
          <div class="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs" style="color: var(--app-text-muted)">
            <span class="font-mono font-semibold" style="color: var(--primary-accent)">${code}</span>
            <span>·</span>
            <span class="uppercase tracking-wider">Sem ${isSubject ? subject.semester : syllabus.semester}</span>
            <span>·</span>
            <span class="uppercase">${isSubject ? subject.branch.toUpperCase() : syllabus.branch.toUpperCase()}</span>
          </div>
          <h3 class="text-lg sm:text-2xl font-bold tracking-tight truncate" style="color: var(--app-text)">
            ${title}
          </h3>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          <button
            id="modal-toggle-bookmark-btn"
            class="p-2 rounded-xl border transition-all hover:scale-105 flex items-center justify-center"
            style="background-color: ${isBookmarked ? 'var(--primary-accent-subtle)' : 'var(--panel-subtle)'}; border-color: ${isBookmarked ? 'var(--primary-accent)' : 'var(--panel-border)'}; color: ${isBookmarked ? 'var(--primary-accent)' : 'var(--app-text-muted)'};"
            title="${isBookmarked ? 'Remove bookmark' : 'Bookmark this resource'}"
          >
            ${renderIcon(isBookmarked ? 'bookmarkCheck' : 'bookmark', 'w-4 h-4 sm:w-5 sm:h-5')}
          </button>
          <button
            id="modal-close-btn"
            class="p-2 rounded-xl border transition-all opacity-70 hover:opacity-100 flex items-center justify-center"
            style="background-color: var(--panel-subtle); border-color: var(--panel-border); color: var(--app-text);"
            title="Close modal"
          >
            ${renderIcon('x', 'w-4 h-4 sm:w-5 sm:h-5')}
          </button>
        </div>
      </div>

      <!-- Tab Controls -->
      <div 
        class="flex items-center gap-2 px-4 sm:px-6 pt-2.5 border-b"
        style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
      >
        <button
          id="tab-details-btn"
          class="pb-2.5 text-xs sm:text-sm font-medium transition-all relative"
          style="color: ${activeTab === 'details' ? 'var(--primary-accent)' : 'var(--app-text-muted)'}; font-weight: ${activeTab === 'details' ? '600' : '500'};"
        >
          Resource Details
          ${activeTab === 'details' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style="background-image: var(--btn-bg)"></span>' : ''}
        </button>
        <button
          id="tab-preview-btn"
          class="pb-2.5 text-xs sm:text-sm font-medium transition-all relative flex items-center gap-1.5"
          style="color: ${activeTab === 'preview' ? 'var(--primary-accent)' : 'var(--app-text-muted)'}; font-weight: ${activeTab === 'preview' ? '600' : '500'};"
        >
          ${renderIcon('eye', 'w-3.5 h-3.5 sm:w-4 sm:h-4')}
          Document Quick Preview
          ${activeTab === 'preview' ? '<span class="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style="background-image: var(--btn-bg)"></span>' : ''}
        </button>
      </div>

      <!-- Modal Body -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
        ${activeTab === 'details' ? renderDetailsTab(item, isSubject, subject, syllabus) : renderPreviewTab(previewDocs, currentDoc, previewEmbedUrl, activeUrl)}
      </div>

      <!-- Modal Footer -->
      <div 
        class="px-4 sm:px-6 py-3.5 sm:py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
        style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
      >
        <button
          id="copy-drive-link-btn"
          class="w-full sm:w-auto px-3.5 py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all hover:scale-102"
          style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text);"
        >
          <span id="copy-icon-container" class="flex items-center justify-center">${renderIcon('copy', 'w-3.5 h-3.5')}</span>
          <span id="copy-text">Copy Drive Link</span>
        </button>

        <div class="w-full sm:w-auto flex items-center justify-end gap-2.5">
          <button
            id="modal-bottom-close-btn"
            class="w-1/3 sm:w-auto px-3.5 py-2.5 text-xs font-medium opacity-70 hover:opacity-100 transition-opacity"
            style="color: var(--app-text)"
          >
            Close
          </button>
          ${activeUrl ? `
            <a
              href="${activeUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="w-2/3 sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
              style="background-image: var(--btn-bg); color: var(--btn-text);"
            >
              ${renderIcon('download', 'w-3.5 h-3.5')}
              <span>Open in Drive</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  // Internal helper to render Details Tab HTML
  function renderDetailsTab(item, isSubject, subject, syllabus) {
    return `
      <div class="space-y-5 sm:space-y-6">
        <!-- Description -->
        <div 
          class="p-3.5 sm:p-4 rounded-xl border"
          style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
        >
          <h4 class="text-[10px] sm:text-xs uppercase tracking-wider mb-1.5 font-semibold" style="color: var(--primary-accent)">
            Description & Scope
          </h4>
          <p class="text-xs sm:text-sm leading-relaxed" style="color: var(--app-text-muted)">
            ${item.description}
          </p>
        </div>

        <!-- Subject Unit Breakdown if Subject -->
        ${isSubject && subject.units && subject.units.length > 0 ? `
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-[10px] sm:text-xs uppercase tracking-wider font-semibold" style="color: var(--app-text)">
                Unit-Wise Notes & Topics
              </h4>
              <span class="text-[11px]" style="color: var(--app-text-muted)">
                ${subject.units.filter(u => u.isAvailable).length} of ${subject.units.length} Units Available
              </span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              ${subject.units.map((unit) => {
                const isUnitAvailable = unit.isAvailable && Boolean(unit.notesUrl);
                const docId = `unit-${unit.unitNumber}`;

                return `
                  <div 
                    class="p-3 rounded-xl border flex items-center justify-between gap-2.5 text-sm transition-all ${
                      isUnitAvailable 
                        ? 'glass-panel-interactive border-opacity-70 hover:border-opacity-100' 
                        : 'opacity-40 cursor-not-allowed'
                    }"
                    style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
                  >
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                      <span 
                        class="w-6 h-6 rounded-md border text-[11px] font-mono font-medium flex items-center justify-center shrink-0"
                        style="background-color: var(--panel-bg); border-color: var(--panel-border); color: ${isUnitAvailable ? 'var(--primary-accent)' : 'var(--app-text-muted)'};"
                      >
                        ${unit.unitNumber}
                      </span>
                      <span 
                        class="truncate font-medium text-xs" 
                        style="color: var(--app-text)"
                        title="${unit.title}"
                      >
                        ${unit.title}
                      </span>
                    </div>

                    ${isUnitAvailable ? `
                      <div class="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          data-unit-preview="${docId}"
                          class="p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all hover:scale-105 active:scale-95"
                          style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text-muted);"
                          title="Preview Unit ${unit.unitNumber} inside modal"
                        >
                          ${renderIcon('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                          <span class="hidden sm:inline text-[10px]">Preview</span>
                        </button>

                        <a
                          href="${unit.notesUrl}"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border transition-all hover:scale-105 active:scale-95 shadow-sm group/ready"
                          style="background-color: var(--primary-accent-subtle); border-color: var(--primary-accent); color: var(--primary-accent);"
                          title="Open Unit ${unit.unitNumber} notes directly on Google Drive"
                        >
                          <span>Ready</span>
                          ${renderIcon('externalLink', 'w-3 h-3 group-hover/ready:translate-x-0.5 group-hover/ready:-translate-y-0.5 transition-transform')}
                        </a>
                      </div>
                    ` : `
                      <span 
                        class="text-[10px] font-mono opacity-50 px-2 py-0.5 rounded border"
                        style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text-muted);"
                        title="Notes for this unit are pending student contribution"
                      >
                        Pending
                      </span>
                    `}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Included Materials -->
        <div class="space-y-3">
          <h4 class="text-[10px] sm:text-xs uppercase tracking-wider font-semibold" style="color: var(--app-text)">
            Included Archive Materials
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${isSubject && subject.pyqUrl && subject.pyqAvailable !== false ? `
              <div
                class="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between group transition-all"
                style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="p-2 sm:p-2.5 rounded-lg shrink-0" style="background-color: var(--panel-bg); color: var(--primary-accent)">
                    ${renderIcon('fileText', 'w-4 h-4 sm:w-5 sm:h-5')}
                  </div>
                  <div class="truncate">
                    <div class="font-semibold text-xs sm:text-sm truncate" style="color: var(--app-text)">Previous Year Papers (PYQ)</div>
                    <div class="text-[11px] truncate" style="color: var(--app-text-muted)">Official past semester question sheets</div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    type="button"
                    data-unit-preview="pyq"
                    class="p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all hover:scale-105"
                    style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text-muted);"
                    title="Preview in modal"
                  >
                    ${renderIcon('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                  </button>
                  <a
                    href="${subject.pyqUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-1.5 rounded-lg border transition-all hover:scale-105 flex items-center justify-center"
                    style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text);"
                    title="Open in Google Drive"
                  >
                    ${renderIcon('externalLink', 'w-3.5 h-3.5')}
                  </a>
                </div>
              </div>
            ` : ''}

            ${isSubject && subject.booksUrl && subject.booksAvailable !== false ? `
              <div
                class="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between group transition-all"
                style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <div class="p-2 sm:p-2.5 rounded-lg shrink-0" style="background-color: var(--panel-bg); color: var(--primary-accent)">
                    ${renderIcon('bookOpen', 'w-4 h-4 sm:w-5 sm:h-5')}
                  </div>
                  <div class="truncate">
                    <div class="font-semibold text-xs sm:text-sm truncate" style="color: var(--app-text)">Prescribed Textbooks</div>
                    <div class="text-[11px] truncate" style="color: var(--app-text-muted)">Complete digital textbook PDFs</div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    type="button"
                    data-unit-preview="books"
                    class="p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all hover:scale-105"
                    style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text-muted);"
                    title="Preview in modal"
                  >
                    ${renderIcon('eye', 'w-3.5 h-3.5', 'color: var(--primary-accent)')}
                  </button>
                  <a
                    href="${subject.booksUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="p-1.5 rounded-lg border transition-all hover:scale-105 flex items-center justify-center"
                    style="border-color: var(--panel-border); background-color: var(--panel-bg); color: var(--app-text);"
                    title="Open in Google Drive"
                  >
                    ${renderIcon('externalLink', 'w-3.5 h-3.5')}
                  </a>
                </div>
              </div>
            ` : ''}

            ${isSubject && subject.playlistUrl ? `
              <a
                href="${subject.playlistUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between group transition-all hover:scale-[1.01]"
                style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 sm:p-2.5 rounded-lg" style="background-color: var(--panel-bg); color: var(--primary-accent)">
                    ${renderIcon('playCircle', 'w-4 h-4 sm:w-5 sm:h-5')}
                  </div>
                  <div>
                    <div class="font-semibold text-xs sm:text-sm" style="color: var(--app-text)">Curated Video Playlists</div>
                    <div class="text-[11px]" style="color: var(--app-text-muted)">Topic-by-topic lectures</div>
                  </div>
                </div>
                ${renderIcon('externalLink', 'w-4 h-4 opacity-50 group-hover:opacity-100')}
              </a>
            ` : ''}

            ${syllabus ? `
              <a
                href="${syllabus.driveUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="p-3.5 sm:p-4 rounded-xl border flex items-center justify-between group transition-all sm:col-span-2 hover:scale-[1.01]"
                style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
              >
                <div class="flex items-center gap-3">
                  <div class="p-2 sm:p-2.5 rounded-lg" style="background-color: var(--panel-bg); color: var(--primary-accent)">
                    ${renderIcon('graduationCap', 'w-4 h-4 sm:w-5 sm:h-5')}
                  </div>
                  <div>
                    <div class="font-semibold text-xs sm:text-sm" style="color: var(--app-text)">Official Semester Syllabus PDF</div>
                    <div class="text-[11px]" style="color: var(--app-text-muted)">Jiwaji University BE Course Structure (${syllabus.subjectsCount} subjects)</div>
                  </div>
                </div>
                ${renderIcon('externalLink', 'w-4 h-4 opacity-50 group-hover:opacity-100')}
              </a>
            ` : ''}
          </div>
        </div>

        <!-- Tag Cloud -->
        ${isSubject && subject.tags ? `
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="text-[11px] font-medium mr-1" style="color: var(--app-text-muted)">Topics:</span>
            ${subject.tags.map((tag, idx) => `
              <span class="text-[11px]" style="color: var(--app-text-muted)">
                ${tag}${idx < subject.tags.length - 1 ? '<span class="opacity-40 ml-1.5">·</span>' : ''}
              </span>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // Internal helper to render Preview Tab HTML
  function renderPreviewTab(previewDocs, currentDoc, previewEmbedUrl, activeUrl) {
    return `
      <div class="space-y-3">
        ${previewDocs.length > 1 ? `
          <div 
            class="p-2 rounded-xl border flex flex-wrap items-center gap-1.5 text-xs overflow-x-auto"
            style="background-color: var(--panel-subtle); border-color: var(--panel-border);"
          >
            <span class="text-[11px] font-medium px-2 opacity-60" style="color: var(--app-text-muted)">
              Preview Document:
            </span>
            ${previewDocs.map((doc) => {
              const isSelected = doc.id === currentDoc?.id;
              return `
                <button
                  type="button"
                  data-select-doc-id="${doc.id}"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1"
                  style="background-color: ${isSelected ? 'var(--primary-accent-subtle)' : 'var(--panel-bg)'}; border-color: ${isSelected ? 'var(--primary-accent)' : 'var(--panel-border)'}; color: ${isSelected ? 'var(--primary-accent)' : 'var(--app-text-muted)'};"
                >
                  ${doc.category === 'unit' ? '<span class="w-1.5 h-1.5 rounded-full" style="background-color: var(--primary-accent)"></span>' : ''}
                  ${doc.title}
                </button>
              `;
            }).join('')}
          </div>
        ` : ''}

        ${currentDoc ? `
          <div class="flex items-center justify-between text-xs px-1" style="color: var(--app-text-muted)">
            <div class="flex items-center gap-2 truncate">
              <span class="font-semibold text-xs" style="color: var(--app-text)">
                ${currentDoc.title}
              </span>
              <span class="opacity-40">·</span>
              <span class="truncate">${currentDoc.subtitle}</span>
            </div>
            <a
              href="${currentDoc.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-[11px] font-semibold transition-colors hover:underline shrink-0 ml-2"
              style="color: var(--primary-accent)"
            >
              Open Drive ${renderIcon('externalLink', 'w-3 h-3')}
            </a>
          </div>
        ` : ''}

        <div 
          class="h-[360px] sm:h-[480px] w-full flex flex-col rounded-xl overflow-hidden border relative"
          style="border-color: var(--panel-border); background-color: var(--panel-subtle);"
        >
          ${previewEmbedUrl ? `
            <iframe
              src="${previewEmbedUrl}"
              title="Document Preview"
              class="w-full h-full border-0"
              allow="autoplay"
            ></iframe>
            <div class="absolute top-2.5 right-2.5 flex items-center gap-2">
              <a
                href="${activeUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="px-2.5 py-1.5 rounded-lg glass-panel text-[11px] font-medium flex items-center gap-1.5 shadow-lg transition-all"
                style="color: var(--app-text); border-color: var(--panel-border);"
              >
                ${renderIcon('externalLink', 'w-3 h-3', 'color: var(--primary-accent)')}
                Open Full Screen
              </a>
            </div>
          ` : `
            <div class="m-auto text-center p-6 space-y-3" style="color: var(--app-text-muted)">
              <div class="w-10 h-10 mx-auto opacity-50 flex items-center justify-center" style="color: var(--primary-accent)">
                ${renderIcon('folderOpen', 'w-10 h-10')}
              </div>
              <div class="space-y-1">
                <p class="text-sm font-semibold" style="color: var(--app-text)">
                  ${currentDoc?.title || 'Archive Resource'}
                </p>
                <p class="text-xs max-w-sm mx-auto">
                  This archive is hosted in an interactive Google Drive folder. You can view all note files, diagrams, and PDFs directly.
                </p>
              </div>
              ${activeUrl ? `
                <a
                  href="${activeUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-lg transition-all active:scale-95"
                  style="background-image: var(--btn-bg); color: var(--btn-text);"
                >
                  ${renderIcon('download', 'w-3.5 h-3.5')}
                  <span>Open Folder on Google Drive</span>
                  ${renderIcon('externalLink', 'w-3 h-3')}
                </a>
              ` : ''}
            </div>
          `}
        </div>
      </div>
    `;
  }

  // Event bindings
  modalRoot.addEventListener('click', (e) => {
    if (e.target === modalRoot) onClose();
  });

  modalRoot.querySelector('#modal-close-btn')?.addEventListener('click', onClose);
  modalRoot.querySelector('#modal-bottom-close-btn')?.addEventListener('click', onClose);

  modalRoot.querySelector('#modal-toggle-bookmark-btn')?.addEventListener('click', () => {
    onToggleBookmark(item.id);
  });

  // Tab buttons
  const tabDetailsBtn = modalRoot.querySelector('#tab-details-btn');
  const tabPreviewBtn = modalRoot.querySelector('#tab-preview-btn');

  if (tabDetailsBtn) {
    tabDetailsBtn.addEventListener('click', () => {
      props.activeTab = 'details';
      const updated = renderArchivePreviewModal(props);
      modalRoot.replaceWith(updated);
    });
  }

  if (tabPreviewBtn) {
    tabPreviewBtn.addEventListener('click', () => {
      props.activeTab = 'preview';
      const updated = renderArchivePreviewModal(props);
      modalRoot.replaceWith(updated);
    });
  }

  // Unit preview buttons in details tab
  modalRoot.querySelectorAll('button[data-unit-preview]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const docId = btn.getAttribute('data-unit-preview');
      props.activeTab = 'preview';
      props.selectedDocId = docId;
      const updated = renderArchivePreviewModal(props);
      modalRoot.replaceWith(updated);
    });
  });

  // Select document pills in preview tab
  modalRoot.querySelectorAll('button[data-select-doc-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const docId = btn.getAttribute('data-select-doc-id');
      props.activeTab = 'preview';
      props.selectedDocId = docId;
      const updated = renderArchivePreviewModal(props);
      modalRoot.replaceWith(updated);
    });
  });

  // Copy drive link
  modalRoot.querySelector('#copy-drive-link-btn')?.addEventListener('click', () => {
    if (activeUrl) {
      navigator.clipboard.writeText(activeUrl);
      const copyIcon = modalRoot.querySelector('#copy-icon-container');
      const copyText = modalRoot.querySelector('#copy-text');
      if (copyIcon && copyText) {
        copyIcon.innerHTML = renderIcon('check', 'w-3.5 h-3.5 text-emerald-400');
        copyText.textContent = 'Link Copied!';
        setTimeout(() => {
          copyIcon.innerHTML = renderIcon('copy', 'w-3.5 h-3.5');
          copyText.textContent = 'Copy Drive Link';
        }, 2000);
      }
    }
  });

  return modalRoot;
}
