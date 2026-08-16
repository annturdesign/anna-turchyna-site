# Anna Turchyna — website (v1)

Plain HTML/CSS/JS, no build step, no dependencies (except Google Fonts, loaded via CDN). Open `index.html` directly in a browser, or host the folder on any static host (Netlify, Vercel, GitHub Pages, etc).

## Files
- `index.html` — Home
- `pricing.html` — Prices
- `portfolio.html` — Portfolio (8 placeholder cases)
- `contact.html` — Contact
- `css/style.css` — all styles, design tokens at the top (colors, fonts, spacing)
- `js/main.js` — all behavior (scroll reveal, count-up numbers, project slider, tabs, mobile menu, form)

## What's real vs placeholder
- Copy: final, matches the approved text doc.
- Pricing: real (The Clarity Kit / The Brand System / The Brand Partnership).
- Numbers: real (6+ / 40+ / 100%).
- Portfolio: 8 placeholder cases (no real images/case studies yet).
- Testimonials: placeholder, needs 3–6 real quotes before launch.
- Contact form: front-end only. It currently just shows a "Sent" message and does nothing else. Before launch, wire it to an email service or your Formester form (same one linked in your packages doc).
- Font: Space Grotesk (headings) + Inter (body), both free on Google Fonts. Swap the `@import` and `--font-display` / `--font-body` variables at the top of `css/style.css` if you get a licensed brand font later (Clash Display / General Sans, etc).
- Colors: blue accent scale + light background, defined as CSS variables at the top of `css/style.css` (`--c-blue-...`). Adjust those to match your final palette once you have exact values, everything else updates automatically.

## Known gaps to close before launch
1. Replace all "Project image placeholder" blocks with real screenshots.
2. Replace testimonial placeholders with real client quotes.
3. Confirm add-on module prices on the Pricing page (carried over from an earlier draft).
4. Wire the contact form to something that actually sends you the submission.
5. Swap the logo mark (currently a simple arrow icon) for your real logo file if you have one as SVG/PNG.
