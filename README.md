# ResearchMate AI 🎓✨
> **Your intelligent academic research paper assistant.**

An autonomous, multi-stage AI research platform powered by **Google Gemini API**, built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

ResearchMate AI bridges the divide between open-ended conversational LLMs and rigorous academic research workflows. It takes a research topic or problem statement and guides it through an autonomous, 6-stage scholarly pipeline—performing deep topic scoping, structured planning with 5 core research questions (RQ1–RQ5), verified academic literature sourcing with Google Search grounding, 9-section scholarly paper synthesis, independent peer-review quality auditing, and multi-format file export (JSON & TXT).

---

## 🎯 Problem Statement

Traditional generative AI models often suffer from structural drift, factual hallucinations, and superficial literature citations when tasked with producing academic research papers:
* **Monolithic Hallucinations**: Standard LLM prompts generate fictional authors, broken DOI links, and non-existent paper titles.
* **Lack of Multi-Stage Scoping**: Academic papers require methodical progression: hypothesis formulation, literature review taxonomy, experimental/empirical methodology, and critical discussion.
* **Absence of Peer-Review Auditing**: Raw LLM outputs rarely undergo automated verification checks for section completeness, topical relevance, factual grounding, and prose repetition.
* **Unstructured Output Formats**: Researchers and developers need standardized, machine-readable JSON telemetry alongside human-readable plain text documents.

**ResearchMate AI solves this** by orchestrating a dedicated, multi-step agent workflow with few-shot prompting templates, non-hallucinatory Google Search grounding, and automated quality certification.

---

## 🌟 Features

* **Modern Academic Platform UI**:
  * Clean white aesthetic with academic blue accents (`#f0f7ff` to `#082749`) and serif typography.
  * Research topic input with live character counter, keyboard shortcut (`Ctrl + Enter`), and 1-click test prompts.
  * **Academic Level Selector**: Tailored depth for **Beginner** (*Foundational*), **Undergraduate** (*Analytical*), and **Postgraduate** (*Doctoral / Advanced*).
* **6-Stage Autonomous AI Research Agent**:
  * **Stage 1 (Topic Analysis)**: Domain boundaries, primary objectives, theoretical paradigms, and core concept definitions.
  * **Stage 2 (Research Planning)**: Formulates **EXACTLY 5 core research questions (RQ1–RQ5)**, keywords, and a 5-part outline.
  * **Stage 3 (Source Research)**: Google Search grounding with Gemini; collects real authors, publication years, canonical DOIs/URLs, and explicit `verificationStatus` tags.
  * **Stage 4 (Paper Generation)**: Synthesizes a full academic manuscript across all 9 standard sections.
  * **Stage 5 (Quality Verification)**: Automated peer review auditing completeness (9/9 sections), topical relevance (0–100), reference support, factual claims, and repetition.
  * **Stage 6 (Final Output & Export)**: Delivers validated deliverables.
* **Few-Shot Prompting Engine**:
  * Dedicated prompt template (`lib/prompts/researchPrompt.ts`) with Example 1 (*AI in Healthcare*) and Example 2 (*Renewable Energy*).
  * Strict anti-hallucination and non-contamination guardrails.
* **Real-time Progress Indicator**:
  * Server-Sent Events (SSE) streaming with live progress bar percentage (0% ➔ 100%), elapsed timer, and live intermediate output cards.
* **Results Dashboard with Separate Dedicated Sections**:
  * Distinct cards for **Abstract & Keywords**, **1. Introduction**, **2. Literature Review**, **3. Research Methodology**, **4. Findings and Discussion**, **5. Conclusion**, and **References**.
  * Sticky Table of Contents on desktop with 1-click jump navigation.
* **Comprehensive Export Functionality**:
  * 📄 **Download TXT**: Complete plain text paper with ASCII dividers, metadata, and peer review certificate.
  * 💾 **Download JSON**: Validated machine-readable JSON object with 12 core schema keys.
  * 📋 **Copy Paper**: Full-text clipboard copy with instant visual confirmation.
  * 🔄 **Generate Again & Refine Topic**: Re-run the agent with modified parameters.
  * 🖨️ **Print / PDF**: Browser-native print stylesheet for formatted academic papers.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with Academic Blue Palette |
