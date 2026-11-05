# Fiesta Signature Studio — Static Web Architecture & Deployment Plan

Comprehensive architectural specification confirming the lightweight, client-side Single Page Application (SPA) structure for Fiesta Smart Mobility's email signature generator.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Confirmed Architecture Choice**: The user confirmed keeping the application as a **lightweight static web application**. All signature generation, live client simulation, rich clipboard formatting, and HTML downloading will continue to execute client-side in the browser without requiring a backend database, server runtime, or external network services.

- **Confirmed Decision**: Pure Client-Side Static Architecture.
- **Hosting Portability**: Compiles via `npm run build` into a bundle of static assets (`index.html`, minified JavaScript, and CSS) that can be dropped into any static host (e.g. Fiesta's existing Apache/Nginx web server at `erp.fiestaindia.net`, Cloudflare Pages, Firebase Hosting, S3, or internal intranet web server).

---

## 1. Overview & Core Concept

- **What It Does**: A standalone corporate utility for Fiesta Smart Mobility staff to enter their credentials, select their office branch, and instantly generate, test, and copy email-compliant signatures for Gmail, Microsoft Outlook, and Apple Mail.
- **Target Audience**: Fiesta Smart Mobility operations staff, drivers' management team, customer booking specialists, fleet coordinators, and IT administrators.
- **Key Value**: Zero-setup, instant execution, and zero maintenance overhead. Employees can create compliant signatures in under 30 seconds without submitting personal data to external servers.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Authentication & Access Gate**:
   - Staff enter corporate credentials (`fiesta` / `FSMSmart@2025`) or click instant staff access for evaluating. Session is retained in browser `localStorage`.
2. **Signature Creation Flow**:
   - Clean, empty inputs for Full Name, Title, and Phone with standard placeholder hints.
   - Dropdown selection for the 12 national offices (including the updated Hyderabad Pioneer Plaza address) and division helpline contacts.
   - Real-time instant preview updating in the email client simulator.
3. **One-Click Export Flow**:
   - **Copy Formatted Signature**: Copies rich HTML to the OS clipboard using the native `ClipboardItem` API so users can paste (`Ctrl+V` / `Cmd+V`) directly into Gmail or Outlook.
   - **Download Signature HTML**: Generates a self-contained `.html` file containing the signature and visual instructions for opening in Chrome or Edge.
4. **Knowledge & Directory Navigation**:
   - **Setup Guides**: Interactive tabs for Gmail, Outlook Desktop, Outlook Web, and Apple Mail.
   - **Offices Directory**: National Operations Network branch directory with search, filter by region, and 1-click "Use in Signature".

### Visual Identity & Theme

- **Aesthetic Direction**: Crisp corporate utility, clean lines, and high-contrast legibility.
- **Color System**:
  - Neutral Canvas: Soft slate background (`#F8FAFC`) with pure white card surfaces (`#FFFFFF`).
  - Structural Hairlines: `border-slate-200` for subtle boundaries without heavy visual clutter.
  - Accent Color: Fiesta corporate red (`#D83A2E`) reserved for primary action CTAs and brand marks.
- **Typography**: `Plus Jakarta Sans` for clean, professional display and form labels; `JetBrains Mono` for tabular figures and telephone formatting.
- **Anti-Distraction Discipline**: Selection and pointer interactions are disabled across the live simulation preview card to prevent manual mouse dragging from copying unformatted text.

---

## 3. Key Product Decisions & Trade-Offs

- **Static Client-Side SPA vs. Database-Backed Application**:
  - *Chosen Approach*: Static SPA with local browser state (`localStorage`).
  - *Why*: Eliminates server costs, database maintenance, user management overhead, and network latency. Signatures are generated deterministically from client inputs.
  - *Trade-Off*: Employee signatures are stored on the employee's device rather than in a centralized company database. Since signatures are copied into email clients immediately upon generation, centralized database storage is unnecessary.
- **Clipboard API vs. Manual HTML Selection**:
  - *Chosen Approach*: Multi-tier clipboard copy (`ClipboardItem` with `text/html` and `text/plain`, falling back to hidden DOM range copy and raw download).
  - *Why*: Allows non-technical staff to install their signature with a single click and keyboard shortcut, bypassing manual HTML file editing.

---

## 4. Technical Architecture & Data Strategy

### System Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client Browser (Static)                         │
│                                                                        │
│  ┌───────────────────────┐             ┌────────────────────────────┐  │
│  │   Navigation & View   │             │       Session & Draft      │  │
│  │  - Signature Studio   │             │         LocalStore         │  │
│  │  - Setup Guides       │◄───────────►│  - Auth Session Token      │  │
│  │  - Offices Directory  │             │  - Signature Form Draft    │  │
│  └───────────┬───────────┘             └────────────────────────────┘  │
│              │                                                         │
│              ▼                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                     Signature Generator Core                     │  │
│  │  - Pure function: generateSignatureHtml(SignatureData)           │  │
│  │  - Strict HTML Table Markup (inline styles, Segoe UI, #D83A2E)   │  │
│  │  - ISO Certification Line + Branch Address + Direct Phone        │  │
│  └───────────┬──────────────────────────────────────────┬───────────┘  │
│              │                                          │              │
│              ▼                                          ▼              │
│  ┌────────────────────────┐             ┌───────────────────────────┐  │
│  │  Multi-Client Preview  │             │       Export Engine       │  │
│  │  - Gmail Webmail       │             │  - ClipboardItem RichCopy │  │
│  │  - Outlook Desktop     │             │  - Blob HTML Downloader   │  │
│  │  - Mobile Viewport     │             │  - Code Inspector         │  │
│  │  - Raw Isolated View   │             │                           │  │
│  └────────────────────────┘             └───────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Deployment via 'npm run build'
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Static Web Host / CDN / Fiesta ERP                    │
│             (/dist/index.html, /dist/assets/*.js, *.css)               │
└────────────────────────────────────────────────────────────────────────┘
```

### Static Build & Hosting Verification

- **Production Build Command**: `npm run build`
- **Output Artifacts**: Standard `dist/` directory containing static `index.html` and bundled client assets.
- **Serverless Execution**: Operates without server-side compute, proxy routes, or runtime environment variables.
