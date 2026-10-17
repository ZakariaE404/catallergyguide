import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 3456;
const TARGET_URL = `http://localhost:${PORT}/tools/breed-matcher`;

function checkServerReady() {
  return new Promise((resolve) => {
    const req = http.get(TARGET_URL, (res) => {
      if (res.statusCode === 200) resolve(true);
      else resolve(false);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    const isReady = await checkServerReady();
    if (isReady) return true;
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function run() {
  console.log(`Starting Next.js production server on port ${PORT}...`);
  const server = spawn(process.execPath, ['./node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    stdio: 'inherit',
  });

  try {
    const ready = await waitForServer();
    if (!ready) {
      throw new Error('Server failed to start within timeout.');
    }
    console.log(`Server is ready at ${TARGET_URL}.`);

    console.log('Running mobile Lighthouse audit (measuring CLS, TBT/INP, LCP)...');
    const reportPath = path.resolve('lighthouse-report.json');

    await new Promise((resolve, reject) => {
      const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      const lh = spawn(
        npxCmd,
        [
          '-y',
          'lighthouse',
          TARGET_URL,
          '--form-factor=mobile',
          '--screenEmulation.mobile=true',
          '--output=json',
          `--output-path=${reportPath}`,
          '--chrome-flags="--headless=new --no-sandbox --disable-gpu"',
          '--only-categories=performance',
        ],
        {
          shell: true,
          stdio: 'inherit',
          env: {
            ...process.env,
            CHROME_PATH: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          },
        }
      );
      lh.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Lighthouse exited with code ${code}`));
      });
    });

    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      const audits = report.audits;
      const perfScore = report.categories.performance.score * 100;

      const cls = audits['cumulative-layout-shift']?.numericValue ?? 0;
      const clsDisplay = audits['cumulative-layout-shift']?.displayValue ?? '0';

      const tbt = audits['total-blocking-time']?.numericValue ?? 0;
      const tbtDisplay = audits['total-blocking-time']?.displayValue ?? '0 ms';

      const lcp = audits['largest-contentful-paint']?.displayValue ?? 'N/A';
      const fcp = audits['first-contentful-paint']?.displayValue ?? 'N/A';

      console.log('\n=============================================');
      console.log('      MOBILE LIGHTHOUSE AUDIT REPORT        ');
      console.log('=============================================');
      console.log(`Performance Score: ${Math.round(perfScore)} / 100`);
      console.log(`Cumulative Layout Shift (CLS): ${clsDisplay} (Raw: ${cls.toFixed(4)})`);
      console.log(`Total Blocking Time (INP proxy): ${tbtDisplay} (Raw: ${tbt.toFixed(1)}ms)`);
      console.log(`Largest Contentful Paint (LCP): ${lcp}`);
      console.log(`First Contentful Paint (FCP): ${fcp}`);
      console.log('=============================================\n');

      if (cls <= 0.1) {
        console.log('✅ CLS is well within the "Good" threshold (<= 0.1).');
      } else {
        console.warn('⚠️ CLS exceeds recommended threshold.');
      }

      if (tbt <= 200) {
        console.log('✅ TBT / Responsiveness is within the "Good" threshold (<= 200ms).');
      }
    }
  } finally {
    console.log('Stopping Next.js server...');
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(server.pid), '/f', '/t'], { shell: true });
    } else {
      server.kill('SIGTERM');
    }
  }
}

run().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
