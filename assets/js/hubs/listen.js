/* LISTEN — the Sanctuary (SPEC §3.2). Scaffold: genre doors + roster shelf
   placeholders + a working demo of the persistent player. Catalog arrives
   per-artist through the API at M3 — never as an embedded bundle (§1.7). */
const DOORS = ['Gospel', 'Choir', 'Worship', 'Hip-Hop', 'R&B Soul', 'Christmas', 'Hymns', 'Prayer', 'Gospel R&B', 'Voices', 'Sermons', 'Healing', 'Spiritual Warfare', 'Sleep & Soaking', 'Kids', 'Choirs & Groups', 'Live'];

export function render(root, { player }) {
  root.innerHTML = `
    <p class="kicker">Listen · The Sanctuary</p>
    <h1>Full songs. <span class="g">No shortcuts.</span></h1>
    <p class="lede">Every track plays full, with its exact official cover — the founder music law. Search lives here, inside the hub.</p>
    <div class="hub-search"><input type="search" placeholder="Search artists & songs — try “CeCe Winans”" aria-label="Search the Sanctuary"></div>
    <div class="shelf"><h3>Genre doors</h3>
      <div class="cards">${DOORS.map((d) => `<div class="skel"><div class="skel-art"></div><b>${d}</b><span>door</span></div>`).join('')}</div>
    </div>
    <div class="shelf"><h3>Player proof (scaffold)</h3>
      <p class="lede" style="margin-bottom:14px">This demo tone plays through the shell's persistent player. Start it, then switch hubs — it keeps playing.</p>
      <button class="btn-gold" type="button" id="demo-play">▶ Play demo tone</button>
    </div>
    <p class="placeholder-note"><b>Scaffold note:</b> doors and roster bind to the per-artist API payloads at M3 (D1: 398 artists / 9,890 releases / 56,324 tracks, re-pinned at F-PIN). Play All, queues and covers land with their §3.2 acceptance battery.</p>`;
  root.querySelector('#demo-play').addEventListener('click', () => {
    player.play({ title: 'Demo tone — scaffold proof', sub: 'Persistent player check', src: 'assets/audio/demo-tone.wav' });
  });
}
