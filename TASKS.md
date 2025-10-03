# NextYou - Hackathon Tasks Tracker

**Project:** AI-Powered Fitness Projection System
**Timeline:** 4 hours
**Repository:** https://github.com/karanivincent/nextyou
**Status:** 🔄 In Progress (Phase 2/5)

---

## 📊 Overall Progress: 20% Complete

- ✅ Phase 1: Setup (100%)
- 🔄 Phase 2: Core Components (0%)
- ⏳ Phase 3: Form Pages (0%)
- ⏳ Phase 4: API Integration (0%)
- ⏳ Phase 5: Testing & Polish (0%)

---

## Phase 1: Project Setup ✅ COMPLETE

**Time Allocated:** 15 minutes | **Time Spent:** ~20 minutes

- [x] Initialize SvelteKit project with TypeScript
- [x] Install and configure Tailwind CSS v3
- [x] Add mobile-first viewport meta tags
- [x] Create TypeScript types (`src/lib/types.ts`)
- [x] Create Svelte store (`src/lib/stores/formData.ts`)
- [x] Initialize Git repository
- [x] Create GitHub repository
- [x] Push initial commit
- [x] Update PRD with timeframe step (11 total steps)

**Deliverables:**
- ✅ Dev server running at http://localhost:5173/
- ✅ GitHub repo: https://github.com/karanivincent/nextyou
- ✅ PRD.md updated with 11-step flow

---

## Phase 2: Core Components 🔄 CURRENT

**Time Allocated:** 70 minutes | **Time Spent:** 0 minutes

### Component Checklist (5 components)

#### 1. PrimaryButton.svelte
- [ ] Create component file
- [ ] Implement blue button with Tailwind
- [ ] Add loading state (spinner)
- [ ] Add disabled state
- [ ] Mobile-friendly (min-h-14, full-width)
- [ ] Props: `label`, `onClick`, `disabled`, `loading`
- [ ] Test in isolation

**Estimated:** 10 minutes

#### 2. SelectionButton.svelte
- [ ] Create component file
- [ ] Active/inactive states
- [ ] Blue background when selected
- [ ] White/border when unselected
- [ ] Full-width, rounded corners
- [ ] Props: `label`, `value`, `selected`, `onClick`
- [ ] Test with multiple buttons

**Estimated:** 10 minutes

#### 3. SliderInput.svelte
- [ ] Create component file
- [ ] Range input (1-10)
- [ ] Blue handle and track
- [ ] Large value display (text-5xl)
- [ ] Touch-friendly handle (h-6 w-6)
- [ ] Min/max labels
- [ ] Props: `label`, `value`, `min`, `max`, `onChange`
- [ ] Test slider interaction

**Estimated:** 15 minutes

#### 4. ImageUpload.svelte
- [ ] Create component file
- [ ] Dashed border placeholder
- [ ] Camera/gallery icon
- [ ] File input with `accept="image/*" capture="environment"`
- [ ] Image preview after upload
- [ ] Base64 conversion
- [ ] File validation (size, format)
- [ ] Compression for large files
- [ ] Props: `onImageSelect`, `maxSizeMB`, `acceptedFormats`
- [ ] Test camera access on mobile

**Estimated:** 20 minutes

#### 5. StepLayout.svelte
- [ ] Create component file
- [ ] Progress bar at top
- [ ] Title and subtitle slots
- [ ] Content area (flexible slot)
- [ ] Bottom button (uses PrimaryButton)
- [ ] Mobile-first layout (min-h-screen)
- [ ] Safe area padding
- [ ] Props: `currentStep`, `totalSteps`, `title`, `subtitle`, `onNext`, `nextDisabled`
- [ ] Test with sample content

**Estimated:** 15 minutes

**Phase 2 Deliverables:**
- [ ] All 5 components created in `src/lib/components/`
- [ ] Components tested individually
- [ ] Git commit: "Add core reusable components"

---

## Phase 3: Form Pages ⏳ PENDING

**Time Allocated:** 60 minutes

### Main Form Implementation

- [ ] Create step navigation state (currentStep)
- [ ] Build 11-step form in `src/routes/+page.svelte`
- [ ] Step 1: Age selection
- [ ] Step 2: Gender selection
- [ ] Step 3: Training frequency
- [ ] Step 4: Set timeframe
- [ ] Step 5: Training style
- [ ] Step 6: Workout intensity
- [ ] Step 7: Nutrition goal
- [ ] Step 8: Sleep quality slider
- [ ] Step 9: Stress level slider
- [ ] Step 10: Photo upload
- [ ] Step 11: Processing/loading state
- [ ] Connect all steps to Svelte store
- [ ] Add form validation per step
- [ ] Add "Next" button logic
- [ ] Test navigation forward/backward (optional)

