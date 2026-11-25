/* ============================================================================
   RES RECORDINGS — RELEASE SMART-LINKS CATALOG (r.res.ad)
   ----------------------------------------------------------------------------
   Add new releases to the TOP of RELEASES (newest first = default on r.res.ad).
   After editing, run `python build_pages.py` to generate static /<slug>/index.html
   pages with Open Graph social preview tags.
   ============================================================================ */

window.RES_SITE = {
  domain: 'https://r.res.ad',
  label: 'RES RECORDINGS',
  website: 'https://resrecordings.com',
  soundcloud: 'https://soundcloud.com/resrecordings',
  instagram: 'https://instagram.com/resrecordings',
  instagramHandle: '@RESRECORDINGS',
  copyright: '(P) & (C) 2026 RES RECORDINGS'
};

window.RES_RELEASES = [
  {
    slug: 'res001',
    aliases: ['cross-talk', 'oxide', 'cross-talk-oxide', '001'],
    cat: 'RES001',
    artist: "REMO'S ARCHIVE",
    title: 'CROSS-TALK / OXIDE',
    year: '2026',
    rpm: 45,
    format: 'SINGLE // DIGITAL',
    credits: 'WRITTEN & PRODUCED BY DANIAR MANNANOV',
    cover: 'covers/res001.svg',
    coverFallback: 'covers/res001.jpg',
    ogImage: 'covers/res001-og.jpg',
    tracks: [
      {
        side: 'A1',
        title: 'CROSS-TALK',
        src: 'https://resrecordings.com/RES001-A.mp3'
      },
      {
        side: 'B1',
        title: 'OXIDE',
        src: 'https://resrecordings.com/RES001-B.mp3'
      }
    ],
    links: [
      {
        id: 'spotify',
        name: 'SPOTIFY',
        cta: 'PLAY',
        url: 'https://open.spotify.com/album/13shpsxFQA7IJ5QdCAjkCu?si=Sykv-_dJTV6bv9FcOWzBNw'
      },
      {
        id: 'apple',
        name: 'APPLE MUSIC',
        cta: 'PLAY',
        url: 'https://music.apple.com/album/cross-talk-oxide-single/6839045620'
      },
      {
        id: 'youtube',
        name: 'YOUTUBE',
        cta: 'PLAY',
        url: 'https://youtube.com/playlist?list=OLAK5uy_kUm-1e75G4s1ZXm-W05aCw5UeJRopNtaQ&si=Ex7bPoSbrAtq914a'
      },
      {
        id: 'tidal',
        name: 'TIDAL',
        cta: 'PLAY',
        url: 'https://tidal.com/album/582051845/'
      },
      {
        id: 'qobuz',
        name: 'QOBUZ',
        cta: 'PLAY',
        url: 'https://open.qobuz.com/album/srgi2j8sl4km2'
      },
      {
        id: 'amazon',
        name: 'AMAZON MUSIC',
        cta: 'PLAY',
        url: 'https://music.amazon.com/albums/B0HSTGCGJM'
      }
    ]
  }
];