| **AI Integration** | [Google Generative AI SDK](https://www.npmjs.com/package/@google/generative-ai) (`@google/generative-ai`) |
| **Models Supported** | `gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-1.5-pro` (auto-fallback) |
| **Grounding** | Google Search Grounding with Gemini |
| **Streaming** | Server-Sent Events (SSE) via `ReadableStream` / `TransformStream` |
| **Export Routes** | Client-Side Blobs & Server API `/api/export` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Runtime** | Node.js (v18+ or v20+) |

---

## 🤖 AI Agent Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                 RESEARCHMATE AI AGENT PIPELINE              │
├─────────────────────────────────────────────────────────────┤
│  STEP 1: TOPIC ANALYSIS                                     │
│  ↳ Scopes domain boundaries, primary objectives & concepts  │
├─────────────────────────────────────────────────────────────┤
│  STEP 2: RESEARCH PLANNING (Few-Shot Prompted)              │
│  ↳ Formulates 5 core research questions (RQ1-RQ5) & outline │
├─────────────────────────────────────────────────────────────┤
│  STEP 3: SOURCE RESEARCH                                    │
│  ↳ Google Search grounding; collects titles, authors, DOIs  │
├─────────────────────────────────────────────────────────────┤
│  STEP 4: PAPER GENERATION (Few-Shot Prompted)               │
│  ↳ Synthesizes complete 9-section publication manuscript     │
├─────────────────────────────────────────────────────────────┤
│  STEP 5: QUALITY CHECK                                      │
│  ↳ Audits sections, relevance, reference support & repetition│
├─────────────────────────────────────────────────────────────┤
│  STEP 6: FINAL OUTPUT & EXPORT                              │
│  ↳ Formats structured JSON and readable TXT deliverables    │
└─────────────────────────────────────────────────────────────┘
```

1. **Step 1: Topic Analysis (`step1-topic-analysis.ts`)**: Deconstructs topic scope, domain boundaries, primary objectives, and core concepts.
2. **Step 2: Research Planning (`step2-research-planning.ts`)**: Formulates research objectives, 5 substantive research questions (RQ1–RQ5), scholarly keywords, and a 5-part outline.
3. **Step 3: Source Research (`step3-source-research.ts`)**: Queries reliable academic sources using Google Search grounding. Collects title, author, year, canonical URL/DOI, and relevance without fabrication.
4. **Step 4: Paper Generation (`step4-paper-generation.ts`)**: Generates all 9 academic sections (Title, Abstract, Keywords, Intro, Lit Review, Methodology, Findings, Conclusion, References).
5. **Step 5: Quality Check (`step5-quality-check.ts`)**: Evaluates section completeness, scores topical relevance (0–100), checks reference support, verifies factual assertions, and scores prose repetition.
6. **Step 6: Output & Export (`export-utils.ts` & `route.ts`)**: Assembles structured JSON and readable plain text formats.

---

## 💡 Few-Shot Prompting Explanation

To maximize structural consistency, academic rigor, and schema adherence, ResearchMate AI uses a dedicated prompt template:
* **Template Location**: [`lib/prompts/researchPrompt.ts`](file:///c:/Users/Sourabh%20Singh/Desktop/researchmate_AI/src/lib/prompts/researchPrompt.ts)

### Demonstrated Few-Shot Examples

#### Example 1: Artificial Intelligence in Healthcare
* **Input Topic**: `Artificial Intelligence in Healthcare`
* **Expected Output Structure**:
  * **Objectives**: Analyze the impact of AI on healthcare; evaluate clinical integration hurdles, data privacy, and limitations; synthesize decision-support pathways.
  * **5 Research Questions**:
    * *RQ1*: How does AI improve clinical diagnosis and patient outcome accuracy across acute hospital settings?
    * *RQ2*: What are the primary technical and computational limitations hindering clinical adoption?
    * *RQ3*: What data privacy, algorithmic bias, and ethical dilemmas arise when deploying autonomous diagnostic models?
    * *RQ4*: How do clinical practitioners evaluate and validate predictive uncertainty in AI-assisted triage pipelines?
    * *RQ5*: What regulatory and institutional frameworks best ensure long-term patient safety in AI-mediated healthcare?
  * **Keywords**: *Artificial Intelligence*, *Healthcare*, *Diagnosis*, *Clinical Decision Support*, *Deep Learning*, *Medical Informatics*.
  * **Academic Outline**: 5 structured stages covering Introduction, Literature Review, Clinical Methodology, Findings & Discussion, and Conclusion.

#### Example 2: Renewable Energy and Climate Change
* **Input Topic**: `Renewable Energy and Climate Change`
* **Expected Output Structure**:
  * **Objectives**: Examine how renewable energy contributes to reducing climate change; quantify grid intermittency and battery storage trade-offs; synthesize policy levers.
  * **5 Research Questions**:
    * *RQ1*: What are the quantifiable benefits of high-penetration renewable integration on regional emissions?
    * *RQ2*: What are the implementation challenges and grid stability bottlenecks confronting intermittent solar and wind?
    * *RQ3*: How do battery energy storage systems (BESS) modulate peak generation volatility?
    * *RQ4*: What economic, regulatory, and infrastructural hurdles impede utility-scale clean energy transitions?
    * *RQ5*: What strategic policy paradigms best harmonize private capital with public carbon mandates?
  * **Keywords**: *Renewable Energy*, *Climate Change*, *Sustainability*, *Decarbonization*, *Grid Stability*, *Battery Energy Storage Systems*.
  * **Academic Outline**: 5 structured stages covering Decarbonization Mandate, Technology Literature, Grid Simulation Methodology, Empirical Findings, and Policy Roadmaps.

### Prompting Guardrails
1. **Structural Demonstration Only**: Examples serve strictly to model JSON schema adherence, scholarly tone, and question depth.
2. **Anti-Hallucination & Non-Contamination**: Gemini is explicitly instructed to never treat example content as factual evidence and never copy or cross-contaminate user topics with example text.

---

## 📸 Screenshots & Interface Previews

### 1. Modern Landing Page & Input Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ResearchMate AI                [Configure Gemini API Key]  [Gemini 2.5]    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                ✦ Autonomous Scholarly AI Platform • Gemini 2.5              │
│                           ResearchMate AI                                   │
│                 Your intelligent research paper assistant                   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Research Topic or Problem Statement                                   │  │
│  │ ┌───────────────────────────────────────────────────────────────────┐ │  │
│  │ │ e.g. Decentralized Renewable Microgrids and Grid Stability        │ │  │
│  │ │ Using Reinforcement Learning...                                   │ │  │
│  │ └───────────────────────────────────────────────────────────────────┘ │  │
│  │                                                                       │  │
│  │ Academic Level Selector:                                              │  │
│  │ [ 📘 Beginner ]      [ 🎓 Undergraduate ]     [ 🏆 Postgraduate ]     │  │
│  │                                                                       │  │
│  │ [✦ Generate Research Paper →                                       ]  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Multi-Stage Agent Progress Tracker
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Stage 4 of 5  ●●●●○ [=====================>     ] 75% Complete   00:12     │
├─────────────────────────────────────────────────────────────────────────────┤
│  ✓ 1. Topic Analysis          [Domain: Systems Engineering & Decentralized] │
│  ✓ 2. Research Planning       [5 Core Questions Formulated (RQ1–RQ5)]       │
│  ✓ 3. Source Research         [5 Verified Sources with Canonical DOIs]      │
│  ⚡ 4. Paper Generation        [Synthesizing 9 Scholarly Sections...]        │
│  ○ 5. Quality Verification    [Queued for Peer Review Audit]                │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3. Results Dashboard & Separate Sections
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Investigating Decentralized Renewable Microgrids...                        │
│  Dr. Alex R. Sterling, Ph.D. • Prof. Elena M. Vance, D.Sc.                  │
│  [Postgraduate] [IEEE] [Audit: 95/100 EXCELLENT]       ~1,263 words • 7 min │
├─────────────────────────────────────────────────────────────────────────────┤
│  [Download TXT]  [Download JSON]  [Copy Paper]  [Generate Again]  [Print]   │
├───────────────────────────────┬─────────────────────────────────────────────┤
│  SECTIONS                     │  ABSTRACT                                   │
│  • Abstract & Keywords        │  This paper presents an extensive           │
│  • 1. Introduction            │  investigation into decentralized...        │
│  • 2. Literature Review       │                                             │
│  • 3. Research Methodology    │  1. INTRODUCTION                            │
│  • 4. Findings & Discussion   │  In contemporary scholarly and technical... │
│  • 5. Conclusion              │                                             │
│  • References (5 Citations)   │  2. LITERATURE REVIEW                       │
│                               │  The theoretical lineage of microgrids...   │
└───────────────────────────────┴─────────────────────────────────────────────┘
```

---

## 💾 Sample Output Files

Verified sample output files are included in the repository:
* **JSON Deliverable**: [`sample_output/research_paper.json`](sample_output/research_paper.json) (22 KB valid JSON with all 12 schema keys)
* **TXT Deliverable**: [`sample_output/research_paper.txt`](sample_output/research_paper.txt) (15 KB formatted plain text manuscript)

---

## 🚀 Installation & Setup Instructions

### 1. Prerequisites
- **Node.js**: `v18.17.0` or higher (recommended: Node 20 or 24)
- **npm**: `v9.0.0` or higher
- A **Google Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey) *(free tier available)*.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/researchmate_AI.git
cd researchmate_AI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the example environment template:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Security Note**: Never commit `.env.local` or your API key. `.env.local` is excluded in `.gitignore`. You can also enter the API key directly in the web UI via the header modal.

---

## 💻 How to Run the Project

### Run in Development Mode
```bash
npm run dev
```
Open your browser and navigate to **`http://localhost:3000`**.

### Build and Run for Production
```bash
# 1. Compile optimized production build
npm run build

# 2. Start production server
npm run start
```
The application will be served at **`http://localhost:3000`**.

---

## 🧪 Verification & Automated Testing

To run the verification suite and test all 12 core system requirements:
```bash
# Verify build & type validity
npm run build

# Test paper generation via API
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Quantum Computing in Cryptography", "academicLevel": "Postgraduate"}'
```

---

## 📄 License
This project is open-source and released under the **MIT License**.
