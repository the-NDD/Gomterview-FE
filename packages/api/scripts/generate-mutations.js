import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { generateApi } from 'swagger-typescript-api';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userInputPath = process.argv[2];

if (!userInputPath) {
  console.error('❌  패키지 경로를 입력해주세요.');
  process.exit(1);
}

const packageRoot = path.resolve(__dirname, userInputPath);

generateApi({
  input: path.resolve(__dirname, '../swagger/swagger.json'),
  templates: path.resolve(__dirname, '../templates/mutations'),
  generateClient: true,
  generateUnionEnums: true,
  cleanOutput: false,
  prettier: {
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    endOfLine: 'auto',
    arrowParens: 'always',
    trailingComma: 'es5',
  },
  modular: true,
  moduleNameFirstTag: true,
  moduleNameIndex: 1,
})
  .then(({ files }) => {
    files.forEach(({ fileName, fileContent }) => {
      if (fileName === 'http-client' || fileName === 'data-contracts') return;

      const directoryPath = path.resolve(
        packageRoot,
        `src/entities/${fileName.toLowerCase()}/model`
      );
      const fileOutputPath = path.join(directoryPath, 'mutations.ts');

      fs.mkdir(directoryPath, { recursive: true }, (err) => {
        if (err) {
          console.error(`☠️   Failed to create directory ${directoryPath}: ${err}`);
          return;
        }

        fs.writeFile(fileOutputPath, fileContent, (err) => {
          console.log(
            err
              ? `☠️   Failed to write file ${fileName.toLowerCase()}.ts: ${err}`
              : `✅   Successfully wrote file ${fileName.toLowerCase()}.ts`,
          );
        });
      });
    });
  })
  .catch((e) => console.error(e));
