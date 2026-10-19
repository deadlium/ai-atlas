#!/usr/bin/env node

/**
 * AI Atlas Duplicate Detection Engine
 * Scans catalog resources to detect duplicate IDs, normalized URLs, and names.
 */

import { readdir, readFile } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const CATALOG_DIR = join(ROOT_DIR, 'catalog');
const DATA_DIR = join(CATALOG_DIR, 'data');
const MASTER_CATALOG_PATH = join(CATALOG_DIR, 'resources.json');

function normalizeUrl(rawUrl) {
  if (!rawUrl) return null;
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(/^www\./, '').toLowerCase();
    const path = u.pathname.replace(/\/+$/, '').toLowerCase();
    return `${u.protocol}//${host}${path}`;
  } catch {
    return rawUrl.trim().toLowerCase();
  }
}

async function collectResources() {
  const records = [];
  try {
    const raw = await readFile(MASTER_CATALOG_PATH, 'utf-8');
    const items = JSON.parse(raw);
    if (Array.isArray(items)) {
      records.push(...items.map(item => ({ item, source: 'catalog/resources.json' })));
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  return records;
}

export async function checkDuplicates() {
  const records = await collectResources();
  const errors = [];
  const warnings = [];

  const idMap = new Map();
  const urlMap = new Map();
  const repoMap = new Map();
  const nameMap = new Map();

  for (const { item, source } of records) {
    const id = item.id;
    const name = item.name;
    const normUrl = normalizeUrl(item.url);
    const normRepo = normalizeUrl(item.repository?.url);

    // ID check
    if (id) {
      if (idMap.has(id)) {
        errors.push(`Duplicate ID '${id}' found in ${source} (previously seen in ${idMap.get(id)})`);
      } else {
        idMap.set(id, source);
      }
    }

    // URL check
    if (normUrl) {
      if (urlMap.has(normUrl)) {
        errors.push(`Duplicate canonical URL '${normUrl}' for resource '${id}' (already used by '${urlMap.get(normUrl)}')`);
      } else {
        urlMap.set(normUrl, id);
      }
    }

    // Repo check
    if (normRepo) {
      if (repoMap.has(normRepo)) {
        warnings.push(`Shared repository URL '${normRepo}' between '${id}' and '${repoMap.get(normRepo)}'`);
      } else {
        repoMap.set(normRepo, id);
      }
    }

    // Name check
    if (name) {
      const lowerName = name.trim().toLowerCase();
      if (nameMap.has(lowerName)) {
        warnings.push(`Similar resource name '${name}' for '${id}' (matches '${nameMap.get(lowerName)}')`);
      } else {
        nameMap.set(lowerName, id);
      }
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    count: records.length
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('🔎 Checking AI Atlas Catalog for duplicates...\n');
  const result = await checkDuplicates();

  if (result.warnings.length > 0) {
    console.warn(`⚠️ Warnings (${result.warnings.length}):`);
    for (const w of result.warnings) {
      console.warn(`  - ${w}`);
    }
    console.log('');
  }

  if (!result.success) {
    console.error(`❌ Duplicate check failed with ${result.errors.length} error(s):\n`);
    for (const e of result.errors) {
      console.error(`  ✖ ${e}`);
    }
    process.exit(1);
  } else {
    console.log(`✅ Duplicate check passed! Scanned ${result.count} unique resources with zero duplicate IDs or URLs.`);
    process.exit(0);
  }
}
