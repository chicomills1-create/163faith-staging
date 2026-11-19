/* HOME — the visual hub selector (SPEC §3.0). Not a scrolling homepage:
   seven picture-tile doors, live counters, Today's Word entry, and the
   Meet the Pastor piece at selector level (ledger row MTP). */
const TILES = [
  { hub: 'watch',     ico: '▶', name: 'WATCH',     blurb: 'Films, series & teachings' },
  { hub: 'listen',    ico: '♪', name: 'LISTEN',    blurb: 'The Sanctuary — full songs' },
  { hub: 'read',      ico: '✦', name: 'READ',      blurb: 'Bible, devotionals & the book' },
  { hub: 'pray',      ico: '✚', name: 'PRAY',      blurb: 'The Prayer Room' },
  { hub: 'community', ico: '●', name: 'COMMUNITY', blurb: 'Feed, testimonies & members' },
  { hub: 'give',      ico: '♥', name: 'GIVE',      blurb: 'Offerings & partnership' },
  { hub: 'shop',      ico: '◆', name: 'SHOP',      blurb: 'Wear the work — gold on black' },
];
/* Counter values carried from the data census (2026-11-18 rendered reads);
   at M2 these bind to the counters API (one source, SPEC §2 D4). */
const COUNTERS = [
  { n: '126', label: 'Members' },
  { n: '50',  label: 'Testimonies' },
  { n: '84',  label: 'Prayer requests' },
  { n: '19',  label: 'Prayers lifted' },
];

export function render(root, { navigate }) {
  root.innerHTML = `
    <p class="kicker">Commit thy works unto the Lord · Prov 16:3</p>
    <h1>One house.<br><span class="g">Seven doors.</span></h1>
    <p class="lede">Welcome to 16:3 Faith — the futuristic hip-hop church. Pick a door; every hub is one tap away, and the music never stops.</p>
    <div class="counters">${COUNTERS.map((c) => `<div class="counter"><b>${c.n}</b><span>${c.label}</span></div>`).join('')}</div>
    <div class="hubgrid">
      ${TILES.map((t) => `
        <button class="tile" type="button" data-hub="${t.hub}">
          <span class="tile-art"></span><span class="tile-ico">${t.ico}</span>
          <span class="tile-name"><h3>${t.name}</h3><p>${t.blurb}</p></span>
        </button>`).join('')}
    </div>

    <section class="pastor" id="meet-the-pastor">
      <div class="pastor-photo">
        <span class="mono">JM</span>
        <img src="assets/img/pastor.jpg" alt="Pastor Jeremy Mills" onerror="this.remove()">
      </div>
      <div class="pastor-body">
        <p class="kicker">Meet the Pastor</p>
        <h2>Pastor Jeremy <span class="g">“Chico” Mills</span></h2>
        <p><b>Founder &amp; Pastor of 16:3 Faith</b> — and a USAF veteran who believes the church should sound like the future and feel like family. No suit, no tie, no distance: just the Word, the music, and a house where everybody can walk in as they are.</p>
        <p>Every hub in this house carries his conviction from Proverbs 16:3 — commit the work, and let God establish it.</p>
        <p class="pastor-sign">— Pastor Jeremy</p>
      </div>
    </section>`;
  root.querySelectorAll('[data-hub]').forEach((el) => {
    el.addEventListener('click', () => { location.hash = `#/${el.dataset.hub}`; });
  });
}
