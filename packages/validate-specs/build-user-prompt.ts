import { readFile } from 'node:fs/promises';

import { USER_PROMPT } from './constants';

const buildUserPrompt = async (specFilePaths: string[]): Promise<string> => {
  const specs = [];

  for (const filePath of specFilePaths) {
    const content = await readFile(filePath, 'utf8');

    specs.push({
      path: filePath,
      content: content.trim(),
    });
  }

  const specificationContents = specs.map((spec, index) => (
    `
    [SPEC ${index + 1}]
    PATH: ${spec.path}

    ${spec.content}
    `
  )).join('\n\n');

  return (
    `
    ${USER_PROMPT}

    --- BEGIN SPECIFICATIONS ---

    ${specificationContents}

    --- END SPECIFICATIONS ---
    `
  ).trim();
};

export default buildUserPrompt;
