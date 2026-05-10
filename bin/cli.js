#!/usr/bin/env node
import fs from 'fs';
import { convert } from '../src/index.mjs';

const args = process.argv.slice(2);

function usage() {
  console.error('Usage: dot2mermaid <input.dot> [-o output.mmd] [--direction TB|LR|RL|BT]');
}

if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
  usage();
  process.exit(args.length === 0 ? 1 : 0);
}

const input = args[0];
let output = null;
let direction = 'TB';

for (let i = 1; i < args.length; i += 1) {
  if (args[i] === '-o' && args[i + 1]) {
    output = args[i + 1];
    i += 1;
  } else if (args[i] === '--direction' && args[i + 1]) {
    direction = args[i + 1];
    i += 1;
  }
}

if (!fs.existsSync(input)) {
  console.error(`Input file not found: ${input}`);
  process.exit(1);
}

const dot = fs.readFileSync(input, 'utf-8');
const mermaid = convert(dot, { direction });

if (output) {
  fs.writeFileSync(output, mermaid, 'utf-8');
} else {
  console.log(mermaid);
}
