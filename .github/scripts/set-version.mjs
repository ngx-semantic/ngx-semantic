#!/usr/bin/env node
// Sets the release version in the workspace, library, and lockfile manifests.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const manifests = ['package.json', 'src/package.json', 'package-lock.json'];

const setVersion = (path, version) => {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  let changed = data.version !== version;
  data.version = version;

  // lockfileVersion 3 repeats the workspace version in the root package entry
  const rootEntry = data.packages?.[''];
  if (rootEntry) {
    changed ||= rootEntry.version !== version;
    rootEntry.version = version;
  }

  if (changed) {
    writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  }

  return changed;
};

const input = process.argv[2];

if (!input) {
  console.error('usage: set-version.mjs <version>');
  process.exit(2);
}

const version = input.replace(/^v/, '');

if (!SEMVER.test(version)) {
  console.error(`'${version}' is not a valid semver version`);
  process.exit(1);
}

for (const name of manifests) {
  const path = join(root, name);

  if (!existsSync(path)) {
    console.log(`${name}: missing, skipped`);
    continue;
  }

  console.log(`${name}: ${setVersion(path, version) ? 'updated to' : 'already at'} ${version}`);
}
