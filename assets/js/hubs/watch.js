/* WATCH (SPEC §3.1) — cinema library scaffold. Shelves + title cards land at
   M3 from the D11 cinema catalog; the hero's WATCH action will open the
   featured title's own player (the #1 cure pattern). */
const SHELVES = ['Faith Films', 'Bible Feature Films', 'Classics', 'Documentaries', 'Kids', 'Series'];

export function render(root) {
  root.innerHTML = `
    <p class="kicker">Watch</p>
    <h1>Stories that <span class="g">carry the faith.</span></h1>
    <p class="lede">Films and series, each opening its own title in the player — never a bare hub link.</p>
    <div class="hub-search"><input type="search" placeholder="Search films & series" aria-label="Search Watch"></div>
    ${SHELVES.map((s) => `<div class="shelf"><h3>${s}</h3><div class="cards">
      ${[1, 2, 3].map((i) => `<div class="skel"><div class="skel-art"></div><b>Title ${i}</b><span>${s}</span></div>`).join('')}
    </div></div>`).join('')}
    <p class="placeholder-note"><b>Scaffold note:</b> the 10-title acceptance sample (incl. The Chosen, Augustine, Ten Commandments with measured runtimes) grades this hub at M3 per §3.1.</p>`;
}
