// Initialize Lucide Icons on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    if (document.getElementById('bpm-btn-0'))
        selectBpmStep(0);
    if (document.getElementById('scoreboard-body'))
        renderScoreboard();
    if (document.querySelectorAll('.cots-check').length > 0)
        updateCotsChecklist();
});

// 1. BPM 5-Step Stepper Logic
const bpmData = [
    {step: "01", title: "Identify", objective: "Pinpoint inefficiencies, systemic bottlenecks, manual paperwork choke-points, and strategic targets across departments.", deliverables: "Process Prioritization Matrix, Initial Problem Statement, Executive Project Charter, Business Case justification.", pitfall: "Automating an already flawed or broken process instead of re-evaluating whether the activity needs to exist at all."},
    {step: "02", title: "Analyze", objective: "Model and document the current operational state ('As-Is'). Quantify cycle times, resource allocations, handoffs, and error rates.", deliverables: "Current-State Data Flow Diagrams (DFD Level 0/1), Cycle-Time Bottleneck Audits, Value-Stream Mapping diagrams.", pitfall: "Analysis paralysis—spending excessive months documenting minor nuances while losing executive momentum."},
    {step: "03", title: "Design", objective: "Engineer the future operational state ('To-Be'). Eliminate redundant steps, combine departmental handoffs, and design system interfaces.", deliverables: "To-Be Workflow Schemas, System Architecture Specifications, Functional Requirements Document (FRD), Feasibility Models.", pitfall: "Designing an idealized process in isolation without continuous involvement from frontline end-users."},
    {step: "04", title: "Implement", objective: "Roll out the redesigned business process supported by the new or configured information system. Train staff and manage cultural change.", deliverables: "Standard Operating Procedures (SOPs), Interactive Training Curricula, Pilot Cutover Deployment, Change Management Support.", pitfall: "Failing to prepare users for operational change, resulting in active user resistance or reverting to manual spreadsheets."},
    {step: "05", title: "Measure", objective: "Establish continuous monitoring and feedback loops. Track ongoing process performance against predetermined business KPIs.", deliverables: "Operational KPI Dashboards (Order throughput, Error frequencies, SLA compliance), Executive Post-Implementation Review.", pitfall: "Treating implementation as a one-time static event rather than an iterative continuous improvement cycle (Deming/PDCA cycle)."}
];

