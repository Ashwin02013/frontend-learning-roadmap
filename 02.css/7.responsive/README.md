
index.html + style.css

- Responsive = the same page looks good on mobile, tablet and desktop
- <meta name="viewport"> tells the phone to use its real width
- @media (min-width: 600px) { ... } = "apply these rules only when the screen is at least 600px"
- Mobile-first: write the small screen CSS first, then add media queries for bigger screens
- Test it: open DevTools (F12) > toggle device toolbar, or just drag the window smaller



RESPONSIVE = WATER TAKING THE SHAPE OF ITS GLASS

│
├── viewport meta  → Measure the glass before pouring
├── mobile (<600)  → Tall glass: 1 column
├── tablet (600+)  → Medium glass: 2 columns
├── desktop (992+) → Wide glass: 4 columns
└── Real use       → Same Amazon / Swiggy site working on phone and laptop
