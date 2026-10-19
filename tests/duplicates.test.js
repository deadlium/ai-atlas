import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { checkDuplicates } from '../scripts/check-duplicates.js';

describe('AI Atlas Duplicate Detection', () => {
  test('live catalog contains zero duplicate IDs or URLs', async () => {
    const result = await checkDuplicates();
    assert.equal(result.success, true, `Duplicate check failed: ${result.errors.join('; ')}`);
    assert.equal(result.errors.length, 0);
  });
});
