#!/usr/bin/env bun

import { join } from 'node:path';

import { Output } from './types';

const validateSpecsWithOpenspec = async (rootDir: string): Promise<Output> => {
  const openspecBin = join(rootDir, 'node_modules', '.bin', 'openspec');
  const proc = Bun.spawn(
    ['bun', openspecBin, 'validate', '--all', '--strict', '--no-interactive', '--json'],
    {
      cwd: rootDir,
      stdout: 'pipe',
      stderr: 'pipe',
    }
  );

  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ]);

  const exitCode = await proc.exited;

  let validationData: {
    items: Output['items'];
    summary: Output['summary'];
    version: string;
  };

  try {
    validationData = JSON.parse(stdout.trim()) as {
      items: Output['items'];
      summary: Output['summary'];
      version: string;
    };
  } catch (error) {
    throw new Error(`Failed to parse openspec JSON output: ${error instanceof Error ? error.message : String(error)}`);
  }

  return {
    success: exitCode === 0,
    exitCode,
    items: validationData.items,
    summary: validationData.summary,
    version: validationData.version,
    stderr: stderr.trim(),
  };
};

export default validateSpecsWithOpenspec;
