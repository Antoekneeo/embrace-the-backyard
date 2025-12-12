import fs from 'fs';
import path from 'path';

const msg = process.argv.slice(2).join(' ').trim();
if (!msg) {
  console.error('Usage: npm run log:change "<type>: <message>"');
  process.exit(1);
}

const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
if (!fs.existsSync(changelogPath)) {
  fs.writeFileSync(
    changelogPath,
    '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\nThe format is based on Keep a Changelog and this project adheres to Semantic Versioning.\n\n## [Unreleased]\n\n'
  );
}

let s = fs.readFileSync(changelogPath, 'utf8');

if (!s.includes('## [Unreleased]')) {
  s = s + '\n## [Unreleased]\n\n';
}

const lines = s.split('\n');
const idx = lines.findIndex((l) => l.trim().startsWith('## [Unreleased]'));
const timestamp = new Date().toISOString();
const entry = `- ${timestamp} — ${msg}`;

// Insert entry after the Unreleased header line
lines.splice(idx + 1, 0, '', entry);

fs.writeFileSync(changelogPath, lines.join('\n'));
console.log('CHANGELOG updated:', entry);
