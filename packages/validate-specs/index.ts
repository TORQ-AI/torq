#!/usr/bin/env bun

import validateSpecs from './validate-specs';

/**
 * CLI entry point.
 */
if (import.meta.main) {
  const { default: getCliArgs } = await import('./get-cli-args.js');
  const { rootDir } = getCliArgs();
  const result = await validateSpecs(rootDir);

  console.info(JSON.stringify(result, null, 2));
}

export default validateSpecs;