function selectBpmStep(index) {
    if (!document.getElementById(`bpm-btn-0`))
        return;
    bpmData.forEach((_, i) => {
        const btn = document.getElementById(`bpm-btn-${i}`);
        if (i === index) {
            btn.className = "bpm-step-btn text-left p-3 rounded-lg border border-blue-500/60 bg-blue-600/15 transition-all";
            btn.querySelector('span:first-child').className = "text-xs font-mono text-blue-400 block mb-1 font-semibold";
            btn.querySelector('span:nth-child(2)').className = "text-sm font-semibold text-white block";
        } else {
            btn.className = "bpm-step-btn text-left p-3 rounded-lg border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all";
            btn.querySelector('span:first-child').className = "text-xs font-mono text-slate-500 block mb-1";
            btn.querySelector('span:nth-child(2)').className = "text-sm font-semibold text-slate-300 block";
        }
    });

    const active = bpmData[index];
    const container = document.getElementById('bpm-detail-card');
    container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div><span class="text-xs font-mono text-blue-400 font-semibold block mb-1">Step ${active.step} · Objective</span><p class="text-slate-300 text-xs leading-relaxed">${active.objective}</p></div>
      <div><span class="text-xs font-mono text-emerald-400 font-semibold block mb-1">Primary Deliverables</span><p class="text-slate-300 text-xs leading-relaxed">${active.deliverables}</p></div>
      <div><span class="text-xs font-mono text-amber-400 font-semibold block mb-1">Critical Pitfall to Prevent</span><p class="text-slate-300 text-xs leading-relaxed">${active.pitfall}</p></div>
    </div>
  `;
}

// 2. Four Levels of Organizational Change Tap-Cards (Flip Logic)
const changeCards = ['automation', 'rationalization', 'redesign', 'paradigm'];

function toggleChangeCard(cardKey, event) {
    if (event)
        event.stopPropagation();

    const innerCard = document.getElementById(`card-inner-${cardKey}`);
    if (!innerCard)
        return;

    // Check if currently flipped
    const isFlipped = innerCard.style.transform === 'rotateY(180deg)';

    // Reset all cards back to front
    resetAllChangeCards();

    // If the clicked card wasn't flipped, flip it
    if (!isFlipped) {
        innerCard.style.transform = 'rotateY(180deg)';
    }
}

function resetAllChangeCards() {
    changeCards.forEach(key => {
        const innerCard = document.getElementById(`card-inner-${key}`);
        if (innerCard) {
            innerCard.style.transform = 'rotateY(0deg)';
        }
    });
}

// Click outside to flip all cards back
document.addEventListener('click', (event) => {
    const container = document.getElementById('change-cards-container');
    if (container && !container.contains(event.target)) {
        resetAllChangeCards();
    }
});

// 3. Build Method & Agile Tab Switching (For build.html)
function switchBuildMethod(method) {
    const waterfall = document.getElementById('waterfall-subview');
    const agile = document.getElementById('agile-subview');
    const btnWaterfall = document.getElementById('btn-method-waterfall');
    const btnAgile = document.getElementById('btn-method-agile');
    if (!waterfall || !agile)
        return;

    if (method === 'waterfall') {
        waterfall.classList.remove('hidden');
        agile.classList.add('hidden');
        btnWaterfall.className = "px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white transition-all flex items-center gap-1.5";
        btnAgile.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
    } else {
        waterfall.classList.add('hidden');
        agile.classList.remove('hidden');
        btnWaterfall.className = "px-3 py-1.5 rounded-md text-xs font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5";
        btnAgile.className = "px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white transition-all flex items-center gap-1.5";
    }
}

function switchAgileTab(tabName) {
    ['scrum', 'xp', 'devops'].forEach(t => {
        const tabContent = document.getElementById(`agile-tab-${t}`);
        const tabBtn = document.getElementById(`tab-agile-${t}`);
        if (!tabContent || !tabBtn)
            return;
        if (t === tabName) {
            tabContent.classList.remove('hidden');
            tabBtn.className = "px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white transition-all";
        } else {
            tabContent.classList.add('hidden');
            tabBtn.className = "px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400 hover:text-white transition-all";
        }
    });
}

// 4. COTS Evaluation Checklist Logic (For buy.html)
function updateCotsChecklist() {
    const checkboxes = document.querySelectorAll('.cots-check');
    if (checkboxes.length === 0)
        return;
    let checkedCount = 0;
    checkboxes.forEach(cb => {
        if (cb.checked)
            checkedCount++;
    });

    const badge = document.getElementById('cots-score-badge');
    const banner = document.getElementById('cots-advisory-banner');

    badge.textContent = `${checkedCount} / 4 Criteria Met`;

    if (checkedCount === 4) {
        badge.className = "px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-semibold self-start sm:self-auto border border-emerald-500/30";
        banner.className = "p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2.5";
        banner.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 shrink-0"></i><span><strong>Ideal COTS Fit:</strong> High process alignment, robust API interoperability, strong vendor viability, and controlled TCO justify purchasing off-the-shelf software.</span>`;
    } else if (checkedCount >= 2) {
        badge.className = "px-3 py-1 rounded bg-amber-500/20 text-amber-400 font-mono text-xs font-semibold self-start sm:self-auto border border-amber-500/30";
        banner.className = "p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs text-amber-300 flex items-center gap-2.5";
        banner.innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 shrink-0"></i><span><strong>Moderate Fit (Configured COTS Recommended):</strong> Require vendors to demonstrate legacy API hooks and calculate custom middleware consulting costs before contract execution.</span>`;
    } else {
        badge.className = "px-3 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs font-semibold self-start sm:self-auto";
        banner.className = "p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5";
        banner.innerHTML = `<i data-lucide="info" class="w-4 h-4 text-slate-400 shrink-0"></i><span>Check your project alignment criteria above to calculate the executive readiness score.</span>`;
    }
    lucide.createIcons();
}

