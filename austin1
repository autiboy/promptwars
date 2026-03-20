document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("intentForm");
  const intentInput = document.getElementById("userIntent");
  const processingState = document.getElementById("processingState");
  const statusText = document.getElementById("statusText");
  const resultsContainer = document.getElementById("resultsContainer");

  const statusMessages = [
    "Analyzing systemic complexity...",
    "Decoding bureaucratic jargon...",
    "Bridging human intent to required actions...",
    "Formulating action pathway...",
    "Finalizing plain-language summary...",
  ];

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = intentInput.value.trim();
    if (!query) return;

    // Reset UI
    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
    form.parentNode.classList.add("hidden");
    processingState.classList.remove("hidden");

    // Simulate AI processing timeline
    for (let i = 0; i < statusMessages.length; i++) {
      statusText.innerText = statusMessages[i];
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Mock response based on Gemini conceptually parsing
    const response = mockGeminiBridge(query);

    // Render Response
    processingState.classList.add("hidden");
    renderResults(response);
  });

  function mockGeminiBridge(query) {
    const qLower = query.toLowerCase();
    
    // Simple conceptual routing based on keywords
    if (qLower.includes("business") || qLower.includes("taxes")) {
      return {
        translation: "You want to legally register a new business and ensure you're compliant with local and federal tax requirements. This involves three separate government entities, but we've simplified it.",
        steps: [
          { title: "Register Business Name (DBA)", desc: "File a 'Doing Business As' form with your local county clerk office." },
          { title: "Obtain an EIN", desc: "Apply for an Employer Identification Number from the IRS for tax purposes." },
          { title: "Open a Business Bank Account", desc: "Keep your personal and business finances legally separate to protect your liability." }
        ],
        forms: ["SS-4 (EIN Application)", "State LLC Formation Articles"]
      };
    } else if (qLower.includes("street lighting") || qLower.includes("pothole") || qLower.includes("neighborhood")) {
      return {
        translation: "You want to alert the municipal public works department about a local infrastructure issue and ensure it gets prioritized for repair.",
        steps: [
          { title: "Submit a 311 Request", desc: "We've drafted the formal complaint using the correct civil engineering terminology for 'inadequate luminescence'." },
          { title: "Petition City Council", desc: "If unresolved in 14 days, contact your district's city council member. We found their contact info." },
          { title: "Attend Town Hall", desc: "Next meeting is on Tuesday. We've added speaking points referencing municipal code 14.2." }
        ],
        forms: ["Public Works Service Request", "District Rep Email Draft"]
      };
    } else {
      // Generic fallback
      return {
        translation: "You have a goal that intersects with complex institutional rules. We've mapped out the exact sequential actions required to achieve your intent without getting lost in the bureaucracy.",
        steps: [
          { title: "Identify the Governing Body", desc: "Locate the specific department or organization responsible for this domain." },
          { title: "Gather Required Documentation", desc: "Collect any proof of identity, residency, or historical records needed." },
          { title: "Submit Formal Application", desc: "File your request using the exact terminology that the system expects." }
        ],
        forms: ["Standard Request Form", "Supporting Documents Checklist"]
      };
    }
  }

  function renderResults(data) {
    resultsContainer.classList.remove("hidden");
    
    const stepsHtml = data.steps.map((step, index) => `
      <div class="step-item">
        <div class="step-number">${index + 1}</div>
        <div class="step-content">
          <h3>${step.title}</h3>
          <p>${step.desc}</p>
        </div>
      </div>
    `).join("");

    const formsHtml = data.forms.map(form => `
      <div class="form-item">
        <div class="form-info">
          <svg class="form-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          <span class="form-name">${form}</span>
        </div>
        <button class="download-btn">Auto-Fill</button>
      </div>
    `).join("");

    resultsContainer.innerHTML = `
      <div class="glassy">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          Plain English Translation
        </div>
        <div class="translation-box">
          <p>${data.translation}</p>
        </div>
      </div>

      <div class="glassy">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Your Action Pathway
        </div>
        <div class="action-steps">
          ${stepsHtml}
        </div>
      </div>

      <div class="glassy forms-box">
        <div class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          Prepared Documents
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.5rem;">We've pre-filled these forms based on your query.</p>
        <div class="forms-list">
          ${formsHtml}
        </div>
        <button style="margin-top: 1.5rem; width: 100%; border:1px solid rgba(255,255,255,0.2)" class="primary-btn" onclick="location.reload()">
          Start New Query
        </button>
      </div>
    `;
  }
});
