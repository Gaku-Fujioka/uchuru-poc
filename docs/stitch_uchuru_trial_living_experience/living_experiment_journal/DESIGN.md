---
name: Living Experiment Journal
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#404848'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#707978'
  outline-variant: '#c0c8c7'
  surface-tint: '#366664'
  primary: '#003634'
  on-primary: '#ffffff'
  primary-container: '#1b4d4b'
  on-primary-container: '#8cbdba'
  inverse-primary: '#9ed0cd'
  secondary: '#944a00'
  on-secondary: '#ffffff'
  secondary-container: '#fc8f34'
  on-secondary-container: '#663100'
  tertiary: '#31302a'
  on-tertiary: '#ffffff'
  tertiary-container: '#474640'
  on-tertiary-container: '#b7b4ac'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#baece9'
  primary-fixed-dim: '#9ed0cd'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#1c4e4c'
  secondary-fixed: '#ffdcc5'
  secondary-fixed-dim: '#ffb783'
  on-secondary-fixed: '#301400'
  on-secondary-fixed-variant: '#713700'
  tertiary-fixed: '#e6e2d9'
  tertiary-fixed-dim: '#c9c6be'
  on-tertiary-fixed: '#1c1c17'
  on-tertiary-fixed-variant: '#484741'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 26px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Noto Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  mission-title:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-margin: 20px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built to shift the narrative from "accommodation booking" to "life experimentation." It targets young adults contemplating a move to Osaka, fostering a sense of curiosity, belonging, and low-stakes exploration. The aesthetic is a fusion of **Modern Minimalism** and **Tactile Journaling**, moving away from the cold, transactional nature of real estate platforms.

The UI should evoke the feeling of opening a fresh notebook or a local community board. It prioritizes warmth through organic textures, generous whitespace, and human-centric layouts. The emotional response is one of invitation and psychological safety—encouraging users to "try on" a new life without the pressure of permanent commitment.

## Colors

The palette is rooted in the "Journal" concept, using a warm off-white base to simulate high-quality paper. 

- **Primary (Deep Teal):** Represents the stability of "Living" and the lush growth of a new chapter. Used for headers, primary actions, and success states.
- **Accent (Warm Orange):** Inspired by Osaka’s vibrant street food and neon energy. Used sparingly for highlights, "missions," and interactive elements that require attention.
- **Background (Cream/Off-white):** The foundation of the system. It reduces eye strain and differentiates the app from standard white-label real estate apps.
- **Neutral (Charcoal):** Softened black used for body text to maintain high readability while feeling less "digital" than pure black.

## Typography

This design system utilizes a trio of typefaces to balance character with utility. 

- **Headlines:** Use **Be Vietnam Pro** for its contemporary, friendly geometric construction. It feels editorial and approachable.
- **Body:** **Noto Sans** (specifically the Japanese variant) provides the essential clarity needed for reading mission details and local guides. It is systematic and reliable.
- **Technical/Labels:** **Space Grotesk** is used for mission stats, progress percentages, and tags. Its slightly technical feel adds a "data-journaling" layer to the experience.

Line heights are kept generous (1.6x for body) to maintain the breezy, airy feel of a journal page.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid with Intentional Asymmetry**. To avoid the rigid look of a booking app, elements occasionally break the vertical rhythm to feel more like a scrapbooked journal.

- **Mobile First:** A 4-column grid with 20px outer margins.
- **Desktop:** A centered 12-column fixed grid (max-width 1200px) with 24px gutters.
- **Rhythm:** Use an 8px base unit. Vertical spacing between different sections (e.g., from "Daily Progress" to "Available Missions") should be aggressive (48px+) to allow the design to breathe.
- **Safe Zones:** Content is nested in "Paper Sheets"—large white or off-white containers with significant internal padding (24px) to emphasize the tactile feel.

## Elevation & Depth

Hierarchy is achieved through **Tonal Layers** and **Soft Ambient Shadows**. We avoid high-elevation floating effects to keep the app grounded and "on the desk."

- **Level 0 (Background):** The Cream surface.
- **Level 1 (Cards):** Pure white surfaces with a subtle, 1px border in a slightly darker cream, accompanied by a very soft, diffused shadow (Blur: 20px, Y: 4px, Opacity: 4%, Color: Primary).
- **Level 2 (Interactive):** Elements like buttons or active mission badges use a slightly stronger shadow to indicate "press-ability."

This low-contrast approach ensures the UI feels like physical stationery rather than a digital interface.

## Shapes

The shape language is consistently **Rounded**. Sharp corners are strictly avoided to maintain the youthful and welcoming personality.

- **Small Components:** Checkboxes and small tags use `rounded-md` (8px).
- **Standard Cards:** Use `rounded-lg` (16px) to create a soft frame for images and content.
- **Interactive Badges:** Mission icons and primary action buttons are often pill-shaped (`rounded-full`) to invite touch and denote a friendly, game-like progress system.

## Components

### Mission Badges
Badges are the heart of the "Life Experiment." They are circular or pill-shaped with a thick 2px Deep Teal outline when locked, and solid Warm Orange when active. Each category (Work, Live, Connect) has a dedicated icon style—hand-drawn or "stamp-like" rather than pixel-perfect glyphs.

### Progress Indicators
Avoid traditional linear bars. Use "dotted paths" or segmented circular trackers that feel like a travel map. As a user completes missions, the path fills with a Deep Teal solid line.

### Cards
Cards for "Trial Homes" or "Local Meetups" should feature a large image with a generous 16px radius. Text within cards should be left-aligned with ample margin, treating the card like a postcard.

### Input Fields
Forms should feel like filling out a guestbook. Use bottom-only borders (2px Deep Teal) or very lightly tinted backgrounds. The focus state should be indicated by the label shifting into a small "Space Grotesk" tag above the line.

### Relationship Funnel
For the population funnel, use a vertical "step-down" layout where cards get progressively more detailed as the user moves from "Interested" to "Resident," visually representing the narrowing focus of their living experiment.