#!/usr/bin/env bun

import getSpecFilePaths from './get-spec-file-paths';
import { SYSTEM_PROMPT } from './constants';
import { Output } from './types';
import buildUserPrompt from './build-user-prompt';
import askDial from './ask-dial';

const validateSpecsWithAI = async (rootDir: string): Promise<Output> => {
  const specFilePaths = await getSpecFilePaths(rootDir);
  const usePrompt = await buildUserPrompt(specFilePaths);

  return askDial<Output>(SYSTEM_PROMPT, usePrompt);
};

export default validateSpecsWithAI;
