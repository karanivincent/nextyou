# NextYou - Product Requirements Document (Hackathon Edition)

## 1. Product Overview

**NextYou** is an AI-powered fitness projection system that transforms user photos and fitness metrics into realistic projections showing future physique changes.

**Hackathon Scope:**
- Simple multi-step form for user input collection
- Pass data to external calculation/prompt API (handled by other team)
- Display AI-generated result
- **Time constraint:** Few hours only

---

## 2. User Flow (Simplified)

### 2.1 Onboarding Steps

Based on mockup design:

1. **Age** - Select range (young/adult/midage/older)
2. **Gender** - Select (Male/Female/Other)
3. **Training Frequency** - Sessions/week (1-2, 3, 4-5, 6+)
4. **Set your timeframe** - Select duration (weeks/months)
5. **Training Style** - Type (Cardio/Strength/Hybrid)
6. **Workout Intensity** - Level (Light/Moderate/Intense)
7. **Nutrition Goal** - (Fat loss/Maintenance/Muscle gain)
8. **Sleep Quality** - 1-10 slider
9. **Stress Level** - 1-10 slider
10. **Upload Photo** - Image upload
11. **Results** - View generated projection

### 2.2 UI Requirements
- **Mobile-first design** (primary target: iPhone-sized screens)
- Progress indicator
- Blue "Next" buttons
- Clean, minimal screens
- Basic validation
- Touch-friendly tap targets (min 44px)
- Single-column layout
- Full-width buttons

---

## 3. External Dependencies (Other Team)

**NOT our responsibility - handled by other team members:**
- ✅ Calculation formulas (BI, TI, RI)
- ✅ Prompt generation for Nano Banana AI
- ✅ AI API integration

**Our job:** Collect inputs and pass them to their API endpoint

---

## 4. Technical Architecture (Simplified)

### 4.1 Technology Stack

**Frontend:**
- **SvelteKit** - Multi-step form UI
- **Tailwind CSS** - Mobile-first styling (fast setup)
  - Mobile breakpoint (default): 0-640px
  - Tablet breakpoint (sm:): 640px+
  - Desktop breakpoint (md:): 768px+ (optional)

**Backend:**
- **SvelteKit API routes** - Proxy to team's AI API

**No Storage Needed:**
- Images handled in-memory/temp only
- No persistence for hackathon

**Mobile-First Approach:**
- Design for 375px width (iPhone SE/12/13 mini)
- Scale up for larger screens if time permits
- Test on actual mobile devices

### 4.2 Project Structure (Minimal)

```
nextyou/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Multi-step form
│   │   ├── results/+page.svelte  # Results display
│   │   └── api/
│   │       └── generate/+server.ts  # Proxy to team's API
│   ├── lib/
│   │   ├── components/
│   │   │   ├── FormStep.svelte   # Reusable step component
│   │   │   └── ImageUpload.svelte
│   │   ├── stores/
│   │   │   └── formData.ts       # Svelte store
│   │   └── types.ts
│   └── app.css
└── package.json
```

### 4.3 Data Flow (Simple)

```
1. User fills out multi-step form
   └─> Data stored in Svelte store

2. User uploads photo
   └─> Convert to base64

3. Submit all data
   └─> POST to /api/generate (our endpoint)
       └─> Forwards to team's AI API
       └─> Wait for response

4. Display result
   └─> Show generated image
```

### 4.4 Component Architecture

Based on Figma mockup analysis, here are the reusable components:

#### Core Reusable Components (5 total)

**1. `StepLayout.svelte` - Master Layout Wrapper**
- Progress bar at top (e.g., "2/13")
- Title text (large, bold)
- Subtitle/description text (smaller, gray)
- Content slot (flexible, centered)
- Blue "Next" button at bottom (full-width on mobile)
- Consistent padding (px-6 on mobile)
- Min-height to prevent layout shift
- **Used by:** All 9 input steps

**Props:**
```typescript
{
  currentStep: number,
  totalSteps: number,
  title: string,
  subtitle?: string,
  onNext: () => void,
  nextDisabled?: boolean
}
```