**Phase 3 Deliverables:**
- [ ] Working multi-step form
- [ ] All data stored in formData store
- [ ] Validation working per step
- [ ] Git commit: "Complete multi-step form UI"

---

## Phase 4: API Integration ⏳ PENDING

**Time Allocated:** 40 minutes

### Backend & Integration

- [ ] **Coordinate with team:**
  - [ ] Get API endpoint URL
  - [ ] Confirm request/response format
  - [ ] Get API keys (if needed)
  - [ ] Confirm expected response time

- [ ] Create API endpoint (`src/routes/api/generate/+server.ts`)
- [ ] Implement request payload construction
- [ ] Add fetch call to team's AI API
- [ ] Handle loading states
- [ ] Handle API errors
- [ ] Parse response (URL or base64)
- [ ] Navigate to results page on success

### Results Page

- [ ] Create `src/routes/results/+page.svelte`
- [ ] Display original vs generated image
- [ ] Side-by-side or before/after slider
- [ ] Download button (optional)
- [ ] Share button (optional)
- [ ] "Try Again" button

**Phase 4 Deliverables:**
- [ ] API proxy endpoint working
- [ ] Results page displaying images
- [ ] End-to-end flow complete
- [ ] Git commit: "Add API integration and results page"

---

## Phase 5: Testing & Polish ⏳ PENDING

**Time Allocated:** 30 minutes

### Mobile Testing

- [ ] Test on Chrome DevTools mobile view
- [ ] Test on actual iPhone
- [ ] Test on actual Android device
- [ ] Verify all touch targets ≥ 44px
- [ ] Test camera upload on mobile
- [ ] Test in portrait orientation
- [ ] Check safe area on notched devices

### Error Handling

- [ ] Network errors display user-friendly message
- [ ] API timeout shows retry option
- [ ] Invalid image shows clear error
- [ ] Form validation errors are visible
- [ ] Offline detection (optional)

### Final Polish

- [ ] Loading spinners on all async operations
- [ ] Smooth transitions between steps
- [ ] Fix any UI bugs
- [ ] Cross-browser test (Safari, Chrome, Firefox)
- [ ] Performance check (Lighthouse)
- [ ] Final git commit: "Production ready"

**Phase 5 Deliverables:**
- [ ] Tested on real devices
- [ ] All errors handled gracefully
- [ ] Demo-ready application
- [ ] Final git push to GitHub

---

## 🚀 Deployment (Bonus - Time Permitting)

- [ ] Deploy to Vercel/Netlify
- [ ] Update README with live URL
- [ ] Test live deployment
- [ ] Share demo link

---

## 📝 Team Coordination Checklist

**Questions for AI/Backend Team:**

- [ ] What is your API endpoint URL?
- [ ] What is the exact request JSON format?
- [ ] What is the exact response JSON format?
- [ ] Do we need API keys? If yes, how to include them?
- [ ] What is the expected response time (timeout setting)?
- [ ] Will you return image URL or base64?
- [ ] Any rate limits we should know about?

---

## 🎯 Success Criteria

### Must Have (MVP)
- [x] Project setup complete
- [ ] All 5 components working
- [ ] 11-step form functional
- [ ] Data stored in Svelte store
- [ ] Photo upload working
- [ ] API integration complete
- [ ] Results page displays generated image
- [ ] Mobile-friendly UI

### Nice to Have
- [ ] Smooth animations
- [ ] Before/after slider on results
- [ ] Download generated image
- [ ] Back button navigation
- [ ] Live deployment
- [ ] Error retry logic

### Demo Ready
- [ ] Works on mobile device
- [ ] No console errors
- [ ] Loading states visible
- [ ] Error messages clear
- [ ] Completes full flow in < 2 minutes

---

## 📌 Quick Links

- **PRD:** [PRD.md](./PRD.md)
- **Repository:** https://github.com/karanivincent/nextyou
- **Dev Server:** http://localhost:5173/
- **Figma Mockups:** (Reference images in repo)

---

## 💡 Notes & Blockers

### Current Blockers:
- None

### Team Notes:
- Timeframe step added (Step 4)
- Using Tailwind CSS v3 for compatibility
- Vite v6 for stable builds
- Mobile-first approach (375px base width)

### Key Decisions:
- Primary blue color: `#3B82F6`
- Minimum touch target: `44px`
- Default sleep/stress values: `5`
- Image max size: `5MB`

---

**Last Updated:** 2025-10-03
**Next Update:** After completing Phase 2 components
