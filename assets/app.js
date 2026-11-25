(() => {
  'use strict';

  const SITE = window.RES_SITE || {};
  const RELEASES = window.RES_RELEASES || [];
  const BASE = window.__BASE_PATH__ || './';

  const PLATFORM_ICONS = {
    spotify: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm4.58 14.42a.75.75 0 0 1-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 0 1-.33-1.46c4.58-1.05 8.51-.6 11.66 1.33.36.22.47.69.25 1.04zm1.22-2.72a.94.94 0 0 1-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 0 1-.55-1.8c4.37-1.33 9.79-.68 13.5 1.6.44.27.58.85.31 1.29zm.11-2.83C14.04 8.57 7.65 8.36 3.95 9.48a1.12 1.12 0 1 1-.65-2.15c4.25-1.29 11.31-1.04 15.77 1.61a1.12 1.12 0 0 1-1.16 1.93z"/></svg>`,
    apple: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.5 3.2L9.8 5.1c-.46.09-.8.5-.8.97v9.78c-.64-.31-1.43-.4-2.25-.21-1.66.38-2.82 1.7-2.59 2.94.23 1.25 1.76 1.95 3.42 1.57 1.46-.34 2.47-1.38 2.52-2.46V9.26l8.4-1.66v6.56c-.64-.31-1.43-.4-2.25-.21-1.66.38-2.82 1.7-2.59 2.94.23 1.25 1.76 1.95 3.42 1.57 1.48-.34 2.52-1.42 2.52-2.56V4.16c0-.58-.53-1.07-1.1-.96z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.58 7.19a2.75 2.75 0 0 0-1.94-1.95C17.93 4.78 12 4.78 12 4.78s-5.93 0-7.64.46A2.75 2.75 0 0 0 2.42 7.2 28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.75 2.75 0 0 0 1.94 1.95c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.75 2.75 0 0 0 1.94-1.95A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81zM10 15.12V8.88L15.4 12 10 15.12z"/></svg>`,
    tidal: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.67 6.5L8.33 10.17 4.67 13.83 1 10.17 4.67 6.5zm7.33 0l3.67 3.67-3.67 3.66-3.67-3.66L12 6.5zm7.33 0L23 10.17l-3.67 3.66-3.66-3.66L19.33 6.5zM12 13.83l3.67 3.67L12 21.17 8.33 17.5 12 13.83z"/></svg>`,
    qobuz: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5a9.5 9.5 0 1 0 5.45 17.28l2.58 2.58 1.56-1.56-2.58-2.58A9.5 9.5 0 0 0 12 2.5zm0 2.4a7.1 7.1 0 1 1 0 14.2 7.1 7.1 0 0 1 0-14.2zm0 4.55a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1z"/></svg>`,
    amazon: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3a7.5 7.5 0 0 0-7.5 7.5v3.2a2.8 2.8 0 0 0 2.8 2.8h.7v-6h-.7c-.4 0-.7.1-1 .2v-.2a5.7 5.7 0 1 1 11.4 0v.2c-.3-.1-.6-.2-1-.2H16v6h.7a2.8 2.8 0 0 0 2.8-2.8v-3.2A7.5 7.5 0 0 0 12 3zm-7.8 15.6c2.3 1.7 5.2 2.6 8.1 2.6 2.7 0 5.4-.8 7.6-2.2.3-.2.1-.7-.3-.5-2.1.9-4.7 1.4-7.2 1.4-2.6 0-5.2-.7-7.5-1.9-.4-.2-.9.3-.7.6z"/></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.5 8.1v8.4h7.1a2.9 2.9 0 0 0 .3-5.78 4.4 4.4 0 0 0-7.4-2.62zM9.2 9.2h1.2v7.3H9.2zm-2.3 1.1h1.2v6.2H6.9zm-2.3 1.5h1.2v4.7H4.6zm-2.3 1.3h1.2v3.4H2.3z"/></svg>`,
    bandcamp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 17.5L7.8 6.5H22l-5.8 11H2z"/></svg>`,
    beatport: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 3v8.4a4.8 4.8 0 1 0 2.4 4.1V6.2l3.8 2.2 1.2-2.1L13 3zm-2.4 15.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8z"/></svg>`,
    deezer: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 5h4v2.2h-4zm0 3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm-5.2-3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm-5.1-3.3h4v2.2h-4zm0 3.3h4v2.2h-4zM2.5 14.9h4v2.2h-4z"/></svg>`,
    yandex: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10.4 7.5h2.1v6.1a2.6 2.6 0 1 1-2.1-2.55V7.5zm2.1 0l4.3 1.2v2.1l-4.3-1.2V7.5z"/></svg>`,
    default: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10 8.5l6 3.5-6 3.5z"/></svg>`
  };

  const PLAY_SVG = `<svg viewBox="0 0 12 12" aria-hidden="true"><polygon fill="currentColor" points="2,1 11,6 2,11"/></svg>`;
  const STOP_SVG = `<svg viewBox="0 0 12 12" aria-hidden="true"><rect fill="currentColor" x="2" y="2" width="8" height="8"/></svg>`;

  function resolveAsset(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return BASE + path.replace(/^\.?\//, '');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return '00:00';
    const total = Math.floor(sec);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function findReleaseBySlug(slug) {
    if (!slug) return null;
    const norm = slug.toLowerCase().replace(/^\/+|\/+$/g, '');
    return RELEASES.find((r) => {
      if (r.slug.toLowerCase() === norm || r.cat.toLowerCase() === norm) return true;
      return Array.isArray(r.aliases) && r.aliases.some((a) => a.toLowerCase() === norm);
    }) || null;
  }

  function resolveRoute() {
    const params = new URLSearchParams(window.location.search);

    if (params.get('view') === 'all') {
      return { mode: 'archive', release: RELEASES[0] || null };
    }

    const qSlug = params.get('r') || params.get('release');
    if (qSlug) {
      const match = findReleaseBySlug(qSlug);
      if (match) return { mode: 'release', release: match };
    }

    if (window.__RELEASE_SLUG__) {
      const match = findReleaseBySlug(window.__RELEASE_SLUG__);
      if (match) return { mode: 'release', release: match };
    }

    // Match last non-empty pathname segment (works on both r.res.ad/res001 and github.io/r.res.ad/res001)
    const segments = window.location.pathname
      .split('/')
      .filter((s) => s && s !== 'index.html' && s !== '404.html');
    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i].toLowerCase();
      if (seg === 'all' || seg === 'catalog') {
        return { mode: 'archive', release: RELEASES[0] || null };
      }
      const match = findReleaseBySlug(seg);
      if (match) return { mode: 'release', release: match };
    }

    return { mode: 'release', release: RELEASES[0] || null };
  }

  // Optional direct jump: r.res.ad/res001?to=spotify
  function checkDirectRedirect(release) {
    if (!release) return false;
    const to = (new URLSearchParams(window.location.search).get('to') || '').toLowerCase();
    if (!to) return false;
    const target = (release.links || []).find((l) => l.id.toLowerCase() === to);
    if (target && target.url) {
      window.location.replace(target.url);
      return true;
    }
    return false;
  }

  // Theme management
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme, persist = true) {
    const dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', dark ? '#080808' : '#ffffff');
    }
    const btn = document.getElementById('themeBtn');
    if (btn) btn.classList.toggle('active', dark);
    if (persist) {
      try { localStorage.setItem('res_links_theme', dark ? 'dark' : 'light'); } catch (_) {}
    }
  }

  function initTheme() {
    const paramTheme = new URLSearchParams(window.location.search).get('theme');
    if (paramTheme === 'dark' || paramTheme === 'light') {
      applyTheme(paramTheme, false);
      return;
    }
    try {
      const saved = localStorage.getItem('res_links_theme');
      if (saved === 'dark' || saved === 'light') {
        applyTheme(saved, false);
        return;
      }
    } catch (_) {}
    applyTheme('light', false);
  }

  // Preferred streaming service memory
  function getPreferredService() {
    try { return localStorage.getItem('res_preferred_service') || ''; } catch (_) { return ''; }
  }

  function setPreferredService(id) {
    try { localStorage.setItem('res_preferred_service', id); } catch (_) {}
  }

  // Audio preview + smooth 45 RPM vinyl physics
  const audio = new Audio();
  audio.preload = 'none';
  audio.crossOrigin = 'anonymous';

  let activeRelease = null;
  let activeTrackIdx = 0;
  let isPlaying = false;
  let angle = 0;
  let velocity = 0;
  let rafId = null;
  let lastFrame = null;

  function stepDisc(ts) {
    if (lastFrame === null) lastFrame = ts;
    const dt = Math.max(0.002, Math.min((ts - lastFrame) / 1000, 0.05));
    lastFrame = ts;

    const targetDegPerSec = isPlaying ? ((activeRelease && activeRelease.rpm ? activeRelease.rpm : 45) / 60) * 360 : 0;
    const rate = isPlaying ? 6.5 : 2.8;
    velocity += (targetDegPerSec - velocity) * (1 - Math.exp(-rate * dt));
    if (!isPlaying && Math.abs(velocity) < 0.6) velocity = 0;

    angle = (angle + velocity * dt) % 360;
    const disc = document.getElementById('vinylDisc');
    if (disc) {
      disc.style.transform = `rotate(${angle.toFixed(2)}deg)`;
    }

    if (isPlaying || Math.abs(velocity) > 0.2) {
      rafId = requestAnimationFrame(stepDisc);
    } else {
      lastFrame = null;
      rafId = null;
    }
  }

  function ensureSpinLoop() {
    if (!rafId) {
      lastFrame = null;
      rafId = requestAnimationFrame(stepDisc);
    }
  }

  function syncPlayerUI() {
    const trigger = document.getElementById('vinylTrigger');
    const spindle = document.getElementById('spindleBtn');
    const dot = document.getElementById('statusDot');
    const status = document.getElementById('previewStatus');
    const timeEl = document.getElementById('previewTime');
    const fill = document.getElementById('previewFill');

    if (trigger) trigger.classList.toggle('playing', isPlaying);
    if (spindle) spindle.innerHTML = isPlaying ? STOP_SVG : PLAY_SVG;
    if (dot) dot.classList.toggle('spinning', isPlaying);

    document.querySelectorAll('.track-pill').forEach((btn, idx) => {
      const active = idx === activeTrackIdx && isPlaying;
      btn.classList.toggle('active', active);
      const iconSlot = btn.querySelector('.pill-icon');
      if (iconSlot) iconSlot.innerHTML = active ? STOP_SVG : PLAY_SVG;
    });

    const tracks = (activeRelease && activeRelease.tracks) || [];
    const tr = tracks[activeTrackIdx];
    if (status && tr) {
      if (isPlaying && audio.readyState < 3 && audio.paused === false) {
        status.textContent = `LOADING // ${tr.side}. ${tr.title}`;
      } else {
        status.textContent = isPlaying
          ? `PREVIEW // ${tr.side}. ${tr.title}`
          : 'AUDIO PREVIEW';
      }
    }

    const dur = Number.isFinite(audio.duration) ? audio.duration : 0;
    const cur = Number.isFinite(audio.currentTime) ? audio.currentTime : 0;
    if (timeEl) {
      timeEl.textContent = dur > 0 ? `${formatTime(cur)} / ${formatTime(dur)}` : '00:00 / --:--';
    }
    if (fill) {
      const pct = dur > 0 ? Math.min(100, Math.max(0, (cur / dur) * 100)) : 0;
      fill.style.width = `${pct.toFixed(2)}%`;
    }
  }

  function updateMediaSession() {
    if (!('mediaSession' in navigator) || !activeRelease) return;
    const tr = (activeRelease.tracks || [])[activeTrackIdx];
    if (!tr) return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `${tr.side}. ${tr.title}`,
        artist: activeRelease.artist,
        album: `${activeRelease.cat} — ${SITE.label || 'RES RECORDINGS'}`,
        artwork: [
          { src: resolveAsset(activeRelease.coverFallback), sizes: '1000x1000', type: 'image/jpeg' }
        ]
      });
      navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
    } catch (_) {}
  }

  function playTrack(idx) {
    if (!activeRelease || !activeRelease.tracks || !activeRelease.tracks[idx]) return;
    const tr = activeRelease.tracks[idx];
    const sameTrack = idx === activeTrackIdx && audio.src === tr.src;

    if (sameTrack && isPlaying) {
      audio.pause();
      isPlaying = false;
      syncPlayerUI();
      updateMediaSession();
      ensureSpinLoop();
      return;
    }

    activeTrackIdx = idx;
    if (audio.src !== tr.src) {
      audio.src = tr.src;
      audio.currentTime = 0;
    }
    isPlaying = true;
    syncPlayerUI();
    ensureSpinLoop();

    audio.play().then(() => {
      syncPlayerUI();
      updateMediaSession();
    }).catch(() => {
      isPlaying = false;
      syncPlayerUI();
    });
  }

  function toggleCurrentTrack() {
    playTrack(activeTrackIdx);
  }

  audio.addEventListener('timeupdate', syncPlayerUI);
  audio.addEventListener('loadedmetadata', syncPlayerUI);
  audio.addEventListener('playing', syncPlayerUI);
  audio.addEventListener('waiting', syncPlayerUI);
  audio.addEventListener('pause', () => {
    isPlaying = false;
    syncPlayerUI();
    ensureSpinLoop();
  });
  audio.addEventListener('ended', () => {
    const tracks = (activeRelease && activeRelease.tracks) || [];
    if (tracks.length > 1 && activeTrackIdx + 1 < tracks.length) {
      playTrack(activeTrackIdx + 1);
    } else {
      isPlaying = false;
      audio.currentTime = 0;
      syncPlayerUI();
      ensureSpinLoop();
    }
  });

  async function loadCoverInto(slot, release) {
    const svgSrc = resolveAsset(release.cover);
    const fbSrc = resolveAsset(release.coverFallback);

    if (svgSrc && svgSrc.toLowerCase().endsWith('.svg')) {
      try {
        const res = await fetch(svgSrc);
        if (res.ok) {
          const text = await res.text();
          if (text.includes('<svg')) {
            slot.innerHTML = text;
            return;
          }
        }
      } catch (_) {}
    }

    const img = new Image();
    img.alt = `${release.cat} — ${release.artist} — ${release.title}`;
    img.draggable = false;
    img.onerror = () => {
      if (fbSrc && img.src !== fbSrc) img.src = fbSrc;
    };
    img.src = fbSrc || svgSrc;
    slot.innerHTML = '';
    slot.appendChild(img);
  }

  async function shareCurrentPage(btn) {
    const rel = activeRelease;
    const shareUrl = rel
      ? `${SITE.domain || window.location.origin}/${rel.slug}`
      : window.location.href;
    const shareTitle = rel
      ? `${rel.artist} — ${rel.title} (${rel.cat})`
      : (SITE.label || 'RES RECORDINGS');

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
        return;
      } catch (_) {}
    }

    const confirm = () => {
      const prev = btn.textContent;
      btn.textContent = '[ COPIED ]';
      setTimeout(() => { btn.textContent = prev; }, 1600);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(confirm).catch(() => {});
    }
  }

  function renderTopbar(mode) {
    const showAllBtn = RELEASES.length > 1;
    const allLabel = mode === 'archive' ? '[ LATEST ]' : '[ RELEASES ]';
    return `
      <header class="topbar">
        <a class="brand-link" href="${escapeHtml(SITE.website || 'https://resrecordings.com')}" target="_blank" rel="noopener noreferrer">
          <span class="status-dot" id="statusDot"></span>
          <span>${escapeHtml(SITE.label || 'RES RECORDINGS')}</span>
        </a>
        <div class="topbar-actions">
          ${showAllBtn ? `<button class="hud-btn" type="button" id="catalogToggleBtn">${allLabel}</button>` : ''}
          <button class="hud-btn" type="button" id="shareBtn">[ SHARE ]</button>
          <button class="hud-btn" type="button" id="themeBtn">[ INVERT ]</button>
        </div>
      </header>
    `;
  }

  function renderFooter(release) {
    const creditsLine = release && release.credits ? `${escapeHtml(release.credits)} &middot; ` : '';
    return `
      <footer class="footer">
        <nav class="footer-links" aria-label="RES Recordings links">
          <a class="hud-btn" href="${escapeHtml(SITE.website || 'https://resrecordings.com')}" target="_blank" rel="noopener noreferrer">[ RESRECORDINGS.COM ]</a>
          <a class="hud-btn" href="${escapeHtml(SITE.soundcloud || 'https://soundcloud.com/resrecordings')}" target="_blank" rel="noopener noreferrer me">[ SOUNDCLOUD ]</a>
          <a class="hud-btn" href="${escapeHtml(SITE.instagram || 'https://instagram.com/resrecordings')}" target="_blank" rel="noopener noreferrer me">[ INSTAGRAM ]</a>
        </nav>
        <p class="footer-copy">${creditsLine}${escapeHtml(SITE.copyright || '(P) & (C) 2026 RES RECORDINGS')}</p>
      </footer>
    `;
  }

  function renderReleaseView(release) {
    activeRelease = release;
    activeTrackIdx = 0;
    document.title = `${release.artist} — ${release.title} // ${SITE.label || 'RES RECORDINGS'}`;

    const preferred = getPreferredService();
    const hasTracks = Array.isArray(release.tracks) && release.tracks.length > 0;

    const previewHtml = hasTracks ? `
      <section class="preview-dock" aria-label="Audio preview">
        <div class="preview-header">
          <span id="previewStatus">AUDIO PREVIEW</span>
          <span class="preview-time" id="previewTime">00:00 / --:--</span>
        </div>
        <div class="track-pills">
          ${release.tracks.map((tr, i) => `
            <button class="track-pill" type="button" data-track-idx="${i}">
              <span class="pill-icon">${PLAY_SVG}</span>
              <span>${escapeHtml(tr.side)}. ${escapeHtml(tr.title)}</span>
            </button>
          `).join('')}
        </div>
        <div class="preview-bar" id="previewBar" role="slider" tabindex="0" aria-label="Preview progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">
          <div class="preview-bar-track">
            <div class="preview-bar-fill" id="previewFill"></div>
          </div>
        </div>
      </section>
    ` : '';

    const servicesHtml = (release.links || []).map((svc) => {
      const icon = PLATFORM_ICONS[svc.id] || PLATFORM_ICONS.default;
      const isPreferred = preferred && preferred === svc.id;
      return `
        <a class="service-row" href="${escapeHtml(svc.url)}" target="_blank" rel="noopener noreferrer" data-service-id="${escapeHtml(svc.id)}">
          <span class="service-left">
            <span class="service-icon">${icon}</span>
            <span class="service-name">${escapeHtml(svc.name)}</span>
          </span>
          <span class="service-right">
            ${isPreferred ? '<span class="service-badge">RECENT</span>' : ''}
            <span class="service-cta">${escapeHtml(svc.cta || 'PLAY')} &rarr;</span>
          </span>
        </a>
      `;
    }).join('');

    const app = document.getElementById('app');
    app.innerHTML = `
      ${renderTopbar('release')}

      <main class="release-shell">
        <div class="vinyl-stage">
          <button class="vinyl-trigger" id="vinylTrigger" type="button" aria-label="Play or pause audio preview">
            <div class="vinyl-disc" id="vinylDisc">
              <div class="vinyl-cover-slot" id="vinylCoverSlot"></div>
            </div>
            ${hasTracks ? `<span class="spindle-btn" id="spindleBtn" aria-hidden="true">${PLAY_SVG}</span>` : ''}
          </button>

          <div class="release-meta">
            <div class="release-kicker">${escapeHtml(release.cat)} // ${escapeHtml(release.format)} // ${escapeHtml(release.year)}</div>
            <h1 class="release-artist">${escapeHtml(release.artist)}</h1>
            <p class="release-title">${escapeHtml(release.title)}</p>
          </div>
        </div>

        ${previewHtml}

        <section class="services-section" aria-label="Streaming services">
          <div class="section-label">
            <span>CHOOSE MUSIC SERVICE</span>
            <span>${(release.links || []).length} PLATFORMS</span>
          </div>
          <div class="services-list">
            ${servicesHtml}
          </div>
        </section>
      </main>

      ${renderFooter(release)}
    `;

    loadCoverInto(document.getElementById('vinylCoverSlot'), release);
    bindCommonHandlers('release');

    const trigger = document.getElementById('vinylTrigger');
    if (trigger && hasTracks) {
      trigger.addEventListener('click', toggleCurrentTrack);
    }

    document.querySelectorAll('.track-pill').forEach((btn) => {
      btn.addEventListener('click', () => playTrack(Number(btn.dataset.trackIdx)));
    });

    const bar = document.getElementById('previewBar');
    if (bar) {
      const seekFromEvent = (e) => {
        const rect = bar.getBoundingClientRect();
        if (rect.width <= 0) return;
        const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
          audio.currentTime = frac * audio.duration;
          syncPlayerUI();
        } else {
          playTrack(activeTrackIdx);
        }
      };
      bar.addEventListener('pointerdown', seekFromEvent);
    }

    document.querySelectorAll('.service-row').forEach((row) => {
      row.addEventListener('click', () => {
        setPreferredService(row.dataset.serviceId || '');
      });
    });

    syncPlayerUI();
  }

  function renderArchiveView() {
    audio.pause();
    isPlaying = false;
    document.title = `RELEASES // ${SITE.label || 'RES RECORDINGS'}`;

    const cards = RELEASES.map((rel) => `
      <a class="archive-card" href="${escapeHtml(resolveAsset(rel.slug + '/'))}">
        <div class="archive-thumb">
          <img src="${escapeHtml(resolveAsset(rel.coverFallback))}" alt="${escapeHtml(rel.cat)} — ${escapeHtml(rel.artist)}" />
        </div>
        <div class="archive-info">
          <span class="archive-cat">${escapeHtml(rel.cat)} // ${escapeHtml(rel.year)}</span>
          <span class="archive-name">${escapeHtml(rel.artist)} — ${escapeHtml(rel.title)}</span>
        </div>
        <span class="service-cta">OPEN &rarr;</span>
      </a>
    `).join('');

    const app = document.getElementById('app');
    app.innerHTML = `
      ${renderTopbar('archive')}
      <main class="archive-shell">
        <div class="section-label">
          <span>ALL RELEASES</span>
          <span>${RELEASES.length} CATALOG ITEMS</span>
        </div>
        <div class="archive-grid">${cards}</div>
      </main>
      ${renderFooter(null)}
    `;

    bindCommonHandlers('archive');
  }

  function bindCommonHandlers(mode) {
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      themeBtn.classList.toggle('active', isDark);
      themeBtn.addEventListener('click', () => {
        document.documentElement.classList.add('theme-ready');
        const dark = document.documentElement.getAttribute('data-theme') === 'dark';
        applyTheme(dark ? 'light' : 'dark');
      });
    }

    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => shareCurrentPage(shareBtn));
    }

    const catalogBtn = document.getElementById('catalogToggleBtn');
    if (catalogBtn) {
      catalogBtn.addEventListener('click', () => {
        if (mode === 'archive') {
          renderReleaseView(RELEASES[0]);
        } else {
          renderArchiveView();
        }
      });
    }
  }

  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = document.activeElement && document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.code === 'Space' && activeRelease) {
      e.preventDefault();
      toggleCurrentTrack();
    } else if (e.key === 'i' || e.key === 'I') {
      document.documentElement.classList.add('theme-ready');
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(dark ? 'light' : 'dark');
    }
  });

  // Boot
  initTheme();
  const route = resolveRoute();
  if (route.mode === 'release' && checkDirectRedirect(route.release)) return;
  if (route.mode === 'archive' || !route.release) {
    renderArchiveView();
  } else {
    renderReleaseView(route.release);
  }
})();
