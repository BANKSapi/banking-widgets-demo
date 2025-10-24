#!/usr/bin/env node
import { copyFileSync, mkdirSync, readdirSync, existsSync, statSync, cpSync } from 'fs';
import { join } from 'path';

const sourceDir = 'node_modules/@banksapitechnology/embeddable-finance-web-components/dist';
const targetDir = 'dist/assets';

// Create target directory if it doesn't exist
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Copy ESM files
const esmDir = join(sourceDir, 'esm');
if (existsSync(esmDir)) {
  const files = readdirSync(esmDir);
  files.forEach(file => {
    if (file.endsWith('.js')) {
      copyFileSync(join(esmDir, file), join(targetDir, file));
    }
  });
}

// Copy main bundle files and directories
const bundleDir = join(sourceDir, 'embeddable-finance-web-components');
if (existsSync(bundleDir)) {
  const files = readdirSync(bundleDir);
  files.forEach(file => {
    const sourcePath = join(bundleDir, file);
    const targetPath = join(targetDir, file);
    const stat = statSync(sourcePath);

    if (stat.isDirectory()) {
      cpSync(sourcePath, targetPath, { recursive: true });
    } else {
      copyFileSync(sourcePath, targetPath);
    }
  });
}

console.log('✅ EFC Web component assets copied to dist');
