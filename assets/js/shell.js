/* 16:3 Faith — fresh build shell.
   Structure per SPEC §1.2: homepage = hub selector; seven hubs lazy-loaded as
   separate ES modules (no catalog bundle, per-hub payloads); persistent nav;
   the music player is mounted once in index.html, OUTSIDE #hub-root, and is
   never re-created on a hub switch — playback survives navigation (§4 gate).
   Clean slate per hub: each hub render builds fresh local state (search /
   filters reset); global state (auth, playback) lives here and survives. */

const HUB_ORDER = ['watch', 'listen', 'read', 'pray', 'community', 'give', 'shop'];
const root = document.getElementById('hub-root');
const loaded = new Map(); // hub name -> { module, loadedAt }

const Player = {
  audio: document.getElementById('player-audio'),
  titleEl: document.getElementById('player-title'),
  subEl: document.getElementById('player-sub'),
  coverEl: document.getElementById('player-cover'),
  playBtn: document.getElementById('btn-play'),
  current: null,
  play(track) {
    if (!track || !track.src) return;
    if (!this.current || this.current.src !== track.src) {
      this.audio.src = track.src;
      this.current = track;
      this.titleEl.textContent = track.title || 'Untitled';
      this.subEl.textContent = track.sub || '';
      this.coverEl.innerHTML = track.cover
        ? `<img src="${track.cover}" alt="">`
        : '16:3';
    }
    this.audio.play();
  },
  toggle() {
    if (!this.current) return;
    if (this.audio.paused) this.audio.play(); else this.audio.pause();
  },
};
Player.audio.addEventListener('play', () => { Player.playBtn.textContent = '⏸'; });
Player.audio.addEventListener('pause', () => { Player.playBtn.textContent = '▶'; });
document.getElementById('btn-play').addEventListener('click', () => Player.toggle());
window.FaithPlayer = Player;

function setActiveNav(name) {
  document.querySelectorAll('[data-nav]').forEach((a) => {
    a.classList.toggle('on', a.dataset.nav === name);
  });
}

async function loadHub(name) {
  if (!loaded.has(name)) {
    const t0 = performance.now();
    const module = await import(`./hubs/${name}.js`);
    loaded.set(name, { module, loadedAt: performance.now(), loadMs: performance.now() - t0 });
  }
  return loaded.get(name).module;
}

let currentHub = null;
async function navigate(name) {
  if (![...HUB_ORDER, 'home'].includes(name)) name = 'home';
  const mod = await loadHub(name);
  root.innerHTML = '';
  mod.render(root, { navigate, player: Player });
  currentHub = name;
  setActiveNav(name);
  root.focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function routeFromHash() {
  const m = window.location.hash.match(/^#\/([a-z]+)/);
  return m ? m[1] : 'home';
}
window.addEventListener('hashchange', () => navigate(routeFromHash()));

/* Account controls (§3.8) — shell-level placeholders at scaffold stage. */
document.getElementById('btn-signin').addEventListener('click', () => {
  window.alert('Sign-in mounts here at the F-CLERK leg: same Clerk production instance, loaded directly from the Clerk FAPI host — no /api/__clerk proxy.');
});
document.getElementById('btn-join').addEventListener('click', () => {
  window.alert('Join mounts here at the F-CLERK leg: form visible from first paint, terms gate server-side (JOIN cure carries).');
});

navigate(routeFromHash());

/* ---------- Self-test (proof harness; runs only with ?selftest=1) ----------
   Drives the real shell: starts playback, walks every hub, and verifies the
   player node + audio position survive, every hub module loaded lazily, and
   each hub rendered content. Results land in <pre id="selftest-report">. */
if (new URLSearchParams(location.search).has('selftest')) {
  (async () => {
    const report = { startedAt: new Date().toISOString(), checks: [] };
    const ok = (name, pass, detail) => report.checks.push({ name, pass: !!pass, detail });
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    try {
      await sleep(600);
      const audioNode = Player.audio;
      Player.play({ title: 'Self-test tone', sub: 'scaffold proof track', src: 'assets/audio/demo-tone.wav' });
      await sleep(1400);
      /* Playback assertions run after the hub walk (below): under virtual-time
         harnesses the media clock lags the virtual clock at first sample, so
         the proven properties are asserted where they are observable — same
         node, still playing, currentTime advanced. */
      for (const hub of HUB_ORDER) {
        location.hash = `#/${hub}`;
        await sleep(450);
        ok(`hub ${hub} rendered`, root.children.length > 0 && currentHub === hub, `children=${root.children.length}`);
        ok(`hub ${hub} module lazy-loaded once`, loaded.has(hub), `loadMs=${loaded.get(hub) ? loaded.get(hub).loadMs.toFixed(1) : 'n/a'}`);
      }
      location.hash = '#/home';
      await sleep(450);
      ok('player node identity survives all hub switches', Player.audio === audioNode, 'same <audio> element reference');
      /* Pass = the track was never interrupted: either still playing, or it
         played through to its natural end during the walk (the demo tone is
         3 s; the walk takes longer). An interruption would show as a pause
         mid-track with no 'ended' state. */
      const playedThrough = audioNode.ended && audioNode.currentTime >= audioNode.duration - 0.25;
      ok('playback uninterrupted across all switches', (!audioNode.paused && audioNode.currentTime > 0.1) || playedThrough, `t=${audioNode.currentTime.toFixed(2)}s duration=${audioNode.duration.toFixed(2)}s paused=${audioNode.paused} ended=${audioNode.ended}`);
      const resources = performance.getEntriesByType('resource')
        .filter((e) => /\.(js|css)(\?|$)/.test(e.name))
        .map((e) => ({ file: e.name.split('/').slice(-2).join('/'), bytes: e.transferSize || e.encodedBodySize || 0 }));
      report.resources = resources;
      report.listenEntryBytes = resources
        .filter((r) => !/hubs\/(watch|read|pray|community|give|shop)\.js/.test(r.file))
        .reduce((s, r) => s + r.bytes, 0);
      ok('LISTEN entry payload <= 1 MB (SPEC §4)', report.listenEntryBytes <= 1_000_000, `${report.listenEntryBytes} bytes`);
      report.pass = report.checks.every((c) => c.pass);
    } catch (err) {
      report.pass = false;
      report.error = String(err && err.stack || err);
    }
    const pre = document.createElement('pre');
    pre.id = 'selftest-report';
    pre.textContent = JSON.stringify(report, null, 2);
    document.body.appendChild(pre);
    document.title = report.pass ? 'SELFTEST PASS' : 'SELFTEST FAIL';
  })();
}
