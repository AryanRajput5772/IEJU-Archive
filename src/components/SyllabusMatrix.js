import { SYLLABUS_DATA } from "../data/archiveData.js";
import { getIconSvg } from "../utils/icons.js";

let currentSelectedBranch = "all";

export function renderSyllabusMatrix(props = {}) {
  const { onToggleBookmark, onSelectSyllabus } = props;

  const getSyllabusFor = (branch, semester) => {
    return SYLLABUS_DATA.find(
      (s) => s.branch === branch && s.semester === semester,
    );
  };

  const branches = [
    { id: "cse", name: "Computer Science (CSE)" },
    { id: "ee", name: "Electronics / Electrical (EE)" },
    { id: "ce", name: "Chemical Engineering (CE)" },
  ];

  const years = [
    { yearName: "1st Year", semesters: [1, 2] },
    { yearName: "2nd Year", semesters: [3, 4] },
    { yearName: "3rd Year", semesters: [5, 6] },
    { yearName: "4th Year", semesters: [7, 8] },
  ];

  const section = document.createElement("section");
  section.id = "syllabus";
  section.className = "py-16 lg:py-24 relative";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
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
            <span>Curriculum Architecture</span>
            <span class="opacity-40">·</span>
            <span>All 8 Semesters</span>
          </div>
          <h2 
            class="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors"
            style="color: var(--app-text)"
          >
            Official Syllabus Matrix
          </h2>
          <p class="text-sm max-w-xl" style="color: var(--app-text-muted)">
            Verified course structure and examination curriculum published by the Institute of Engineering, Jiwaji University.
          </p>
        </div>

        <!-- Quick Branch Filter -->
        <div 
          class="flex items-center gap-1.5 p-1 rounded-xl glass-panel shrink-0"
          style="border-color: var(--panel-border)"
        >
          ${["all", "cse", "ee", "ce"]
            .map((branchKey) => {
              const isSelected = currentSelectedBranch === branchKey;
              const labels = {
                all: "All Branches",
                cse: "CSE",
                ee: "EE / ECE",
                ce: "Chemical",
              };
              return `
              <button
                data-syllabus-branch="${branchKey}"
                class="syllabus-branch-filter-btn px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer"
                style="
                  background-image: ${isSelected ? "var(--btn-bg)" : "none"};
                  color: ${isSelected ? "var(--btn-text)" : "var(--app-text-muted)"};
                  background-color: ${isSelected ? "transparent" : "transparent"};
                "
              >
                ${labels[branchKey]}
              </button>
            `;
            })
            .join("")}
        </div>
      </div>

      <!-- Desktop Interactive Matrix Table -->
      <div 
        class="hidden lg:block rounded-2xl glass-panel overflow-hidden shadow-2xl backdrop-blur-2xl"
        style="border-color: var(--panel-border)"
      >
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr 
                class="border-b"
                style="border-color: var(--panel-border); background-color: var(--panel-subtle)"
              >
                <th class="p-5 font-mono text-xs font-bold uppercase tracking-wider w-48" style="color: var(--app-text-muted)">
                  BRANCH \\ YEAR
                </th>
                ${years
                  .map(
                    (y) => `
                  <th class="p-5 text-center font-display font-bold text-sm">
                    <div class="font-mono text-xs font-semibold mb-0.5" style="color: var(--primary-accent)">
                      ${y.yearName}
                    </div>
                    <div class="text-xs font-normal" style="color: var(--app-text-muted)">
                      Semesters ${y.semesters[0]} & ${y.semesters[1]}
                    </div>
                  </th>
                `,
                  )
                  .join("")}
              </tr>
            </thead>
            <tbody 
              class="divide-y"
              style="border-color: var(--panel-border)"
            >
              ${branches
                .filter(
                  (b) =>
                    currentSelectedBranch === "all" ||
                    currentSelectedBranch === b.id,
                )
                .map(
                  (branch) => `
                  <tr 
                    class="hover:opacity-95 transition-opacity"
                    style="border-bottom-color: var(--panel-border)"
                  >
                    <!-- Branch Column -->
                    <td class="p-5 font-semibold text-sm whitespace-nowrap" style="background-color: var(--panel-subtle)">
                      <div class="font-mono text-xs font-bold mb-0.5" style="color: var(--primary-accent)">
                        ${branch.id.toUpperCase()}
                      </div>
                      <div class="text-xs" style="color: var(--app-text)">
                        ${branch.name}
                      </div>
                    </td>

                    <!-- Year Columns -->
                    ${years
                      .map(
                        (year) => `
                      <td class="p-4 align-top">
                        <div class="flex flex-col sm:flex-row items-center justify-center gap-2">
                          ${year.semesters
                            .map((sem) => {
                              const syl = getSyllabusFor(branch.id, sem);
                              if (!syl) return "";

                              return `
                              <div class="relative w-full">
                                <div 
                                  class="p-3 rounded-xl glass-panel transition-all flex flex-col items-center justify-between gap-2 text-center group hover:scale-[1.02]"
                                  style="border-color: var(--panel-border)"
                                >
                                  <span 
                                    class="text-xs font-semibold transition-colors"
                                    style="color: var(--app-text)"
                                  >
                                    Sem ${sem}
                                  </span>

                                  <div class="flex items-center gap-1.5">
                                    <button
                                      data-preview-syllabus-id="${syl.id}"
                                      class="open-syllabus-preview-btn p-1.5 rounded-lg transition-colors cursor-pointer"
                                      style="background-color: var(--panel-subtle); color: var(--app-text)"
                                      title="Preview Syllabus"
                                    >
                                      ${getIconSvg("eye", "w-3.5 h-3.5", "color: var(--primary-accent)")}
                                    </button>
                                    <a
                                      href="${syl.driveUrl}"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      class="p-1.5 rounded-lg transition-colors"
                                      style="background-color: var(--panel-subtle); color: var(--app-text-muted)"
                                      title="Open in Google Drive"
                                    >
                                      ${getIconSvg("externalLink", "w-3.5 h-3.5")}
                                    </a>
                                  </div>
                                </div>
                              </div>
                            `;
                            })
                            .join("")}
                        </div>
                      </td>
                    `,
                      )
                      .join("")}
                  </tr>
                `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Quick List Cards -->
      <div class="block lg:hidden space-y-4">
        <div class="text-xs font-semibold uppercase tracking-wider" style="color: var(--app-text-muted)">
          Quick Syllabus Access 
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          ${SYLLABUS_DATA.filter(
            (s) =>
              currentSelectedBranch === "all" ||
              s.branch === currentSelectedBranch,
          )
            .map(
              (syl) => `
            <div 
              class="p-3 rounded-xl glass-panel flex flex-col justify-between gap-2"
              style="border-color: var(--panel-border)"
            >
              <div>
                <div class="text-[10px] font-mono font-bold uppercase" style="color: var(--primary-accent)">
                  ${syl.branch.toUpperCase()}
                </div>
                <div class="text-xs font-bold" style="color: var(--app-text)">
                  Semester ${syl.semester}
                </div>
              </div>
              <div class="flex items-center gap-2 pt-1">
                <button
                  data-preview-syllabus-id="${syl.id}"
                  class="open-syllabus-preview-btn flex-1 py-1 px-2 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 cursor-pointer"
                  style="background-color: var(--panel-subtle); color: var(--app-text)"
                >
                  ${getIconSvg("eye", "w-3 h-3", "color: var(--primary-accent)")}
                  Preview
                </button>
                <a
                  href="${syl.driveUrl}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1 rounded-lg"
                  style="background-color: var(--panel-subtle); color: var(--app-text-muted)"
                >
                  ${getIconSvg("externalLink", "w-3 h-3")}
                </a>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>

    </div>
  `;

  // Attach event listeners
  section.querySelectorAll(".syllabus-branch-filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentSelectedBranch = btn.getAttribute("data-syllabus-branch");
      const updated = renderSyllabusMatrix(props);
      section.replaceWith(updated);
    });
  });

  section.querySelectorAll(".open-syllabus-preview-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sylId = btn.getAttribute("data-preview-syllabus-id");
      const syl = SYLLABUS_DATA.find((s) => s.id === sylId);
      if (syl && onSelectSyllabus) onSelectSyllabus(syl);
    });
  });

  return section;
}
