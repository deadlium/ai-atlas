#!/usr/bin/env node

/**
 * AI Atlas Catalog Validation Engine
 * Validates canonical catalog entries and JSON Schemas using Ajv.
 */

import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const SCHEMAS_DIR = join(ROOT_DIR, 'schemas');
const CATALOG_DIR = join(ROOT_DIR, 'catalog');
const DATA_DIR = join(CATALOG_DIR, 'data');
const CATEGORIES_PATH = join(CATALOG_DIR, 'categories.json');
const MASTER_CATALOG_PATH = join(CATALOG_DIR, 'resources.json');
const RESOURCE_SCHEMA_PATH = join(SCHEMAS_DIR, 'resource.schema.json');

async function getAllJsonFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await getAllJsonFiles(fullPath)));
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  }
  return files;
}

export async function validateCatalog() {
  const errors = [];
  const warnings = [];

  // 1. Initialize Ajv
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  // 2. Load Resource Schema
  let resourceSchema;
  try {
    const schemaContent = await readFile(RESOURCE_SCHEMA_PATH, 'utf-8');
    resourceSchema = JSON.parse(schemaContent);
  } catch (err) {
    errors.push(`Failed to load resource schema at ${RESOURCE_SCHEMA_PATH}: ${err.message}`);
    return { success: false, errors, warnings, count: 0 };
  }

  const validateResource = ajv.compile(resourceSchema);

  // 3. Load & validate Category Taxonomy
  let validCategoryIds = new Set();
  try {
    const categoriesContent = await readFile(CATEGORIES_PATH, 'utf-8');
    const categories = JSON.parse(categoriesContent);
    if (!Array.isArray(categories) || categories.length === 0) {
      errors.push(`Invalid categories.json: expected a non-empty array`);
    } else {
      for (const cat of categories) {
        if (!cat.id || typeof cat.id !== 'string') {
          errors.push(`Category item missing string 'id': ${JSON.stringify(cat)}`);
        } else if (validCategoryIds.has(cat.id)) {
          errors.push(`Duplicate category id in categories.json: '${cat.id}'`);
        } else {
          validCategoryIds.add(cat.id);
        }
      }
    }
  } catch (err) {
    errors.push(`Failed to load categories at ${CATEGORIES_PATH}: ${err.message}`);
  }

  // 4. Collect and validate entries
  const dataFiles = await getAllJsonFiles(DATA_DIR);
  const seenIds = new Map();
  const seenUrls = new Map();
  let validatedCount = 0;

  function checkRecord(record, sourceLabel) {
    validatedCount++;
    const recordId = record?.id || '<missing-id>';

    // JSON Schema validation
    const valid = validateResource(record);
    if (!valid) {
      for (const err of validateResource.errors) {
        const prop = err.instancePath ? err.instancePath.replace(/^\//, '') : err.params?.missingProperty || '';
        errors.push(`[Schema Violation] ${sourceLabel} (id: ${recordId}): field '${prop}' ${err.message}`);
      }
    }

    // Uniqueness checks
    if (record.id) {
      if (seenIds.has(record.id)) {
        errors.push(`[Duplicate ID] '${record.id}' in ${sourceLabel} was already declared in ${seenIds.get(record.id)}`);
      } else {
        seenIds.set(record.id, sourceLabel);
      }
    }

    // URL validation
    if (record.url) {
      try {
        const parsed = new URL(record.url);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
          errors.push(`[Invalid Protocol] ${sourceLabel} (id: ${recordId}): URL '${record.url}' must use http or https`);
        }
        const normalizedUrl = `${parsed.hostname}${parsed.pathname}`.replace(/\/+$/, '').toLowerCase();
        if (seenUrls.has(normalizedUrl)) {
          warnings.push(`[Potential Duplicate URL] ${sourceLabel} (id: ${recordId}) shares URL with ${seenUrls.get(normalizedUrl)}`);
        } else {
          seenUrls.set(normalizedUrl, sourceLabel);
        }
      } catch {
        errors.push(`[Malformed URL] ${sourceLabel} (id: ${recordId}): '${record.url}' is not a valid URL`);
      }
    }

    // Category consistency
    if (record.primary_category && !validCategoryIds.has(record.primary_category)) {
      errors.push(`[Invalid Category] ${sourceLabel} (id: ${recordId}): primary_category '${record.primary_category}' is not defined in categories.json`);
    }

    if (Array.isArray(record.categories)) {
      for (const cat of record.categories) {
        if (!validCategoryIds.has(cat)) {
          errors.push(`[Invalid Category Reference] ${sourceLabel} (id: ${recordId}): '${cat}' is not in categories.json`);
        }
      }
    }

    // Tag integrity
    if (Array.isArray(record.tags)) {
      const tagSet = new Set();
      for (const tag of record.tags) {
        if (tag !== tag.toLowerCase()) {
          errors.push(`[Tag Not Lowercase] ${sourceLabel} (id: ${recordId}): tag '${tag}' must be lowercase`);
        }
        if (tagSet.has(tag)) {
          errors.push(`[Duplicate Tag] ${sourceLabel} (id: ${recordId}): duplicate tag '${tag}'`);
        }
        tagSet.add(tag);
      }
    }

    // Verification integrity
    if (record.verified === true && !record.last_verified_at && !record.verified_at) {
      errors.push(`[Unverified Date] ${sourceLabel} (id: ${recordId}): marked as verified but missing last_verified_at`);
    }
  }

  // Validate individual files in catalog/data/
  for (const file of dataFiles) {
    const relPath = relative(ROOT_DIR, file);
    try {
      const content = await readFile(file, 'utf-8');
      const record = JSON.parse(content);
      checkRecord(record, relPath);
    } catch (err) {
      errors.push(`[Syntax Error] Failed to parse JSON file ${relPath}: ${err.message}`);
    }
  }

  // Validate unified catalog/resources.json if present
  try {
    const masterContent = await readFile(MASTER_CATALOG_PATH, 'utf-8');
    const masterList = JSON.parse(masterContent);
    if (!Array.isArray(masterList)) {
      errors.push(`[Type Error] ${relative(ROOT_DIR, MASTER_CATALOG_PATH)} must contain an array of resources`);
    } else {
      const masterIds = new Set();
      for (let i = 0; i < masterList.length; i++) {
        const item = masterList[i];
        const label = `${relative(ROOT_DIR, MASTER_CATALOG_PATH)}[${i}]`;
        const valid = validateResource(item);
        if (!valid) {
          for (const err of validateResource.errors) {
            errors.push(`[Schema Violation] ${label} (id: ${item?.id}): ${err.message}`);
          }
        }
        if (item?.id) {
          if (masterIds.has(item.id)) {
            errors.push(`[Duplicate Master ID] Duplicate id '${item.id}' in resources.json`);
          }
          masterIds.add(item.id);
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      errors.push(`[Syntax Error] Failed reading ${MASTER_CATALOG_PATH}: ${err.message}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
    warnings,
    count: validatedCount
  };
}

// Direct execution
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log('🔍 Running AI Atlas Catalog Validation...\n');
  const result = await validateCatalog();

  if (result.warnings.length > 0) {
    console.warn(`⚠️ Warnings (${result.warnings.length}):`);
    for (const w of result.warnings) {
      console.warn(`  - ${w}`);
    }
    console.log('');
  }

  if (!result.success) {
    console.error(`❌ Validation Failed (${result.errors.length} errors):\n`);
    for (const e of result.errors) {
      console.error(`  ✖ ${e}`);
    }
    process.exit(1);
  } else {
    console.log(`✅ All ${result.count} catalog entries passed validation successfully!`);
    process.exit(0);
  }
}