**Mobile-First Styling:**
- Full viewport height
- Vertical flex layout
- Bottom button fixed/sticky
- Safe area padding for notched devices

**2. `SelectionButton.svelte` - Category Selection**
- Button with active/inactive states
- Blue background when selected (#3B82F6 or similar)
- White background when unselected (border)
- Rounded corners (rounded-2xl)
- **Touch-friendly size:** min-h-14, min-w-full
- Vertical stacking on mobile
- **Used by:** Age, Gender, Frequency, Style, Intensity, Nutrition (6 steps)

**Props:**
```typescript
{
  label: string,
  value: string,
  selected: boolean,
  onClick: (value: string) => void
}
```

**Mobile-First Styling:**
- Full width buttons (w-full)
- Stack vertically (flex-col gap-3)
- Large text (text-base or text-lg)
- Adequate padding (py-4)

**3. `SliderInput.svelte` - Numeric Range Input**
- 1-10 scale slider
- Blue handle and active track (#3B82F6)
- Gray inactive track
- Labels showing min (1) and max (10)
- Large current value display (centered above slider)
- **Touch-friendly:** Large handle (h-6 w-6 minimum)
- **Used by:** Sleep quality, Stress level (2 steps)

**Props:**
```typescript
{
  label: string,
  value: number,
  min: number,
  max: number,
  onChange: (value: number) => void
}
```

**Mobile-First Styling:**
- Full width slider (w-full)
- Large touch target for handle
- Big value text (text-4xl or text-5xl)
- Ample vertical spacing

**4. `ImageUpload.svelte` - Photo Upload**
- Dashed border placeholder state (border-2 border-dashed)
- Large camera/gallery icon
- **Mobile camera access:** Use `capture="environment"` for camera
- File input handling
- Image preview after selection (full-width, rounded)
- Base64 conversion
- File size/type validation
- Compression for large images
- **Used by:** Upload photo screens (3 screens)

**Props:**
```typescript
{
  onImageSelect: (base64: string) => void,
  maxSizeMB?: number,
  acceptedFormats?: string[]
}
```

**Mobile-First Styling:**
- Square aspect ratio on mobile (aspect-square)
- Full width (w-full)
- Large tap target (min-h-64)
- Native camera integration
- Show file name after upload

**5. `PrimaryButton.svelte` - Blue CTA Button**
- Rounded blue button (#3B82F6, rounded-full)
- White text (font-semibold)
- Loading spinner state (white spinner)
- Disabled state (opacity-50, cursor-not-allowed)
- **Touch-friendly:** min-h-14 (56px)
- Full-width on mobile
- Haptic feedback on tap (if supported)
- **Used by:** All screens + Results

**Props:**
```typescript
{
  label: string,
  onClick: () => void,
  disabled?: boolean,
  loading?: boolean
}
```

**Mobile-First Styling:**
- Full width (w-full)
- Large text (text-lg)
- Adequate padding (py-4 px-8)
- Fixed to bottom on mobile (optional)
- Active/pressed states

#### Component Hierarchy

```
App
├── WelcomeScreen (optional splash)
├── MainForm (+page.svelte)
│   └── StepLayout (reused for each step)
│       ├── ProgressBar (built-in)
│       ├── Content Area (slot)
│       │   ├── SelectionButton[] (Age, Gender, Frequency, etc.)
│       │   ├── SliderInput (Sleep, Stress)
│       │   └── ImageUpload (Photo)
│       └── PrimaryButton (built-in)
└── ResultsScreen (results/+page.svelte)
    ├── Before/After Images
    └── PrimaryButton (Download/Share)
```

#### Updated Project Structure

```
nextyou/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Multi-step form
│   │   ├── results/+page.svelte  # Results display
│   │   └── api/
│   │       └── generate/+server.ts
│   ├── lib/
│   │   ├── components/
│   │   │   ├── StepLayout.svelte       # ⭐ Master layout
│   │   │   ├── SelectionButton.svelte  # ⭐ Category picker
│   │   │   ├── SliderInput.svelte      # ⭐ Range slider
│   │   │   ├── ImageUpload.svelte      # ⭐ Photo upload
│   │   │   └── PrimaryButton.svelte    # ⭐ CTA button
│   │   ├── stores/
│   │   │   └── formData.ts
│   │   └── types.ts
│   └── app.css
└── package.json
```

#### Implementation Benefits

**1. DRY Principle (Don't Repeat Yourself)**
- `StepLayout` eliminates 90% of repetition across 9 similar screens
- Change layout once, affects all steps

**2. Consistent UX**
- All buttons behave identically
- Sliders have same look and feel
- Navigation patterns are predictable

**3. Easy Styling**
- Update button color in one place
- Tailwind classes centralized
- Mockup fidelity maintained

**4. Fast Development**
- Build 5 components once
- Compose 9 screens quickly
- Less code = fewer bugs

**5. Maintainable**
- Bug fix in component fixes all instances
- Easy to add new steps if needed
- Clear separation of concerns

**Time Savings Estimate:** 50% faster than building each screen individually

---

## 5. API Integration

### 5.1 Our Proxy Endpoint

**POST** `/api/generate`

```typescript
// What we send to team's API
{
  age: string,
  gender: string,
  frequency: number,
  style: string,
  intensity: string,
  nutrition: string,
  sleep: number,
  stress: number,
  photo: string  // base64
}

// What we expect back
{
  generatedImageUrl: string
  // or
  generatedImageBase64: string
}
```

**Note:** Exact format TBD - coordinate with team handling calculations/AI

---

## 6. Implementation Plan (Hackathon Speed)

### Hour 1: Setup
- [ ] `pnpm create svelte@latest`
- [ ] Install Tailwind CSS
- [ ] Create basic route structure
- [ ] Setup TypeScript types

### Hour 2: UI Components
- [ ] Build multi-step form component
- [ ] Create 9 input steps (simple buttons/sliders)
- [ ] Add navigation (Next/Back)
- [ ] Progress indicator

### Hour 3: Image Upload & Integration
- [ ] Image upload component
- [ ] Base64 conversion
- [ ] Create `/api/generate` proxy endpoint
- [ ] Connect to team's API (get endpoint from them)

### Hour 4: Results & Polish
- [ ] Results page to display image (mobile layout)
- [ ] Basic error handling
- [ ] Loading states
- [ ] Test on actual mobile device (iOS/Android)
- [ ] Viewport meta tag for proper scaling

**Total: ~4 hours to working demo**

**Mobile Testing Checklist:**
- [ ] Test on Chrome mobile DevTools
- [ ] Test on actual iPhone/Android
- [ ] Check touch targets (all ≥ 44px)
- [ ] Verify camera access works
- [ ] Test in portrait orientation
- [ ] Check safe area on notched devices

---

## 7. Key Questions for Team

**Before starting, confirm with other team members:**

1. **API Endpoint:** What's the URL for your calculation/AI API?
2. **Request Format:** Exact JSON structure you need?
3. **Response Format:** What will you return (URL vs base64)?
4. **API Keys:** Do we need to handle any auth tokens?
5. **Expected Response Time:** How long should we wait?

---

## 8. Technical Notes

### Mobile-First Configuration

**HTML Meta Tags (app.html):**
```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#3B82F6">
```

**Tailwind Config (tailwind.config.js):**
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Blue from mockup
      },
      minHeight: {
        'touch': '44px', // Minimum touch target
      }
    }
  }
}
```

### Image Handling
- Accept JPEG/PNG
- Max 5MB
- Convert to base64 for API
- Compress if over 2MB (mobile bandwidth)
- Show preview before submit
- **Mobile:** Use `<input accept="image/*" capture="environment">` for camera

### Validation
- All fields required
- Sleep/stress must be 1-10
- Image must be uploaded
- Show inline validation errors (red text)
- Disable Next button until valid

### Error Handling
- API timeout → show retry button
- Invalid image → clear error message (large text)
- Network error → friendly message
- **Mobile-specific:** Handle offline scenarios
- Show errors at top of viewport (visible)

---

## Document Control

**Version:** 2.0 (Hackathon Simplified)
**Last Updated:** 2025-10-03
**Status:** Ready to build
**Scope:** 4-hour hackathon implementation
