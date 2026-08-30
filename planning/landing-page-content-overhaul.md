# Landing Page Content Overhaul — The Recruiting Compass

**Date:** 2026-08-30
**Status:** Plan — ready for implementation
**Repo:** recruiting-compass-landing (Nuxt 4 / Tailwind / Vercel SSG)
**Target file:** `pages/index.vue` (currently 1125 lines)

---

## Problem

The current landing page describes a generic "tracker" with vague feature cards and pre-launch copy
("Coming Spring 2026," Typeform survey CTAs, waitlist form). The product shipped — these need to
become real feature descriptions with real numbers, real CTAs (Sign In / Create Account pointing to
the live app at myrecruitingcompass.com), and content that communicates the actual product value.

The current page communicates roughly 5% of the product's value.

---

## Sections to Update

### 1. Hero (replace current)

**Keep:** Logo, animated gradient background, sport-name typewriter effect.

**Replace:**

- Headline: "Your College Recruiting Command Center"
- Subtitle: "Everything student athletes and their families need to navigate college recruiting — from finding schools to contacting coaches to tracking every step. For 19 sports. No recruiting service required."
- Primary CTA: "Get Started Free" → `https://myrecruitingcompass.com/signup`
- Secondary CTA: "Sign In" → `https://myrecruitingcompass.com/login`

**Remove:**

- "Take the Survey" Typeform link
- "Coming Spring 2026" tagline
- `WaitlistForm` component (keep file, just remove from hero)
- "Learn More" smooth-scroll button

### 2. Stats Bar (replace current animated counters)

Current stats are generic industry numbers (180K athletes, 90% overwhelmed). Replace with product stats:

| Stat | Label               |
| ---- | ------------------- |
| 19   | Sports Supported    |
| 33+  | Outreach Templates  |
| 22   | NCAA Calendars      |
| 66+  | Performance Metrics |

Keep the animated counter effect — it works well.

### 3. Feature Cards (replace current 8 generic cards)

Replace with 6 specific cards. Each gets an icon, headline, description with real numbers:

**Card 1: Schools Pipeline**

- Headline: "Build Your School List, Then Work It"
- Description: "Research and organize target schools with a 5-stage recruiting pipeline — from Researching to Committed. Every school is enriched with College Scorecard data: graduation rates, enrollment, costs, and more. Personal Fit signals show you which schools match on location, campus size, and cost — no guessing."

**Card 2: Coach CRM**

- Headline: "Know Every Coach and Where You Stand"
- Description: "Track every coach you're talking to with a full CRM: response rate analytics, days since last contact, follow-up reminders, and interaction history. See which coaches are engaging and which need a nudge. Coaches are linked to their schools so nothing falls through the cracks."

**Card 3: Smart Communication**

- Headline: "Send the Right Message at the Right Time"
- Description: "Choose from 33+ coach outreach templates — introduction emails, thank-you notes, campus visit follow-ups, and more. Built-in NCAA contact-window compliance prevents you from sending when rules say you can't. Anti-spam guardrails keep you from over-messaging. One tap from any coach's profile."

**Card 4: Recruiting Timeline**

- Headline: "A 4-Year Roadmap, Not Just a To-Do List"
- Description: "Your recruiting timeline maps out what to do from freshman year through signing day. Five guidance panels cover NCAA eligibility, test prep, financial aid, common worries, and what matters right now. 23 real SAT, ACT, and FAFSA milestones are built in. Never wonder 'what should I be doing?'"

**Card 5: Recruiting Calendars**

- Headline: "Know When Coaches Can Contact You"
- Description: "22 NCAA recruiting calendars built from official NCAA PDFs, covering every sport and division. See exactly when contact periods, quiet periods, and dead periods fall — so you know when to reach out and when to wait. Calendars update with your sport, gender, and division automatically."

**Card 6: Performance Tracking**

- Headline: "Log the Numbers That Get You Recruited"
- Description: "Track 66+ sport-specific performance metrics — from 60-yard dash times to GPA to vertical jump. Set your primary metric so coaches see your best number first on your public profile. Your stats travel with you across every outreach template and profile share."

### 4. How It Works (update current 3 steps)

Keep 3-step layout. Update copy:

**Step 1: Set Up Your Profile**
"Tell us your sport, position, graduation year, and key stats. Add your academic info and video links. Takes about 10 minutes."

**Step 2: Build Your School List**
"Search and add target schools. The pipeline tracks where you stand with each one — from researching to committed. We pull in College Scorecard data so you can compare schools on the facts."

**Step 3: Start Reaching Out**
"Use built-in templates to contact coaches. Log every interaction. Your dashboard shows what needs attention — which coaches haven't replied, what deadlines are coming, and what to do next."

### 5. For Players / For Parents (NEW section — add after How It Works)

Two-column layout (stacked on mobile):

**For Players — "Own Your Recruiting Process"**

- Track every school, coach, and conversation in one place
- Send polished outreach emails with one tap — templates handle the formatting
- See exactly what you should be doing this month with your recruiting timeline
- Log your performance metrics so coaches can see real numbers
- Share your public profile link with any coach, anytime

