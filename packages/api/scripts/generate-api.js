import fs from 'node:fs';
import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';

generateApi({
  input: '../swagger/swagger.json',
  templates: path.resolve(process.cwd(), '../templates'),
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
  typeSuffix: 'Dto',
})
  .then(({ files }) => {
    files.forEach(({ fileName, fileContent }) => {
      if (fileName === 'http-client') return;

      const outputPath =
        fileName === 'data-contracts'
          ? path.resolve(process.cwd(), '../src/dto/dto.ts')
          : path.resolve(
              process.cwd(),
              `../src/api/${fileName.toLowerCase()}.ts`
            );

      fs.writeFile(outputPath, fileContent, (err) => {
        console.log(
          err
            ? `☠️   Failed to write file ${fileName.toLowerCase()}.ts: ${err}`
            : `✅   Successfully wrote file ${fileName.toLowerCase()}.ts`
        );
      });
    });
  })
  .catch((e) => console.error(e));