// 5. Waterfall Modal (For build.html)
const waterfallPhases = {
    investigation: {num: "Phase 01 of 06", title: "1. Systems Investigation", html: `<div class="space-y-3"><p>Initial phase in the development of a new or modified business information system whose purpose is to gain a clear understanding of the problem specifics to solve or the opportunity to address.</p><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"><strong class="text-blue-400 block font-mono">Joint Application Development (JAD)</strong><p class="text-slate-300">A structured meeting process that can accelerate and improve the efficiency and effectiveness of the investigation, analysis, and design phases of a systems development project.</p></div><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"><strong class="text-emerald-400 block font-mono">Functional Decomposition</strong><p class="text-slate-300">A technique used during the investigation, analysis, and design phases to define the business processes included within the scope of the system.</p></div><div class="text-[11px] font-mono text-slate-400"><strong>Key Deliverable:</strong> Formal Systems Investigation Report & Executive Project Charter.</div></div>`},
    analysis: {num: "Phase 02 of 06", title: "2. Systems Analysis", html: `<div class="space-y-3"><p>Thorough examination of what the existing system does and what information users need from the new system.</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs"><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-white block font-semibold mb-0.5">Data Flow Diagrams (DFDs)</strong><span class="text-slate-400">Traces how data moves into, through, and out of the system (Context Level 0 down to detailed Level 1/2 functional processes).</span></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-white block font-semibold mb-0.5">Entity-Relationship (ER)</strong><span class="text-slate-400">Defines database entities, cardinalities (1:1, 1:N, M:N), primary keys, and relationships.</span></div></div><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2"><strong class="text-amber-400 block font-mono">The 5 TELOS Feasibilities</strong><ul class="space-y-1 text-slate-300 text-xs"><li><strong>T - Technical:</strong> examines whether a project is feasible within the current limits of available technology</li><li><strong>E - Economic:</strong> determines whether the expected benefits associated with the project outweigh the expected costs sufficiently to make the project financially attractive</li><li><strong>L - Legal:</strong> the process of determining whether laws or regulations may prevent or limit a system development project</li><li><strong>O - Operational:</strong> the process of determining how a system will be accepted by people and how well it will meet various system performance expectations</li><li><strong>S - Schedule:</strong> the process of determining whether a project can be completed within a desired time frame</li></ul></div></div>`},
    design: {num: "Phase 03 of 06", title: "3. Systems Design", html: `<div class="space-y-3"><p>Specifies how the system will accomplish the analyzed functional requirements, including UI layouts, security controls, and disaster resilience.</p><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5"><strong class="text-blue-400 block font-mono">6 Core User Interface (UI) Design Principles</strong><div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-300"><div>1. <strong>Consistency</strong>: Uniform patterns</div><div>2. <strong>Feedback</strong>: Immediate state cues</div><div>3. <strong>Error Handling</strong>: Clear remediation</div><div>4. <strong>One Action/Screen</strong>: Low friction</div><div>5. <strong>Progressive Disclosure</strong>: On-demand</div><div>6. <strong>Aesthetic Integrity</strong>: Visual balance</div></div></div><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5"><strong class="text-rose-400 block font-mono">6 System Security & Controls Architecture</strong><div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-300"><div>• <strong>Input Controls</strong>: Type/mask checks</div><div>• <strong>Processing Controls</strong>: Concurrency</div><div>• <strong>Output Controls</strong>: Watermarking</div><div>• <strong>Database Controls</strong>: Encryption</div><div>• <strong>Telecom Controls</strong>: TLS/VPNs</div><div>• <strong>Personnel Controls</strong>: RBAC & audits</div></div></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-300"><strong class="text-white">Disaster Recovery Planning (DRP):</strong> Defining Recovery Time Objectives (RTO), Recovery Point Objectives (RPO), offsite data replication, and hot/warm standby cloud failover.</div></div>`},
    construction: {num: "Phase 04 of 06", title: "4. Systems Construction", html: `<div class="space-y-3"><p>Translates design specifications into executable computer code, database schemas, and documentation.</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs"><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-white block font-semibold mb-0.5">Software Development Tools</strong><span class="text-slate-400">Modern compilers, IDEs, visual component builders, and code generation frameworks that accelerate rapid, type-safe development.</span></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-white block font-semibold mb-0.5">Database Construction</strong><span class="text-slate-400">Generating tables, indexes, constraints, stored procedures, and migrating historical data records into clean structures.</span></div></div><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"><strong class="text-emerald-400 block font-mono">Unit Testing (White-Box)</strong><p class="text-slate-300 text-xs">Testing individual program modules, routines, and functions in complete isolation from the rest of the application to guarantee that internal logic branches return expected outputs.</p></div><div class="text-[11px] font-mono text-slate-400"><strong>Key Deliverable:</strong> Verified compiled source code, API documentation, runbooks, and unit test suites.</div></div>`},
    testing: {num: "Phase 05 of 06", title: "5. Integration & Testing", html: `<div class="space-y-3"><p>Ensures that the completely assembled software suite functions without defect, handles expected data scale, and satisfies user business goals.</p><div class="space-y-2 text-xs"><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-blue-400 block font-semibold">1. Integration Testing:</strong><span class="text-slate-300">Validates data flow contracts, message queues, and API communication between independently written modules.</span></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-purple-400 block font-semibold">2. System Testing:</strong><span class="text-slate-300">Validates the entire integrated application as a cohesive whole against initial system specifications.</span></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-amber-400 block font-semibold">3. Volume / Stress Testing:</strong><span class="text-slate-300">Subjects the application to anticipated peak transaction volume, concurrent database queries, and network saturations to discover performance cliffs and memory leaks.</span></div><div class="p-2.5 rounded bg-slate-950 border border-slate-800"><strong class="text-emerald-400 block font-semibold">4. User Acceptance Testing (UAT):</strong><span class="text-slate-300">Real end-users perform daily business scenarios in a staging environment to provide formal executive sign-off prior to production deployment.</span></div></div></div>`},
    implementation: {num: "Phase 06 of 06", title: "6. Implementation & Maintenance", html: `<div class="space-y-3"><p>Putting the system into active production operations and sustaining its health throughout its operational lifecycle.</p><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-2"><strong class="text-blue-400 block font-mono">4 Cut-over Conversion Strategies</strong><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs"><div class="p-2 rounded bg-slate-900 border border-slate-800/80"><strong class="text-white block font-semibold">Direct Cutover (Plunge):</strong><span class="text-slate-400">Immediate shutdown of old system and start of new. Highest risk, lowest cost, no rollback.</span></div><div class="p-2 rounded bg-slate-900 border border-slate-800/80"><strong class="text-white block font-semibold">Phase-in Strategy:</strong><span class="text-slate-400">Gradual rollout by business department, geographic branch, or functional module.</span></div><div class="p-2 rounded bg-slate-900 border border-slate-800/80"><strong class="text-white block font-semibold">Pilot Approach:</strong><span class="text-slate-400">Complete rollout in one single test branch to prove stability before company-wide release.</span></div><div class="p-2 rounded bg-slate-900 border border-slate-800/80"><strong class="text-white block font-semibold">Parallel Start-up:</strong><span class="text-slate-400">Running old and new systems simultaneously. Lowest risk, highest operational overhead.</span></div></div></div><div class="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1"><strong class="text-emerald-400 block font-mono">4 Maintenance Tiers & Disposal</strong><p class="text-slate-300 text-xs leading-relaxed"><strong>Slipstream</strong> (minor silent bug fixes), <strong>Patch</strong> (targeted security fix), <strong>Release</strong> (bundled feature updates), <strong>Version</strong> (major architectural overhaul). When retiring, follow strict <strong>System Disposal</strong> (data sanitization, shredding, compliance retention).</p></div></div>`}
};

