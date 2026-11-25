#!/usr/bin/env python3
"""
Generate static release smart-link pages (index.html, <slug>/index.html, 404.html)
from releases.js so every link has baked-in Open Graph & Twitter preview metadata.

Usage:
    python build_pages.py
"""

import html
import json
import os
import subprocess

ROOT = os.path.dirname(os.path.abspath(__file__))


def load_catalog():
    js_path = os.path.join(ROOT, 'releases.js')
    code = (
        'const fs = require("fs");'
        'const vm = require("vm");'
        'const ctx = { window: {} };'
        f'vm.runInNewContext(fs.readFileSync({json.dumps(js_path)}, "utf8"), ctx);'
        'process.stdout.write(JSON.stringify({ site: ctx.window.RES_SITE, releases: ctx.window.RES_RELEASES }));'
    )
    out = subprocess.check_output(['node', '-e', code], text=True)
    return json.loads(out)


def render_noscript_links(release):
    items = []
    for link in release.get('links', []):
        url = html.escape(link['url'], quote=True)
        name = html.escape(link['name'])
        items.append(f'        <li><a href="{url}">{name}</a></li>')
    return '\n'.join(items)


def render_page(site, release, base_path, canonical_path, release_slug=None, is_404=False):
    domain = site.get('domain', 'https://r.res.ad').rstrip('/')
    label = site.get('label', 'RES RECORDINGS')
    artist = release['artist']
    title = release['title']
    cat = release['cat']
    page_title = f'{artist} — {title} // {label}'
    description = f'Listen to {artist} — {title} ({cat}) on Spotify, Apple Music, YouTube, TIDAL, Qobuz, and Amazon Music.'
    og_image = f"{domain}/{release.get('ogImage', release['coverFallback']).lstrip('./')}"
    canonical_url = f'{domain}{canonical_path}'

    if is_404:
        base_snippet = """  <script>
    (function () {
      var b = location.hostname.endsWith('github.io') && location.pathname.indexOf('/r.res.ad') === 0
        ? '/r.res.ad/'
        : '/';
      var el = document.createElement('base');
      el.href = b;
      document.head.appendChild(el);
      window.__BASE_PATH__ = b;
    })();
  </script>"""
        asset_prefix = ''
    else:
        slug_js = f'\n    window.__RELEASE_SLUG__ = {json.dumps(release_slug)};' if release_slug else ''
        base_snippet = f"""  <script>
    window.__BASE_PATH__ = {json.dumps(base_path)};{slug_js}
  </script>"""
        asset_prefix = base_path

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(page_title)}</title>
  <meta name="description" content="{html.escape(description, quote=True)}" />
  <link rel="canonical" href="{html.escape(canonical_url, quote=True)}" />
{base_snippet}

  <!-- Open Graph / Social Preview -->
  <meta property="og:type" content="music.album" />
  <meta property="og:site_name" content="{html.escape(label, quote=True)}" />
  <meta property="og:title" content="{html.escape(f'{artist} — {title} ({cat})', quote=True)}" />
  <meta property="og:description" content="{html.escape(description, quote=True)}" />
  <meta property="og:url" content="{html.escape(canonical_url, quote=True)}" />
  <meta property="og:image" content="{html.escape(og_image, quote=True)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />

  <!-- Twitter / X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{html.escape(f'{artist} — {title} ({cat})', quote=True)}" />
  <meta name="twitter:description" content="{html.escape(description, quote=True)}" />
  <meta name="twitter:image" content="{html.escape(og_image, quote=True)}" />

  <!-- Favicons -->
  <link rel="icon" type="image/svg+xml" href="{asset_prefix}favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="{asset_prefix}favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="{asset_prefix}favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="{asset_prefix}apple-touch-icon.png" />
  <link rel="manifest" href="{asset_prefix}site.webmanifest" />
  <meta name="theme-color" content="#ffffff" />

  <script>
    (function () {{
      var m = /[?&]theme=(dark|light)(?:&|$)/.exec(location.search);
      var t = m ? m[1] : null;
      if (!t) {{
        try {{ t = localStorage.getItem('res_links_theme'); }} catch (_) {{}}
      }}
      if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    }})();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Silkscreen&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{asset_prefix}assets/app.css" />
</head>
<body>
  <div class="page" id="app">
    <noscript>
      <main style="font-family: monospace; text-transform: uppercase; padding: 24px 0;">
        <h1>{html.escape(artist)} — {html.escape(title)} ({html.escape(cat)})</h1>
        <ul>
{render_noscript_links(release)}
        </ul>
      </main>
    </noscript>
  </div>

  <script src="{asset_prefix}releases.js"></script>
  <script src="{asset_prefix}assets/app.js"></script>
</body>
</html>
"""


def main():
    data = load_catalog()
    site = data['site']
    releases = data['releases']
    if not releases:
        raise SystemExit('No releases found in releases.js')

    latest = releases[0]

    # 1. Root index.html (shows latest release)
    with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(render_page(site, latest, './', '/'))
    print('Wrote index.html')

    # 2. Dedicated /<slug>/index.html for every release
    for rel in releases:
        slug = rel['slug']
        out_dir = os.path.join(ROOT, slug)
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, 'index.html')
        with open(out_file, 'w', encoding='utf-8', newline='\n') as f:
            f.write(render_page(site, rel, '../', f'/{slug}/', release_slug=slug))
        print(f'Wrote {slug}/index.html')

    # 3. Smart 404.html fallback for aliases & case-insensitive slugs
    with open(os.path.join(ROOT, '404.html'), 'w', encoding='utf-8', newline='\n') as f:
        f.write(render_page(site, latest, '/', '/', is_404=True))
    print('Wrote 404.html')


if __name__ == '__main__':
    main()
