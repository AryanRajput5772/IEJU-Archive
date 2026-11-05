import { getIconSvg } from "../utils/icons.js";

export function renderAboutSection() {
  const section = document.createElement("section");
  section.id = "about";
  section.className = "py-16 lg:py-24 relative";

  section.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <!-- Header -->
      <div 
        class="space-y-2 pb-4 border-b text-center max-w-2xl mx-auto"
        style="border-color: var(--panel-border)"
      >
        <div 
          class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          style="color: var(--primary-accent)"
        >
          <span>Mission & Provenance</span>
          <span class="opacity-40">·</span>
          <span>Est. 2025</span>
        </div>
        <h2 
          class="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors"
          style="color: var(--app-text)"
        >
          About IEJU Archive
        </h2>
        <p class="text-sm" style="color: var(--app-text-muted)">
          Dedicated to empowering engineering students of Jiwaji University with democratized, frictionless access to academic knowledge.
        </p>
      </div>

      <!-- Narrative Glass Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Main Story Bento Card -->
        <div 
          class="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel space-y-6 relative overflow-hidden"
          style="border-color: var(--panel-border)"
        >
          <div 
            class="absolute top-0 right-0 w-80 h-80 blur-[100px] pointer-events-none rounded-full opacity-30"
            style="background-color: var(--primary-accent)"
          ></div>

          <div class="space-y-4 text-sm sm:text-base leading-relaxed" style="color: var(--app-text-muted)">
            <p>
              <strong class="font-semibold" style="color: var(--app-text)">IEJU Archive</strong> was proudly created by 
              <strong class="font-semibold" style="color: var(--primary-accent)">Aryan Rajput</strong> in 
              <strong class="font-semibold" style="color: var(--app-text)">2025</strong>. It was born out of a simple observation: engineering students spent hours scouring disparate message boards and fragmented chats just to find past semester exam papers and official syllabi.
            </p>

            <p>
              Our mission is to provide seamless, centralized access to essential academic resources — including previous years' question papers, unit-wise reference notes, and textbook compilations — enabling every student in the Institute of Engineering to prepare effectively and achieve academic excellence.
            </p>

            <p class="text-sm">
              IEJU Archive continues to grow through peer contributions, continuously expanding its repository to span more branches, electives, and structured learning paths. By bridging the gap between students and critical academic tools, we foster a thriving culture of collective learning.
            </p>
          </div>

          <!-- Creator Links & Signature -->
          <div 
            class="pt-6 border-t flex flex-wrap items-center justify-between gap-4"
            style="border-color: var(--panel-border)"
          >
            <div>
              <div class="text-sm font-bold" style="color: var(--app-text)">Aryan Rajput</div>
              <div class="text-xs" style="color: var(--app-text-muted)">Founder & Core Developer · Batch of 2027</div>
            </div>

            <div class="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/-aryan-rajput"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl glass-panel-subtle text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                style="border-color: var(--panel-border); color: var(--app-text)"
              >
                ${getIconSvg("linkedin", "w-4 h-4", "color: var(--primary-accent)")}
                <span>LinkedIn Profile</span>
              </a>
              <a
                href="https://github.com/AryanRajput5772"
                target="_blank"
                rel="noopener noreferrer"
                class="px-4 py-2 rounded-xl glass-panel-subtle text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                style="border-color: var(--panel-border); color: var(--app-text)"
              >
                ${getIconSvg("github", "w-4 h-4")}
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Side Highlights Card -->
        <div class="lg:col-span-4 space-y-4">
          <div 
            class="p-6 rounded-2xl glass-panel space-y-3"
            style="border-color: var(--panel-border)"
          >
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center border"
              style="
                background-color: var(--panel-subtle);
                border-color: var(--panel-border);
                color: var(--primary-accent);
              "
            >
              ${getIconSvg("bookOpen", "w-5 h-5")}
            </div>
            <h4 class="text-base font-bold tracking-tight" style="color: var(--app-text)">
              Open Academic Heritage
            </h4>
            <p class="text-xs leading-relaxed" style="color: var(--app-text-muted)">
              All study files and papers are hosted directly on Google Drive cloud storage without paywalls or subscriptions.
            </p>
          </div>

          <div 
            class="p-6 rounded-2xl glass-panel space-y-3"
            style="border-color: var(--panel-border)"
          >
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center border"
              style="
                background-color: var(--panel-subtle);
                border-color: var(--panel-border);
                color: var(--primary-accent);
              "
            >
              ${getIconSvg("graduationCap", "w-5 h-5")}
            </div>
            <h4 class="text-base font-bold tracking-tight" style="color: var(--app-text)">
              Jiwaji University Focused
            </h4>
            <p class="text-xs leading-relaxed" style="color: var(--app-text-muted)">
              Specifically formatted according to the Institute of Engineering Jiwaji University syllabus and exam patterns.
            </p>
          </div>
        </div>

      </div>

    </div>
  `;

  return section;
}
