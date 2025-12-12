import fs from 'fs';
const p = new URL('../app/globals.css', import.meta.url);
let s = fs.readFileSync(p, 'utf8');

// Ensure brand variables exist in :root
s = s.replace(/:root\s*\{[\s\S]*?\n\}/, (block) => {
  if (!block.includes('--primary')) {
    block = block.replace(/\n\}/, `\n  --primary: #3A5A40;\n  --accent: #A3B18A;\n  --tan: #C2A773;\n  --sand: #EFE7DA;\n  --dark: #1F2421;\n}`);
  }
  return block;
});

// Extend @theme inline mapping
s = s.replace(/@theme inline\s*\{[\s\S]*?\n\}/, (block) => {
  let b = block;
  b = b.replace('--font-sans: var(--font-geist-sans);', '--font-sans: var(--font-body);');
  b = b.replace('--font-mono: var(--font-geist-mono);', '--font-heading: var(--font-heading);');
  const inserts = [
    ['--color-primary', 'var(--primary)'],
    ['--color-accent', 'var(--accent)'],
    ['--color-tan', 'var(--tan)'],
    ['--color-sand', 'var(--sand)'],
    ['--color-dark', 'var(--dark)'],
  ];
  for (const [k, v] of inserts) {
    if (!b.includes(k)) {
      b = b.replace(/\n\}/, `\n  ${k}: ${v};\n}`);
    }
  }
  return b;
});

// Update body font-family to use Inter variable
s = s.replace(/font-family:[^;]+;/, 'font-family: var(--font-body), system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji";');

fs.writeFileSync(p, s);
console.log('Updated globals.css with brand palette and fonts.');
