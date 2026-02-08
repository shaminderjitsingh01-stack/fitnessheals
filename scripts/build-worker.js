import { build } from 'esbuild';
import { copyFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

async function buildWorker() {
  console.log('Building Cloudflare Pages worker...');

  await build({
    entryPoints: [join(rootDir, 'dist/server/index.js')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    target: 'es2022',
    outfile: join(rootDir, 'dist/client/_worker.js'),
    minify: true,
    external: [],
    conditions: ['worker', 'browser'],
    mainFields: ['browser', 'module', 'main'],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
  });

  console.log('Worker built successfully!');
}

buildWorker().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
