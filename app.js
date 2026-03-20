/**
 * OmniBridge - Core Logic
 * Handles intent parsing, UI state transitions, and mocked Gemini processing.
 */
document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    form: document.getElementById("intentForm"),
    input: document.getElementById("userIntent"),
    processingState: document.getElementById("processingState"),
    statusText: document.getElementById("statusText"),
    resultsContainer: document.getElementById("resultsContainer"),
    intentCard: document.querySelector(".intent-card")
  };

  const statusMessages = [
    "Analyzing systemic complexity...",
    "Decoding bureaucratic jargon...",
    "Bridging human intent to required actions...",
    "Formulating action pathway...",
    "Finalizing plain-language summary..."
  ];

  elements.form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = elements.input.value.trim();
    if (!query) return;

    transitionToProcessing();

    // Simulate AI thinking process
    for (const msg of statusMessages) {
      elements.statusText.innerText = msg;
      await new Promise(resolve => setTimeout(resolve, 600)); // Optimized delay for better UX
    }

    try {
      const response = await bridgeIntent(query);
      renderResults(response);
    } catch (error) {
      console.error("OmniBridge Error:", error);
      elements.statusText.innerText = "An error occurred during processing.";
    }
  });

  function transitionToProcessing() {
    elements.resultsContainer.innerHTML = "";
    elements.resultsContainer.classList.add("hidden");
    elements.resultsContainer.classList.remove("results-enter");
    elements.intentCard.classList.add("hidden");
    elements.processingState.classList.remove("hidden");
  }

  /**
   * Mock AI Intent Parser
   * @param {string} query - The user's input phrase
   */
  async function bridgeIntent(query) {
    const qLower = query.toLowerCase();
    
    // Business Tax Pathway
    if (qLower.includes("business") || qLower.includes("taxes") || qLower.includes("llc")) {
      return {
        translation: "You want to legally register a new business and ensure compliance with local and federal tax laws. This spans three distinct public sector entities, but we've synthesized the process into a unified timeline.",
        steps: [
          { title: "Register Business Name (DBA)", desc: "File a 'Doing Business As' form with your local county clerk office to establish your legal trading name." },
          { title: "Obtain an EIN", desc: "Apply for an Employer Identification Number from the IRS. This acts as your business's social security number for tax purposes." },
          { title: "Open a Business Bank Account", desc: "Legally segment your personal finances from your business revenue to protect your personal liability (piercing the corporate veil)." }
        ],
        forms: ["SS-4 (EIN Application)", "State LLC Formation Articles"]
      };
    } 
    // Infrastructure/Community Pathway
    else if (qLower.includes("street lighting") || qLower.includes("pothole") || qLower.includes("neighborhood")) {
      return {
        translation: "You want to alert the municipal public works department about a local infrastructure hazard and ensure your request doesn't get lost in the backlog.",
        steps: [
          { title: "Submit a 311 Request", desc: "We've drafted the formal complaint using the exact civil engineering classification ('hazards requiring expedited remediation')." },
          { title: "Petition City Council", desc: "If unresolved in 14 days, escalate via your district's city council member. We found their direct constituent email." },
          { title: "Attend Upcoming Town Hall", desc: "The next meeting is Tuesday. We've added speaking points referencing municipal code §14.2 regarding public safety." }
        ],
        forms: ["Public Works Service Request", "District Rep Email Draft"]
      };
    } 
    // Standard Fallback Pathway
    else {
      return {
        translation: "Your intent intersects with complex institutional rules. We've mapped out the foundational administrative steps required to achieve your objective without getting derailed by bureaucratic friction.",
        steps: [
          { title: "Identify the Governing Jurisdiction", desc: "Pinpoint the exact departmental agency or organization responsible for authorizing this action." },
          { title: "Compile Requisite Documentation", desc: "Gather mandated proof of identity, residency, and historical records required for compliance." },
          { title: "Submit Formal Application", desc: "File your request using the specialized taxonomy the system filters for processing." }
        ],
        forms: ["Standard Universal Request Form", "Supporting Document Checklist"]
      };
    }
  }

  function renderResults(data) {
    elements.processingState.classList.add("hidden");
    elements.resultsContainer.classList.remove("hidden");
    
    // Trigger CSS animation reflow
    void elements.resultsContainer.offsetWidth; 
    elements.resultsContainer.classList.add("results-enter");

    const stepsHtml = data.steps.map((step, index) => `
      <article class="step-item">
        <div class="step-number" aria-hidden="true">${index + 1}</div>
        <div class="step-content">
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      </article>
    `).join("");

    const formsHtml = data.forms.map(form => `
      <div class="form-item">
        <div class="form-info">
          <svg class="form-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span class="form-name">${form}</span>
        </div>
        <button class="download-btn" aria-label="Auto-fill form ${form}">Auto-Fill</button>
      </div>
    `).join("");

    const template = `
      <section class="glassy" aria-labelledby="translation-heading">
        <h2 id="translation-heading" class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Plain English Translation
        </h2>
        <div class="translation-box">
          <p>${data.translation}</p>
        </div>
      </section>

      <section class="glassy" aria-labelledby="pathway-heading">
        <h2 id="pathway-heading" class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Your Action Pathway
        </h2>
        <div class="action-steps">
          ${stepsHtml}
        </div>
      </section>

      <section class="glassy forms-box" aria-labelledby="documents-heading">
        <h2 id="documents-heading" class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Prepared Documents
        </h2>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">We've pre-filled these forms based on your query.</p>
        <div class="forms-list">
          ${formsHtml}
        </div>
        <button style="margin-top: 1.5rem; width: 100%; border: 1px solid rgba(255,255,255,0.15);" class="primary-btn" onclick="location.reload()" aria-label="Start a new intent query">
          Start New Query
        </button>
      </section>
    `;

    elements.resultsContainer.innerHTML = template;
  }
});
