import { ESLint } from 'eslint';

async function run() {
  console.log('Initializing ESLint...');
  const eslint = new ESLint();

  console.log('Linting files in src...');
  const results = await eslint.lintFiles(['src/**/*.js', 'src/**/*.jsx']);

  const formatter = await eslint.loadFormatter('stylish');
  const resultText = formatter.format(results);

  console.log(resultText);

  const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0);
  const warningCount = results.reduce((acc, r) => acc + r.warningCount, 0);

  console.log(`Lint check finished: ${errorCount} error(s), ${warningCount} warning(s).`);
  process.exit(errorCount > 0 ? 1 : 0);
}

run().catch((err) => {
  console.error('Linting failed with error:', err);
  process.exit(1);
});
