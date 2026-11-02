
index.html + style.css

- display: grid on the PARENT, then define columns with grid-template-columns
- 1fr = one equal share of the free space, repeat(3, 1fr) = 3 equal columns
- Flexbox = one direction (row OR column), Grid = rows AND columns together
- repeat(auto-fit, minmax()) makes a responsive grid without media queries



GRID = A CHESS BOARD / EXCEL SHEET

│
├── grid-template-columns → How many columns and how wide
├── fr                    → "Share of the free space"
├── gap                   → Thickness of the lines between squares
├── grid-template-areas   → Draw the page layout with names (header, sidebar, content, footer)
└── Real use              → Photo galleries, dashboards, product listings