function openWaterfallModal(phaseKey) {
    const modal = document.getElementById('waterfall-modal');
    const phase = waterfallPhases[phaseKey];
    if (!phase || !modal)
        return;
    document.getElementById('modal-phase-number').textContent = phase.num;
    document.getElementById('modal-phase-title').textContent = phase.title;
    document.getElementById('modal-phase-body').innerHTML = phase.html;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function closeWaterfallModal() {
    const modal = document.getElementById('waterfall-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

function handleModalBackdropClick(event) {
    if (event.target.id === 'waterfall-modal')
        closeWaterfallModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
        closeWaterfallModal();
});

// 6. Knowledge Check Quiz Logic (For quiz.html)
const quizQuestions = [
    {id: 1, name: "q1", correct: "D", explanation: "<strong>Correct Answer: D) Paradigm Shift.</strong> While Automation increases operational speed and Process Redesign reorganizes workflows, only a Paradigm Shift rethinks the fundamental nature of the enterprise and redefines the organizational business model."},
    {id: 2, name: "q2", correct: "B", explanation: "<strong>Correct Answer: B) Economic Feasibility.</strong> Under the TELOS model, Economic Feasibility assesses whether the expected tangible and intangible financial benefits (ROI, net present value, and cost savings) justify the project's capital expenditure."},
    {id: 3, name: "q3", correct: "D", explanation: "<strong>Correct Answer: D) Parallel Start-up.</strong> In a Parallel Start-up, both the old legacy system and the new system run simultaneously. If the new system encounters unexpected defects, the business continues running safely on the old system, making it the lowest-risk conversion strategy."},
    {id: 4, name: "q4", correct: "B", explanation: "<strong>Correct Answer: B) Product Owner.</strong> In the Scrum framework, the Product Owner holds sole accountability for managing, grooming, and prioritizing the Product Backlog, ensuring the development team delivers maximum business value each sprint."},
    {id: 5, name: "q5", correct: "C", explanation: "<strong>Correct Answer: C) Volume / Stress Testing.</strong> Volume Testing specifically benchmarks the system under heavy database loads and peak traffic spikes to guarantee stability before going live."}
];

function handleQuizSubmit(event) {
    event.preventDefault();
    let score = 0, answeredAll = true;

    quizQuestions.forEach(q => {
        const selected = document.querySelector(`input[name="${q.name}"]:checked`);
        const card = document.getElementById(`q-card-${q.id}`);
        const explanationDiv = document.getElementById(`q${q.id}-explanation`);

        if (!selected) {
            answeredAll = false;
            card.classList.add('border-rose-500/60');
        } else {
            card.classList.remove('border-rose-500/60');
            const isCorrect = selected.value === q.correct;
            if (isCorrect)
                score++;

            explanationDiv.classList.remove('hidden');
            if (isCorrect) {
                explanationDiv.className = "text-xs p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 leading-relaxed";
                explanationDiv.innerHTML = `<div class="flex items-center gap-1.5 font-bold mb-1"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Correct!</div> ${q.explanation}`;
            } else {
                explanationDiv.className = "text-xs p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 leading-relaxed";
                explanationDiv.innerHTML = `<div class="flex items-center gap-1.5 font-bold mb-1"><i data-lucide="x" class="w-3.5 h-3.5 text-rose-400"></i> Incorrect (You selected ${selected.value})</div> ${q.explanation}`;
            }
        }
    });

    if (!answeredAll) {
        const summary = document.getElementById('quiz-result-summary');
        summary.classList.remove('hidden');
        summary.className = "text-xs font-semibold text-rose-300 px-4 py-2 rounded-lg bg-rose-950/60 border border-rose-500/50";
        summary.innerHTML = `<span class="flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4 text-rose-400"></i> Please select an answer for all 5 questions before submitting.</span>`;
        lucide.createIcons();
        return;
    }

    const percentage = Math.round((score / quizQuestions.length) * 100);
    let status = percentage >= 80 ? "Mastery Achieved" : (percentage >= 60 ? "Proficient" : "Needs Review");

    const summary = document.getElementById('quiz-result-summary');
    summary.classList.remove('hidden');
    summary.className = "text-xs font-semibold text-white px-4 py-2 rounded-lg bg-slate-800 border border-slate-700";
    summary.innerHTML = `Score: <span class="text-blue-400 font-bold">${score} / ${quizQuestions.length}</span> (${percentage}%) · ${status}`;

    saveScoreToHistory(score, quizQuestions.length, percentage, status);
    renderScoreboard();
    lucide.createIcons();
}

function resetQuiz() {
    document.getElementById('quiz-form').reset();
    quizQuestions.forEach(q => {
        document.getElementById(`q-card-${q.id}`).classList.remove('border-rose-500/60', 'border-emerald-500/60');
        document.getElementById(`q${q.id}-explanation`).classList.add('hidden');
    });
    document.getElementById('quiz-result-summary').classList.add('hidden');
}

const STORAGE_KEY = 'is_acq_chapter8_quiz_history';
function getScoreHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function saveScoreToHistory(score, total, percentage, status) {
    const history = getScoreHistory();
    const now = new Date();
    history.unshift({
        attempt: history.length + 1,
        date: now.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'}),
        score: `${score} / ${total}`, percentage: `${percentage}%`, status: status
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 15)));
}

function renderScoreboard() {
    const history = getScoreHistory();
    const tbody = document.getElementById('scoreboard-body');
    if (!tbody)
        return;

    if (history.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-4 px-4 text-center text-slate-500">No past quiz attempts found. Complete the quiz above to record your score.</td></tr>`;
        return;
    }
    tbody.innerHTML = history.map((item, index) => {
        let badgeClass = item.status === 'Mastery Achieved' ? "text-emerald-400" : (item.status === 'Proficient' ? "text-blue-400" : "text-amber-400");
        return `<tr class="hover:bg-slate-900/50 transition-colors">
      <td class="py-3 px-4 text-slate-400">#${history.length - index}</td>
      <td class="py-3 px-4 text-slate-300">${item.date}</td>
      <td class="py-3 px-4 font-semibold text-white">${item.score}</td>
      <td class="py-3 px-4 font-semibold text-blue-400">${item.percentage}</td>
      <td class="py-3 px-4 font-semibold ${badgeClass}">${item.status}</td>
    </tr>`;
    }).join('');
}

function clearScoreHistory() {
    localStorage.removeItem(STORAGE_KEY);
    renderScoreboard();
}
