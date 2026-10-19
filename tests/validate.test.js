import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { validateCatalog } from '../scripts/validate-catalog.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');

describe('AI Atlas Catalog Validation', () => {
  let ajv;
  let validate;
  let validMock;

  test('setup Ajv and compile resource.schema.json', async () => {
    ajv = new Ajv({ allErrors: true });
    addFormats(ajv);

    const schemaRaw = await readFile(join(ROOT_DIR, 'schemas', 'resource.schema.json'), 'utf-8');
    const schema = JSON.parse(schemaRaw);
    validate = ajv.compile(schema);
    assert.equal(typeof validate, 'function');

    validMock = {
      id: 'test-resource',
      name: 'Test Resource',
      tagline: 'A valid test resource for schema validation',
      description: 'Detailed description of the test resource providing clear capabilities.',
      url: 'https://example.com/test-resource',
      primary_category: 'dev-tools',
      categories: ['dev-tools'],
      tags: ['test', 'validation'],
      license: 'MIT',
      pricing: {
        model: 'open-source',
        details_url: null
      },
      deployment: ['local', 'cloud'],
      status: 'active',
      verified: true,
      last_verified_at: '2026-10-19',
      added_at: '2026-10-19'
    };
  });

  test('accepts valid resource structure', () => {
    const isValid = validate(validMock);
    assert.equal(isValid, true, JSON.stringify(validate.errors));
  });

  test('rejects resource missing required id', () => {
    const invalid = { ...validMock };
    delete invalid.id;
    assert.equal(validate(invalid), false);
    assert.ok(validate.errors.some(e => e.params?.missingProperty === 'id'));
  });

  test('rejects resource with malformed id (uppercase / spaces)', () => {
    const invalid = { ...validMock, id: 'Test Resource' };
    assert.equal(validate(invalid), false);
  });

  test('rejects resource with invalid pricing model', () => {
    const invalid = { ...validMock, pricing: { model: 'unsupported-pricing' } };
    assert.equal(validate(invalid), false);
  });

  test('rejects resource with invalid URL format', () => {
    const invalid = { ...validMock, url: 'not-a-valid-url' };
    assert.equal(validate(invalid), false);
  });

  test('validates the live catalog and categories without errors', async () => {
    const result = await validateCatalog();
    assert.equal(result.success, true, `Validation failed: ${result.errors.join('; ')}`);
    assert.ok(result.count > 0, 'Catalog should contain at least one resource');
  });
});
