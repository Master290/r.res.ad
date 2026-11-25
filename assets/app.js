(() => {
  'use strict';

  const SITE = window.RES_SITE || {};
  const RELEASES = window.RES_RELEASES || [];
  const BASE = window.__BASE_PATH__ || './';

  const WIDE_ICON_IDS = new Set(['youtube', 'tidal', 'amazon']);

  const PLATFORM_ICONS = {
    spotify: `<svg viewBox="8.6 3.2 218.8 218.8" aria-hidden="true"><path fill="currentColor" d="m122.37,3.31C61.99.91,11.1,47.91,8.71,108.29c-2.4,60.38,44.61,111.26,104.98,113.66,60.38,2.4,111.26-44.6,113.66-104.98C229.74,56.59,182.74,5.7,122.37,3.31Zm46.18,160.28c-1.36,2.4-4.01,3.6-6.59,3.24-.79-.11-1.58-.37-2.32-.79-14.46-8.23-30.22-13.59-46.84-15.93-16.62-2.34-33.25-1.53-49.42,2.4-3.51.85-7.04-1.3-7.89-4.81-.85-3.51,1.3-7.04,4.81-7.89,17.78-4.32,36.06-5.21,54.32-2.64,18.26,2.57,35.58,8.46,51.49,17.51,3.13,1.79,4.23,5.77,2.45,8.91Zm14.38-28.72c-2.23,4.12-7.39,5.66-11.51,3.43-16.92-9.15-35.24-15.16-54.45-17.86-19.21-2.7-38.47-1.97-57.26,2.16-1.02.22-2.03.26-3.01.12-3.41-.48-6.33-3.02-7.11-6.59-1.01-4.58,1.89-9.11,6.47-10.12,20.77-4.57,42.06-5.38,63.28-2.4,21.21,2.98,41.46,9.62,60.16,19.74,4.13,2.23,5.66,7.38,3.43,11.51Zm15.94-32.38c-2.1,4.04-6.47,6.13-10.73,5.53-1.15-.16-2.28-.52-3.37-1.08-19.7-10.25-40.92-17.02-63.07-20.13-22.15-3.11-44.42-2.45-66.18,1.97-5.66,1.15-11.17-2.51-12.32-8.16-1.15-5.66,2.51-11.17,8.16-12.32,24.1-4.89,48.74-5.62,73.25-2.18,24.51,3.44,47.99,10.94,69.81,22.29,5.12,2.66,7.11,8.97,4.45,14.09Z"/></svg>`,
    apple: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536a1.88 1.88 0 011.038-2.022c.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516a.904.904 0 00.02-.193c0-1.815 0-3.63-.002-5.443a.725.725 0 00-.026-.185c-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.325.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.442-.088.663-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/></svg>`,
    youtube: `<svg viewBox="0 0 28.57 20" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324ZM11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z"/></svg>`,
    tidal: `<svg viewBox="31.99 187.98 936.03 624.02" aria-hidden="true"><g fill="currentColor" transform="matrix(5.2407 0 0 5.2407 500.0032 500.0021)"><g transform="matrix(6.2943 0 0 -6.2943 0.0014 -29.7683)"><path transform="translate(4.7295, 0.001)" d="m 0 0 l -4.729 -4.73 L -9.459 0 l 4.73 4.728 Z"/></g><g transform="matrix(6.2943 0 0 -6.2943 0.0014 29.7656)"><path transform="translate(4.7295, 0)" d="m 0 0 l -4.729 -4.73 L -9.459 0 l 4.73 4.73 Z"/></g><g transform="matrix(6.2943 0 0 -6.2943 -59.5356 -29.769)"><path transform="translate(4.7295, 0.0005)" d="m 0 0 l -4.73 -4.73 L -9.459 0 l 4.729 4.729 Z"/></g><g transform="matrix(6.2943 0 0 -6.2943 59.5352 -29.769)"><path transform="translate(4.7295, 0.0005)" d="m 0 0 l -4.729 -4.73 L -9.459 0 l 4.73 4.729 Z"/></g></g></svg>`,
    qobuz: () => `<img src="${escapeHtml(resolveAsset('assets/icons/qobuz.png'))}" alt="" aria-hidden="true" />`,
    amazon: `<svg viewBox="0 0 89.016 52" aria-hidden="true"><g fill="currentColor" transform="translate(-0.53422889,-18)"><path d="m 59.7,40.5 c -0.6,0.4 -1.5,0.7 -2.6,0.7 -1.7,0 -3.3,-0.2 -4.9,-0.7 -0.4,-0.1 -0.7,-0.2 -0.9,-0.2 -0.3,0 -0.4,0.2 -0.4,0.6 v 1 c 0,0.3 0.1,0.5 0.2,0.7 0.1,0.1 0.3,0.3 0.6,0.4 1.6,0.7 3.4,1 5.4,1 2.1,0 3.7,-0.5 5,-1.5 1.3,-1 1.9,-2.3 1.9,-4 0,-1.2 -0.3,-2.1 -0.9,-2.9 -0.6,-0.7 -1.6,-1.4 -3,-1.9 l -2.8,-1.1 c -1.1,-0.4 -1.9,-0.8 -2.2,-1.2 -0.4,-0.4 -0.6,-0.8 -0.6,-1.5 0,-1.5 1.1,-2.3 3.4,-2.3 1.3,0 2.6,0.2 3.8,0.6 0.4,0.1 0.7,0.2 0.8,0.2 0.3,0 0.5,-0.2 0.5,-0.6 v -1 c 0,-0.3 -0.1,-0.5 -0.2,-0.7 -0.1,-0.2 -0.3,-0.3 -0.6,-0.4 -1.5,-0.5 -3,-0.8 -4.5,-0.8 -1.9,0 -3.5,0.5 -4.7,1.4 -1.2,0.9 -1.8,2.2 -1.8,3.7 0,2.3 1.3,4 3.9,5 l 3,1.1 c 1,0.4 1.6,0.7 2,1.1 0.4,0.4 0.5,0.8 0.5,1.4 0,0.8 -0.3,1.5 -0.9,1.9 z"/><path d="m 44,26.1 v 13.3 c -1.7,1.1 -3.4,1.7 -5.1,1.7 -1.1,0 -1.9,-0.3 -2.4,-0.9 C 36,39.6 35.8,38.7 35.8,37.4 V 26.1 c 0,-0.5 -0.2,-0.7 -0.7,-0.7 H 33 c -0.5,0 -0.7,0.2 -0.7,0.7 v 12.4 c 0,1.7 0.4,3.1 1.3,4 0.9,0.9 2.2,1.4 3.9,1.4 2.3,0 4.6,-0.8 6.8,-2.4 l 0.2,1.2 c 0,0.3 0.1,0.4 0.3,0.5 0.1,0.1 0.3,0.1 0.6,0.1 h 1.5 c 0.5,0 0.7,-0.2 0.7,-0.7 V 26.1 c 0,-0.5 -0.2,-0.7 -0.7,-0.7 h -2.1 c -0.6,0 -0.8,0.3 -0.8,0.7 z"/><path d="m 25,43.4 h 2.1 c 0.5,0 0.7,-0.2 0.7,-0.7 V 30.2 c 0,-1.7 -0.4,-3 -1.3,-3.9 -0.9,-0.9 -2.1,-1.4 -3.8,-1.4 -2.3,0 -4.7,0.8 -7,2.5 -0.8,-1.7 -2.3,-2.5 -4.5,-2.5 -2.2,0 -4.4,0.8 -6.6,2.3 L 4.4,26.1 C 4.4,25.8 4.3,25.7 4.1,25.6 4,25.5 3.8,25.5 3.6,25.5 H 2 c -0.5,0 -0.7,0.2 -0.7,0.7 v 16.6 c 0,0.5 0.2,0.7 0.7,0.7 h 2.1 c 0.5,0 0.7,-0.2 0.7,-0.7 V 29.3 c 1.7,-1 3.4,-1.6 5.2,-1.6 1,0 1.7,0.3 2.1,0.9 0.4,0.6 0.7,1.4 0.7,2.6 v 11.5 c 0,0.5 0.2,0.7 0.7,0.7 h 2.1 c 0.5,0 0.7,-0.2 0.7,-0.7 V 30.4 29.8 c 0,-0.2 0,-0.4 0,-0.5 1.8,-1.1 3.5,-1.6 5.2,-1.6 1,0 1.7,0.3 2.1,0.9 0.4,0.6 0.7,1.4 0.7,2.6 v 11.5 c 0,0.5 0.2,0.7 0.7,0.7 z"/><path d="m 79.5,56.7 c -10.9,4.6 -22.8,6.9 -33.6,6.9 -16,0 -31.5,-4.4 -44,-11.7 -0.2,-0.1 -0.4,-0.2 -0.6,-0.2 -0.7,0 -1.1,0.8 -0.4,1.5 11.6,10.5 27,16.8 44,16.8 12.2,0 26.3,-3.8 36,-11 1.7,-1.2 0.3,-3 -1.4,-2.3 z"/><path d="m 79.2,29.4 c 0.9,-1 2.3,-1.5 4.3,-1.5 1,0 2,0.1 2.9,0.4 0.3,0.1 0.4,0.1 0.6,0.1 0.3,0 0.5,-0.2 0.5,-0.7 v -1 C 87.5,26.4 87.4,26.1 87.3,26 87.2,25.9 87,25.7 86.8,25.6 85.5,25.3 84.2,25 83,25 c -2.8,0 -4.9,0.8 -6.5,2.5 -1.5,1.6 -2.3,4 -2.3,7 0,3 0.7,5.3 2.2,6.9 1.5,1.6 3.6,2.4 6.4,2.4 1.5,0 2.9,-0.2 4,-0.7 0.3,-0.1 0.5,-0.2 0.6,-0.4 0.1,-0.1 0.1,-0.4 0.1,-0.7 v -1 c 0,-0.5 -0.2,-0.7 -0.5,-0.7 -0.1,0 -0.3,0 -0.5,0.1 -1.1,0.3 -2.2,0.5 -3.2,0.5 -1.9,0 -3.3,-0.5 -4.2,-1.5 -0.9,-1 -1.3,-2.6 -1.3,-4.7 v -0.5 c 0.1,-2.2 0.5,-3.8 1.4,-4.8 z"/><path d="M 83.7,66.1 C 88.9,61.7 90.3,52.6 89.2,51.2 88.7,50.6 86.3,50 83.3,50 c -3.2,0 -7,0.7 -9.9,2.7 -0.9,0.6 -0.7,1.4 0.2,1.3 3.1,-0.4 10.1,-1.2 11.4,0.4 1.2,1.6 -1.4,8.2 -2.6,11.1 -0.3,0.9 0.4,1.2 1.3,0.6 z"/><path d="m 69.8,25.4 h -2.1 c -0.5,0 -0.7,0.2 -0.7,0.7 v 16.6 c 0,0.5 0.2,0.7 0.7,0.7 h 2.1 c 0.5,0 0.7,-0.2 0.7,-0.7 V 26.1 c 0,-0.4 -0.2,-0.7 -0.7,-0.7 z"/><path d="M 70.4,18.6 C 70,18.2 69.4,18 68.7,18 c -0.7,0 -1.2,0.2 -1.6,0.6 -0.4,0.4 -0.6,0.9 -0.6,1.5 0,0.6 0.2,1.2 0.6,1.5 0.4,0.4 0.9,0.6 1.6,0.6 0.7,0 1.2,-0.2 1.6,-0.6 0.4,-0.4 0.6,-0.9 0.6,-1.5 0,-0.6 -0.1,-1.2 -0.5,-1.5 z"/></g></svg>`,
    soundcloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.5 8.1v8.4h7.1a2.9 2.9 0 0 0 .3-5.78 4.4 4.4 0 0 0-7.4-2.62zM9.2 9.2h1.2v7.3H9.2zm-2.3 1.1h1.2v6.2H6.9zm-2.3 1.5h1.2v4.7H4.6zm-2.3 1.3h1.2v3.4H2.3z"/></svg>`,
    bandcamp: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M2 17.5L7.8 6.5H22l-5.8 11H2z"/></svg>`,
    beatport: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 3v8.4a4.8 4.8 0 1 0 2.4 4.1V6.2l3.8 2.2 1.2-2.1L13 3zm-2.4 15.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8z"/></svg>`,
    deezer: `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 5h4v2.2h-4zm0 3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm-5.2-3.3h4v2.2h-4zm0 3.3h4v2.2h-4zm-5.1-3.3h4v2.2h-4zm0 3.3h4v2.2h-4zM2.5 14.9h4v2.2h-4z"/></svg>`,
    yandex: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10.4 7.5h2.1v6.1a2.6 2.6 0 1 1-2.1-2.55V7.5zm2.1 0l4.3 1.2v2.1l-4.3-1.2V7.5z"/></svg>`,
    default: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path fill="currentColor" d="M10 8.5l6 3.5-6 3.5z"/></svg>`
  };

  function renderPlatformIcon(id) {
    const entry = PLATFORM_ICONS[id] || PLATFORM_ICONS.default;
    return typeof entry === 'function' ? entry() : entry;
  }

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
      const icon = renderPlatformIcon(svc.id);
      const sizeClass = WIDE_ICON_IDS.has(svc.id) ? 'service-icon--wide' : 'service-icon--square';
      const isPreferred = preferred && preferred === svc.id;
      return `
        <a class="service-row" href="${escapeHtml(svc.url)}" target="_blank" rel="noopener noreferrer" data-service-id="${escapeHtml(svc.id)}">
          <span class="service-left">
            <span class="service-icon ${sizeClass}">${icon}</span>
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
