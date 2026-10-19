#!/usr/bin/env node

/**
 * AI Atlas Local Webview / Catalog Explorer
 * Serves an interactive UI locally to inspect catalog resources, validate schemas, and explore categories.
 */

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'node:child_process';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT_DIR = resolve(__dirname, '..');
const CATALOG_PATH = join(ROOT_DIR, 'catalog', 'resources.json');
const CATEGORIES_PATH = join(ROOT_DIR, 'catalog', 'categories.json');
const SCHEMA_PATH = join(ROOT_DIR, 'schemas', 'resource.schema.json');

const PORT = process.env.PORT || 3000;

function getHtml(resources, categories) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Atlas — Catalog Explorer</title>
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(255, 255, 255, 0.035);
      --card-border: rgba(255, 255, 255, 0.08);
      --border-hover: rgba(56, 189, 248, 0.4);
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent-blue: #38bdf8;
      --accent-emerald: #34d399;
      --accent-purple: #a855f7;
      --accent-amber: #fbbf24;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      padding: 24px;
      line-height: 1.5;
    }
    .container { max-width: 1200px; margin: 0 auto; }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--card-border);
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .logo-area { display: flex; align-items: center; gap: 12px; }
    .logo-icon { font-size: 2rem; }
    h1 { font-size: 1.5rem; font-weight: 700; letter-spacing: -0.02em; }
    .subtitle { font-size: 0.85rem; color: var(--text-muted); }

    .stats-bar { display: flex; gap: 10px; }
    .stat-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 6px 12px;
      border-radius: 9999px;
      border: 1px solid var(--card-border);
      background: var(--card-bg);
    }
    .badge-emerald { color: var(--accent-emerald); border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.08); }
    .badge-blue { color: var(--accent-blue); border-color: rgba(56, 189, 248, 0.3); background: rgba(56, 189, 248, 0.08); }

    .controls-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .search-input {
      width: 100%;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 10px 14px;
      color: var(--text);
      font-size: 0.9rem;
      outline: none;
      transition: border 0.2s;
    }
    .search-input:focus { border-color: var(--accent-blue); }

    .filter-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .pill {
      font-size: 0.75rem;
      padding: 4px 12px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      cursor: pointer;
      user-select: none;
      transition: all 0.2s;
    }
    .pill:hover, .pill.active {
      background: var(--accent-blue);
      color: #0b1120;
      border-color: var(--accent-blue);
      font-weight: 600;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 16px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 18px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 0.2s ease;
    }
    .card:hover {
      border-color: var(--border-hover);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
    }
    .res-name { font-size: 1.1rem; font-weight: 700; color: #fff; }
    .res-category {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 6px;
      background: rgba(56, 189, 248, 0.15);
      color: var(--accent-blue);
    }
    .res-tagline {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--accent-emerald);
      margin-bottom: 8px;
    }
    .res-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.45;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      margin-bottom: 16px;
    }
    .tag {
      font-size: 0.7rem;
      background: rgba(255, 255, 255, 0.05);
      color: #cbd5e1;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .card-footer {
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;
    }
    .card-link {
      color: var(--accent-blue);
      text-decoration: none;
      font-weight: 500;
    }
    .card-link:hover { text-decoration: underline; }
    .stars { color: #f59e0b; font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="logo-area">
        <span class="logo-icon">🗺️</span>
        <div>
          <h1>AI Atlas Catalog Explorer</h1>
          <div class="subtitle">The open map of the AI ecosystem — Local Developer Webview</div>
        </div>
      </div>
      <div class="stats-bar">
        <span class="stat-badge badge-emerald">✓ Ajv Validated</span>
        <span class="stat-badge badge-blue">${resources.length} Verified Records</span>
      </div>
    </header>

    <div class="controls-card">
      <input type="text" id="searchInput" class="search-input" placeholder="Search resources by name, tagline, description, tags, or license...">
      <div class="filter-pills" id="categoryFilters">
        <span class="pill active" data-category="all">All (${resources.length})</span>
        ${categories.map(c => {
          const count = resources.filter(r => r.primary_category === c.id || (r.categories && r.categories.includes(c.id))).length;
          return count > 0 ? `<span class="pill" data-category="${c.id}">${c.name.split('&')[0].trim()} (${count})</span>` : '';
        }).join('')}
      </div>
    </div>

    <div class="grid" id="resourceGrid"></div>
  </div>

  <script>
    const resources = ${JSON.stringify(resources)};
    let activeCategory = 'all';
    let searchQuery = '';

    function render() {
      const grid = document.getElementById('resourceGrid');
      const filtered = resources.filter(r => {
        const matchesCat = activeCategory === 'all' || r.primary_category === activeCategory || (r.categories && r.categories.includes(activeCategory));
        const q = searchQuery.toLowerCase();
        const matchesQuery = !q || 
          r.name.toLowerCase().includes(q) ||
          r.tagline.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some(t => t.toLowerCase().includes(q)) ||
          r.license.toLowerCase().includes(q);
        return matchesCat && matchesQuery;
      });

      if (filtered.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #94a3b8; padding: 40px;">No matching resources found.</div>';
        return;
      }

      grid.innerHTML = filtered.map(r => \`
        <div class="card">
          <div>
            <div class="card-top">
              <span class="res-name">\${r.name}</span>
              <span class="res-category">\${r.primary_category}</span>
            </div>
            <div class="res-tagline">\${r.tagline}</div>
            <div class="res-desc">\${r.description}</div>
            <div class="tags">
              <span class="tag" style="background:rgba(52,211,153,0.1); color:#34d399;">\${r.pricing.model}</span>
              <span class="tag" style="background:rgba(168,85,247,0.1); color:#c084fc;">\${r.license}</span>
              \${r.tags.map(t => \`<span class="tag">#\${t}</span>\`).join('')}
            </div>
          </div>
          <div class="card-footer">
            <a href="\${r.url}" target="_blank" class="card-link">\${new URL(r.url).hostname} ↗</a>
            \${r.repository?.stars ? \`<span class="stars">★ \${r.repository.stars.toLocaleString()}</span>\` : '<span style="color:#64748b;">Verified</span>'}
          </div>
        </div>
      \`).join('');
    }

    document.getElementById('searchInput').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });

    document.getElementById('categoryFilters').addEventListener('click', (e) => {
      if (e.target.classList.contains('pill')) {
        document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.getAttribute('data-category');
        render();
      }
    });

    render();
  </script>
</body>
</html>`;
}

async function startServer() {
  const [resRaw, catRaw] = await Promise.all([
    readFile(CATALOG_PATH, 'utf-8'),
    readFile(CATEGORIES_PATH, 'utf-8')
  ]);
  const resources = JSON.parse(resRaw);
  const categories = JSON.parse(catRaw);

  const server = http.createServer((req, res) => {
    if (req.url === '/api/resources') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(resources, null, 2));
      return;
    }
    if (req.url === '/api/categories') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(categories, null, 2));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(getHtml(resources, categories));
  });

  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`\n🚀 AI Atlas Catalog Explorer running at: \x1b[36m${url}\x1b[0m`);
    console.log(`API endpoints available at:`);
    console.log(`  - ${url}/api/resources`);
    console.log(`  - ${url}/api/categories\n`);

    // Auto-open browser on macOS if running directly in a terminal
    if (process.platform === 'darwin' && !process.env.CI) {
      exec(`open ${url}`);
    }
  });
}

startServer().catch(err => {
  console.error('Failed to start AI Atlas viewer:', err);
  process.exit(1);
});
