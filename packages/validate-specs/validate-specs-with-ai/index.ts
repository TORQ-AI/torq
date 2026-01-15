#!/usr/bin/env bun

import validateSpecsWithAI from './validate-specs-with-ai';

/**
 * CLI entry point.
 */
if (import.meta.main) {
  const { default: getCliArgs } = await import('./get-cli-args.js');
  const { rootDir } = getCliArgs();
  const result = await validateSpecsWithAI(rootDir);

  console.info(JSON.stringify(result, null, 2));
}

export default validateSpecsWithAI;