**For Parents — "See Everything. Help Without Hovering."**

- Full shared access to your athlete's recruiting dashboard — same data, same view
- COPPA-compliant family accounts with parent and player roles
- See which coaches have responded, which schools are in play, and what's next
- Help your athlete stay on track without needing to ask "did you email that coach?"
- Action items tell both of you what needs attention right now

### 6. App Showcase (update current)

Keep the Web/iOS tab switching and device chrome mockups.

**Update screenshots** — current ones are stale. Need fresh screenshots of:

- Dashboard (web + iOS)
- Schools pipeline view
- Timeline view
- Coach detail / CRM view
- Recruiting calendar view

**Update slide descriptions** to match new feature copy.

### 7. Sports Supported (NEW section)

**Headline:** "Built for Your Sport"

Grid of 19 sport names (optionally with icons):
Baseball, Softball, Basketball (M), Basketball (W), Football, Soccer (M), Soccer (W),
Volleyball (W), Beach Volleyball, Lacrosse (M), Lacrosse (W), Field Hockey,
Ice Hockey (M), Ice Hockey (W), Tennis, Golf, Swimming & Diving, Track & Field / XC, Gymnastics

**Subtext:** "Every sport gets its own recruiting calendar, performance metrics, and NCAA compliance rules. Not a baseball app with other sports bolted on."

### 8. Additional Feature Highlights (NEW section — compact list or small cards)

- **Public Profile** — A shareable athlete profile page with your stats, academics, video links, and highlights. See when coaches view it.
- **Analytics Dashboard** — Upcoming events, schools in your pipeline, coach response rates, action items, and recruiting progress — all in one view.
- **AI-Driven Action Items** — 11 rules that surface what needs your attention: coaches who haven't replied, missing profile fields, upcoming deadlines, schools without contacts.
- **Push Notifications** — Get notified when you receive an offer, a coach reaches out, or an event is coming up.
- **Works on Web and iOS** — Full-featured on both platforms. Your data syncs everywhere.
- **Accessible** — WCAG AA compliant. Keyboard navigable, screen reader friendly, Dynamic Type supported.

### 9. FAQ (update current)

Replace current 8 FAQs with updated versions. Full copy in `planning/landing-page-content-update.md` in the iOS repo (section 8). Key changes:

- Remove "when does it launch?" (it's launched)
- Add specifics: "33+ templates," "22 calendars," "19 sports"
- Add "How is this different from other recruiting platforms?" with anti-recruiting-service positioning
- Keep JSON-LD FAQ structured data for SEO

### 10. Survey CTA Section (REPLACE → Final CTA)

Remove Typeform survey references. Replace with:

**Headline:** "Start Your Recruiting Journey Today"
**Subtext:** "Free for student athletes and families. Web and iOS. Set up your profile in 10 minutes."
**Primary CTA:** "Create Your Free Account" → `https://myrecruitingcompass.com/signup`
**Secondary CTA:** "Sign In" → `https://myrecruitingcompass.com/login`

### 11. Footer (update)

- Update "Coming Spring 2026" → remove
- Add App Store link when available
- Keep social links, legal links, contact email

---

## Components to Update/Create

| Component             | Action           | Notes                               |
| --------------------- | ---------------- | ----------------------------------- |
| `WaitlistForm.vue`    | Remove from hero | Keep file if needed for other pages |
| Feature cards data    | Rewrite          | 6 cards with specific copy          |
| Stats counters        | Update           | Product stats, not industry stats   |
| `PlayerParentSection` | NEW              | Two-column audience section         |
| `SportsGrid`          | NEW              | 19-sport grid with optional icons   |
| `FeatureHighlights`   | NEW              | Compact list of secondary features  |
| FAQ data              | Rewrite          | Updated Q&As, keep JSON-LD          |
| CTA buttons           | Update           | Point to myrecruitingcompass.com    |

---

## Implementation Notes

- **Break up `pages/index.vue`** (1125 lines) — extract each section into its own component under `components/sections/` for maintainability.
- **SEO:** Update `nuxt.config.ts` meta description + OG tags to match new headline/subtitle.
- **Keep existing:** animated gradient background, typewriter sport-name effect, device chrome mockups, animated counters, accordion FAQ with JSON-LD.
- **Remove:** All Typeform references, "Coming Spring 2026," waitlist form from hero.
- **All CTAs** point to `https://myrecruitingcompass.com/signup` or `/login`.
- **Screenshots:** Will need fresh product screenshots for the App Showcase section. Can defer this to a follow-up.
- **Content source:** Full copy lives in the iOS repo at `planning/landing-page-content-update.md` and `planning/marketing-copy.md`.

---

## Content Principles

1. **Specificity over vagueness:** "33+ templates" not "communication tools"
2. **Numbers build credibility:** 19 sports, 66+ metrics, 33+ templates, 22 calendars
3. **Dual audience:** Parents and players have different anxieties — address both
4. **Anti-recruiting-service positioning:** "No recruiting service required" is the key differentiator
5. **Action-oriented:** Every section ends with what the user gets to do, not what the product is
