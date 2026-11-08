# Header Brand Lockup: VAC with Subtitle Meaning

Update the global sticky navigation header brand mark so that **VAC** serves as the prominent primary title, with its expansion **virtually ask cath** positioned directly underneath.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following structure and styling decisions were confirmed:

- **Primary Title**: **VAC** in bold uppercase using the modern creator heading font (`font-heading font-extrabold tracking-tight`).
- **Subtitle Below**: **virtually ask cath** in lowercase, high-readability muted charcoal (`#4A3B35`) with hover accent transition.
- **Scope & Preservation**: Updates the top navigation bar brand mark without affecting founder attribution in the hero, personal letter, credentials, or footer where "Cathy Mae Zamora" continues to represent the consultancy founder and operations lead.

---

## 1. Overview & Core Concept

- **What It Does**: Refines the top-left navigation wordmark from `cathy mae zamora` over `vac · virtually ask cath` into a bold, clean agency lockup: **VAC** on top with **virtually ask cath** directly beneath it.
- **Visual Balance**: Aligns with the 3-zone top bar contract, maintaining clean vertical hierarchy, smooth hover transitions (`group-hover:text-[#EF516F]`), and zero horizontal overflow across viewport sizes.

---

## 2. User Experience & Visual Design

- **Desktop & Mobile Navigation Bar**:
  ```
  ┌────────────────────────────────────────────────────────────────────────┐
  │  VAC                         [about  expertise  team ... ]  [BOOK CALL]│
  │  virtually ask cath                                                    │
  └────────────────────────────────────────────────────────────────────────┘
  ```
- **Typography & Styling**:
  - Top title: `text-xl sm:text-2xl font-extrabold tracking-tight text-[#1A110D] font-heading uppercase group-hover:text-[#EF516F] transition-colors`
  - Subtitle: `text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#4A3B35] lowercase mt-0.5 group-hover:text-[#EF516F]/80 transition-colors`

---

## 3. Key Product Decisions & Trade-Offs

- **Decision: Agency Lockup vs Founder Name in Header**
  - *Chosen Approach*: Display uppercase **VAC** as primary brand title in header nav with **virtually ask cath** below.
  - *Why*: Establishes immediate institutional recognition for the agency name while retaining founder authority across all contextual body sections (hero photo matting, letter, credentials, and legal registration).
  - *Alternatives Considered*: Stacking three lines (Cathy Mae Zamora / VAC / meaning); rejected as it causes vertical bloat inside the sticky 80px navigation bar.

---

## 4. Technical Architecture & Verification

- **Component**: `src/App.tsx` sticky header brand anchor (`<a href="#" className="flex flex-col group leading-tight">`).
- **Verification Protocol**:
  - Run `compile_applet` and `lint_applet` together to verify 0 errors.
  - Restart dev server to verify crisp typography rendering.
