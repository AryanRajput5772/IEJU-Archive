import { THEMES } from './data/themes.js';
import { renderNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderBranchExplorer } from './components/BranchExplorer.js';
import { renderSyllabusMatrix } from './components/SyllabusMatrix.js';
import { renderTestimonialsSection } from './components/TestimonialsSection.js';
import { renderAboutSection } from './components/AboutSection.js';
import { renderFAQSection } from './components/FAQSection.js';
import { renderContactSection } from './components/ContactSection.js';
import { renderFooter } from './components/Footer.js';
import { renderSearchModal } from './components/SearchModal.js';
import { renderBookmarksDrawer } from './components/BookmarksDrawer.js';
import { renderArchivePreviewModal } from './components/ArchivePreviewModal.js';

// Global Application State
const STATE = {
  currentTheme: localStorage.getItem('ieju_archive_theme') || 'pure-black',
  bookmarkedIds: JSON.parse(localStorage.getItem('ieju_archive_bookmarks') || '[]'),
  isSearchOpen: false,
  isBookmarksOpen: false,
  previewItem: null,
  modalActiveTab: 'details',
  modalSelectedDocId: '',
};

// Apply initial theme attribute to document
function applyTheme(themeId) {
  STATE.currentTheme = themeId;
  localStorage.setItem('ieju_archive_theme', themeId);
  document.documentElement.setAttribute('data-theme', themeId);

  const themeObj = THEMES.find((t) => t.id === themeId);
  if (themeObj && !themeObj.isDark) {
    document.documentElement.classList.remove('dark');
  } else {
    document.documentElement.classList.add('dark');
  }
  document.body.style.backgroundColor = 'var(--app-bg)';
  document.body.style.color = 'var(--app-text)';
}

// Scroll helper
function scrollToSection(sectionId) {
  const elem = document.getElementById(sectionId);
  if (elem) {
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (sectionId === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Bookmark Manager
function toggleBookmark(id) {
  if (STATE.bookmarkedIds.includes(id)) {
    STATE.bookmarkedIds = STATE.bookmarkedIds.filter((bId) => bId !== id);
  } else {
    STATE.bookmarkedIds.push(id);
  }
  localStorage.setItem('ieju_archive_bookmarks', JSON.stringify(STATE.bookmarkedIds));
  renderApp();
}

// Global Keyboard Shortcut for Cmd+K Search
window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    STATE.isSearchOpen = !STATE.isSearchOpen;
    renderApp();
  }
  if (e.key === 'Escape') {
    if (STATE.isSearchOpen) {
      STATE.isSearchOpen = false;
      renderApp();
    }
    if (STATE.isBookmarksOpen) {
      STATE.isBookmarksOpen = false;
      renderApp();
    }
  }
});

// Main render engine
function renderApp() {
  applyTheme(STATE.currentTheme);

  const appContainer = document.getElementById('app');
  if (!appContainer) return;

  appContainer.className = 'min-h-screen flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden mesh-gradient-bg';
  appContainer.style.backgroundColor = 'var(--app-bg)';
  appContainer.style.color = 'var(--app-text)';

  // Clear existing content
  appContainer.innerHTML = '';

  // 1. Header / Navbar
  const navbar = renderNavbar({
    currentTheme: STATE.currentTheme,
    onSelectTheme: (newThemeId) => {
      applyTheme(newThemeId);
      renderApp();
    },
    onOpenSearch: () => {
      STATE.isSearchOpen = true;
      renderApp();
    },
    onOpenBookmarks: () => {
      STATE.isBookmarksOpen = true;
      renderApp();
    },
    bookmarkCount: STATE.bookmarkedIds.length,
    onScrollToSection: scrollToSection,
  });
  appContainer.appendChild(navbar);

  // 2. Main Content Wrapper
  const main = document.createElement('main');
  main.className = 'flex-1 space-y-12 sm:space-y-20 pb-16';

  // Hero Section
  const hero = renderHero({
    onOpenSearch: () => {
      STATE.isSearchOpen = true;
      renderApp();
    },
    onScrollToSection: scrollToSection,
  });
  main.appendChild(hero);

  // Branch Explorer Section
  const branchExplorer = renderBranchExplorer({
    bookmarkedIds: STATE.bookmarkedIds,
    onToggleBookmark: toggleBookmark,
    onSelectPreview: (item) => {
      STATE.previewItem = item;
      STATE.modalActiveTab = 'details';
      STATE.modalSelectedDocId = '';
      renderApp();
    },
  });
  main.appendChild(branchExplorer);

  // Syllabus Matrix Section
  const syllabusMatrix = renderSyllabusMatrix({
    bookmarkedIds: STATE.bookmarkedIds,
    onToggleBookmark: toggleBookmark,
    onSelectSyllabus: (syl) => {
      STATE.previewItem = syl;
      STATE.modalActiveTab = 'details';
      STATE.modalSelectedDocId = '';
      renderApp();
    },
  });
  main.appendChild(syllabusMatrix);

  // Testimonials Section
  const testimonials = renderTestimonialsSection();
  main.appendChild(testimonials);

  // About Section
  const about = renderAboutSection();
  main.appendChild(about);

  // FAQ Section
  const faq = renderFAQSection();
  main.appendChild(faq);

  // Contact Section
  const contact = renderContactSection();
  main.appendChild(contact);

  appContainer.appendChild(main);

  // 3. Footer
  const footer = renderFooter(scrollToSection);
  appContainer.appendChild(footer);

  // 4. Search Modal Overlay
  const searchModal = renderSearchModal({
    isOpen: STATE.isSearchOpen,
    onClose: () => {
      STATE.isSearchOpen = false;
      renderApp();
    },
    onSelectSubject: (sub) => {
      STATE.previewItem = sub;
      STATE.modalActiveTab = 'details';
      STATE.modalSelectedDocId = '';
      STATE.isSearchOpen = false;
      renderApp();
    },
    onSelectSyllabus: (syl) => {
      STATE.previewItem = syl;
      STATE.modalActiveTab = 'details';
      STATE.modalSelectedDocId = '';
      STATE.isSearchOpen = false;
      renderApp();
    },
  });
  appContainer.appendChild(searchModal);

  // 5. Bookmarks Slide-over Drawer
  const bookmarksDrawer = renderBookmarksDrawer({
    isOpen: STATE.isBookmarksOpen,
    onClose: () => {
      STATE.isBookmarksOpen = false;
      renderApp();
    },
    bookmarkedIds: STATE.bookmarkedIds,
    onToggleBookmark: toggleBookmark,
    onSelectPreview: (item) => {
      STATE.previewItem = item;
      STATE.modalActiveTab = 'details';
      STATE.modalSelectedDocId = '';
      STATE.isBookmarksOpen = false;
      renderApp();
    },
  });
  appContainer.appendChild(bookmarksDrawer);

  // 6. Document Preview Modal
  const isBookmarked = STATE.previewItem ? STATE.bookmarkedIds.includes(STATE.previewItem.id) : false;
  const archivePreviewModal = renderArchivePreviewModal({
    item: STATE.previewItem,
    isOpen: Boolean(STATE.previewItem),
    onClose: () => {
      STATE.previewItem = null;
      renderApp();
    },
    isBookmarked,
    onToggleBookmark: toggleBookmark,
    activeTab: STATE.modalActiveTab,
    selectedDocId: STATE.modalSelectedDocId,
  });
  appContainer.appendChild(archivePreviewModal);
}

// Initial App Boot
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

// Fallback boot if DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  renderApp();
}
