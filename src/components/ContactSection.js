import { getIconSvg } from "../utils/icons.js";

let formState = {
  name: "",
  semester: "",
  email: "",
  message: "",
  contributionType: "general",
  driveLink: "",
};
let status = "idle";

export function renderContactSection() {
  const section = document.createElement("section");
  section.id = "contact";
  section.className = "py-16 lg:py-24 relative overflow-hidden";

  section.innerHTML = `
    <!-- Background specular glow -->
    <div 
      class="absolute bottom-10 left-1/3 w-96 h-96 blur-[130px] pointer-events-none rounded-full opacity-30"
      style="background-color: var(--mesh-1)"
    ></div>

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
      
      <!-- Header -->
      <div class="text-center space-y-2">
        <div 
          class="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors"
          style="color: var(--primary-accent)"
        >
          ${getIconSvg("mail", "w-3.5 h-3.5")}
          <span>Get in Touch</span>
        </div>
        <h2 
          class="text-3xl sm:text-4xl font-display font-bold tracking-tight transition-colors"
          style="color: var(--app-text)"
        >
          Contact & Material Contribution
        </h2>
        <p class="text-sm max-w-lg mx-auto" style="color: var(--app-text-muted)">
          Have past year question papers, unit notes, or questions about the archive? Reach out to us below.
        </p>
      </div>

      <!-- Glass Form Container -->
      <div 
        class="p-6 sm:p-10 rounded-3xl glass-panel shadow-2xl relative overflow-hidden"
        style="border-color: var(--panel-border)"
      >
        ${
          status === "success"
            ? `
          <div class="py-12 text-center space-y-4 animate-fade-in">
            <div 
              class="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center border"
              style="
                background-color: var(--panel-subtle);
                border-color: var(--primary-accent);
                color: var(--primary-accent);
              "
            >
              ${getIconSvg("checkCircle2", "w-8 h-8")}
            </div>
            <h3 class="text-xl font-bold tracking-tight" style="color: var(--app-text)">
              Message Received!
            </h3>
            <p class="text-sm max-w-md mx-auto leading-relaxed" style="color: var(--app-text-muted)">
              Thank you for reaching out to the IEJU Archive team. If you shared study notes or papers, we will review and index them into the repository!
            </p>
            <button
              id="reset-contact-form-btn"
              class="mt-4 px-6 py-2.5 rounded-xl border text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
              style="
                border-color: var(--panel-border);
                background-color: var(--panel-subtle);
                color: var(--app-text);
              "
            >
              Send Another Message
            </button>
          </div>
        `
            : `
          <form id="contact-form" class="space-y-6"  action="https://formspree.io/f/mjkvdgek"
    method="POST"><input
    type="hidden"
    name="contributionType"
    value="${formState.contributionType}"
/>
            
            <!-- Category Segmented Control -->
            <div class="space-y-2">
              <label class="block text-xs font-medium" style="color: var(--app-text)">
                Purpose of Message
              </label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                ${[
                  { id: "general", label: "General Inquiry" },
                  { id: "notes", label: "Contribute Unit Notes" },
                  { id: "paper", label: "Send Past Exam Paper" },
                ]
                  .map((cat, idx) => {
                    const isSelected = formState.contributionType === cat.id;
                    return `
                    <button
                      type="button"
                      data-contribution-type="${cat.id}"
                      class="contribution-type-btn py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                        idx === 2 ? "col-span-2 sm:col-span-1" : ""
                      }"
                      style="
                        background-color: ${isSelected ? "var(--panel-subtle)" : "transparent"};
                        border-color: ${isSelected ? "var(--primary-accent)" : "var(--panel-border)"};
                        color: ${isSelected ? "var(--app-text)" : "var(--app-text-muted)"};
                      "
                    >
                      ${cat.label}
                    </button>
                  `;
                  })
                  .join("")}
              </div>
            </div>

            <!-- Row 1: Name and Semester -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--app-text)">
                  Your Full Name <span style="color: var(--primary-accent)">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  value="${formState.name || ""}"
                  placeholder="e.g. Aryan Rajput"
                  class="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                />
              </div>

              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--app-text)">
                  Semester & Branch <span style="color: var(--primary-accent)">*</span>
                </label>
                <input
                  type="text"
                  id="contact-semester"
                  name="semester"
                  required
                  value="${formState.semester || ""}"
                  placeholder="e.g. 4th Sem (CSE)"
                  class="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                />
              </div>
            </div>

            <!-- Row 2: Email and Optional Google Drive Link -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--app-text)">
                  Email Address <span style="color: var(--primary-accent)">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  value="${formState.email || ""}"
                  placeholder="student@example.com"
                  class="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                />
              </div>

              <div>
                <label class="block text-xs font-medium mb-1.5" style="color: var(--app-text)">
                  Google Drive Link <span style="color: var(--app-text-muted)">(Optional for notes/PDFs)</span>
                </label>
                <input
                  type="url"
                  id="contact-drive-link"
                  name="driveLink"
                  value="${formState.driveLink || ""}"

                  placeholder="https://drive.google.com/..."
                  class="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors"
                  style="
                    background-color: var(--panel-subtle);
                    border-color: var(--panel-border);
                    color: var(--app-text);
                  "
                />
              </div>
            </div>

            <!-- Row 3: Message Textarea -->
            <div>
              <label class="block text-xs font-medium mb-1.5" style="color: var(--app-text)">
                Message Details <span style="color: var(--primary-accent)">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows="4"
                placeholder="Detail your question, feedback, or description of the study notes you are submitting..."
                class="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none transition-colors resize-none"
                style="
                  background-color: var(--panel-subtle);
                  border-color: var(--panel-border);
                  color: var(--app-text);
                "
              >${formState.message || ""}</textarea>
            </div>

            <!-- Submit Button -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            

              <button
                type="submit"
                ${status === "submitting" ? "disabled" : ""}
                class="w-full sm:w-auto px-7 py-3 rounded-xl disabled:opacity-50 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer"
                style="
                  background-image: var(--btn-bg);
                  color: var(--btn-text);
                "
              >
                ${getIconSvg("send", "w-4 h-4")}
                <span>${status === "submitting" ? "Sending Message..." : "Send Message"}</span>
              </button>
            </div>

          </form>
        `
        }
      </div>

    </div>
  `;

  // Attach handlers
  section.querySelectorAll(".contribution-type-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      formState.contributionType = btn.getAttribute("data-contribution-type");
      const updated = renderContactSection();
      section.replaceWith(updated);
    });
  });

  // section.querySelector("#contact-form")?.addEventListener("submit", (e) => {
  //   e.preventDefault();
  //   status = "submitting";
  //   const updated = renderContactSection();
  //   section.replaceWith(updated);

  //   setTimeout(() => {
  //     status = "success";
  //     formState = {
  //       name: "",
  //       semester: "",
  //       email: "",
  //       message: "",
  //       contributionType: "general",
  //       driveLink: "",
  //     };
  //     const successUpdated = renderContactSection();
  //     updated.replaceWith(successUpdated);
  //   }, 800);
  // });
  section
    .querySelector("#contact-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();

      const form = e.currentTarget;
      status = "submitting";

      const updated = renderContactSection();
      section.replaceWith(updated);

      try {
        const response = await fetch("https://formspree.io/f/mjkvdgek", {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json",
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.errors?.map((err) => err.message).join(", ") ||
              "Form submission failed.",
          );
        }

        status = "success";

        formState = {
          name: "",
          semester: "",
          email: "",
          message: "",
          contributionType: "general",
          driveLink: "",
        };

        const successUpdated = renderContactSection();
        updated.replaceWith(successUpdated);
      } catch (error) {
        console.error("Formspree submission error:", error);

        status = "idle";

        const errorUpdated = renderContactSection();
        updated.replaceWith(errorUpdated);

        alert("Unable to send your message: " + error.message);
      }
    });
  section
    .querySelector("#reset-contact-form-btn")
    ?.addEventListener("click", () => {
      status = "idle";
      const updated = renderContactSection();
      section.replaceWith(updated);
    });

  return section;
}
