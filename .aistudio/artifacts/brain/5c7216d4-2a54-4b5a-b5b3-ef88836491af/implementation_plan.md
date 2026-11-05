# Staff Portal Password Configuration & Maintenance Guide

A clear, step-by-step developer and administrator guide detailing where and how to change the staff login password in the Fiesta Signature Studio codebase without requiring complex backend infrastructure.

## User Review & Critical Decisions

> [!IMPORTANT]
> The user confirmed the following preferences via clarifying questions:
> - **Password Management Method**: Explain where and how to edit the credentials directly in the codebase configuration file.
> - **Current Password Status**: Keep the existing password (`FSMSmart@2025`) active for now, with explicit guidance and inline comments so IT staff can update it at any time.

- **Confirmed Decision 1**: Store the primary staff credentials in the centralized configuration module (`src/data/fiestaConfig.ts`).
- **Confirmed Decision 2**: Document exact line numbers, syntax rules, and rebuild steps for deployment.

---

### 1. Overview & Core Concept

- **What It Does**: Fiesta Signature Studio is a lightweight static web app designed for internal staff. Authentication is enforced client-side via a credential check against corporate constants before granting access to generator controls.
- **Target Audience / Administrator**: Fiesta Smart Mobility IT administrators (`it@fiestaindia.net`) and internal staff members generating official email signatures.
- **Key Value**: Zero-dependency credential updates that can be edited in a single line of code and instantly re-deployed to static hosting (Netlify, Vercel, GitHub Pages, Firebase Hosting, or Cloudflare Pages) without database migrations or backend downtime.

---

### 2. Password Location & Update Walkthrough

#### Step-by-Step Instructions to Change the Password

1. **Open the Configuration File**:
   - File location: `src/data/fiestaConfig.ts`
   
2. **Locate the Staff Credentials Section**:
   Near lines 3–4 of `src/data/fiestaConfig.ts`, you will find:
   ```typescript
   export const VALID_USERNAME = 'fiesta';
   export const VALID_PASSWORD = 'FSMSmart@2025';
   ```

3. **Change the Values**:
   - Replace `'FSMSmart@2025'` with your desired new corporate password.
   - If desired, you can also change the username `'fiesta'`.
   - Ensure the string is enclosed in single or double quotes without spaces unless intended.

4. **Deploy / Build**:
   - For local development: Vite reloads immediately upon saving the file.
   - For production deployment: Run `npm run build` to generate the updated static distribution files in the `dist/` directory.

---

### 3. Key Product Decisions & Trade-Offs

- **Static Configuration vs. Backend Authentication Database**:
  - *Chosen Approach*: Lightweight client-side configuration constants in `src/data/fiestaConfig.ts` coupled with persistent session tokens in browser `localStorage`.
  - *Why*: Keeps the application 100% static, fast, zero-maintenance, and cost-free to host without server cold starts or database licensing fees.
  - *Alternatives Considered*: Firebase Auth or Cloud SQL database. Passed over because the app has been confirmed as a lightweight static utility with no user-specific roles or confidential employee databases.

---

### 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                 src/data/fiestaConfig.ts                    │
│                                                             │
│   export const VALID_USERNAME = 'fiesta';                   │
│   export const VALID_PASSWORD = 'FSMSmart@2025';            │
└──────────────────────────────┬──────────────────────────────┘
                               │ Imports credentials
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                src/components/LoginModal.tsx                │
│                                                             │
│   • Validates entered credentials                           │
│   • On Match: calls onLoginSuccess()                        │
│   • On Mismatch: displays inline error banner               │
└──────────────────────────────┬──────────────────────────────┘
                               │ Sets session
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      src/App.tsx                            │
│                                                             │
│   • Saves 'fiesta_auth_session' in localStorage             │
│   • Unlocks full signature generator interface              │
└─────────────────────────────────────────────────────────────┘
```

#### Verification & Safety Checklist
- [x] Verify current `VALID_USERNAME` and `VALID_PASSWORD` values in `src/data/fiestaConfig.ts`.
- [x] Confirm `LoginModal.tsx` contains no hardcoded fallback strings.
- [x] Ensure `compile_applet` and `lint_applet` pass without errors.
