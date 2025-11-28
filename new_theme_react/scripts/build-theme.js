import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const dashboardBladePath = path.join(distDir, 'dashboard.blade.php');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

let html = fs.readFileSync(indexHtmlPath, 'utf-8');

// Replace assets path
// Vite builds with base './', so paths look like "./assets/..." or "assets/..."
// We replace "./assets/" or "/assets/" or "assets/" with "/theme/{{$theme}}/assets/"
html = html.replace(/(src|href)=["'](\.?\/)?assets\//g, '$1="/theme/{{$theme}}/assets/');

// Inject window.settings
// We'll inject it before the closing head tag to ensure it's available early, or at start of body
const settingsScript = `
  <script>
    window.routerBase = "/";
    window.settings = {
      title: '{{$title}}',
      assets_path: '/theme/{{$theme}}/assets',
      theme: {
        color: '{{ $theme_config['theme_color'] ?? "default" }}',
      },
      version: '{{$version}}',
      background_url: '{{$theme_config['background_url']}}',
      description: '{{$description}}',
      i18n: [
        'zh-CN',
        'en-US',
        'ja-JP',
        'vi-VN',
        'ko-KR',
        'zh-TW',
        'fa-IR'
      ],
      logo: '{{$logo}}'
    }
  </script>
`;

// Inject settings script before </head>
html = html.replace('</head>', settingsScript + '</head>');

// Inject custom html at the end of body
html = html.replace('</body>', '{!! $theme_config[\'custom_html\'] !!}</body>');

// Write dashboard.blade.php
fs.writeFileSync(dashboardBladePath, html);
console.log('Created dist/dashboard.blade.php');

// Copy config.json
const configSrc = path.resolve(__dirname, '../config.json');
const configDest = path.join(distDir, 'config.json');
fs.copyFileSync(configSrc, configDest);
console.log('Copied config.json');

console.log('Theme build complete.');
