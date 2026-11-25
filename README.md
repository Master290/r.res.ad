# r.res.ad — RES Recordings Smart Links

Minimalist, self-hosted release smart-link hub (Feature.fm alternative) for **RES Recordings**.

- Main site: https://resrecordings.com
- Live smart links: https://r.res.ad
- Release `RES001`: https://r.res.ad/res001

## Features

- Dedicated clean URLs per release (`r.res.ad/res001`, `r.res.ad/res002`, plus alias support via `404.html`)
- Static Open Graph & Twitter/X preview cards per release
- Interactive spinning 45 RPM vinyl cover with live audio preview (`A1` / `B1`)
- Streaming platform links (Spotify, Apple Music, YouTube, TIDAL, Qobuz, Amazon Music + built-in icons for SoundCloud, Bandcamp, Beatport, Deezer, Yandex)
- Remembers visitor's last-used music service (`RECENT` badge)
- One-tap `[ SHARE ]` & `[ INVERT ]` light/dark theme toggle
- Direct deep-link shortcut: `r.res.ad/res001?to=spotify`

## Adding a New Release (`RES002`, etc.)

1. Place artwork in `covers/` (e.g. `covers/res002.svg`, `covers/res002.jpg`, and optional `1200x630` `covers/res002-og.jpg`).
2. Add the new release object to the **top** of `window.RES_RELEASES` in `releases.js`.
3. Regenerate static pages & OG metadata:
   ```bash
   python build_pages.py
   ```
4. Commit and push to `main`.
