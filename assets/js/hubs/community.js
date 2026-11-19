/* COMMUNITY (SPEC §3.5) — feed, testimonies, profiles, groups, messages.
   Acceptance is gated on F-COMMUNITY (§2.2): flags + per-category counts are
   read live before any data-carry claim is made for this hub. */
export function render(root) {
  root.innerHTML = `
    <p class="kicker">Community</p>
    <h1>The family <span class="g">talks here.</span></h1>
    <p class="lede">126 members · 50 testimonies · 7 groups. The feed, the stories, and each other.</p>
    <div class="hub-search"><input type="search" placeholder="Find people & posts" aria-label="Search Community"></div>
    <div class="shelf"><h3>Feed</h3><div class="cards">
      ${[1, 2, 3].map((i) => `<div class="skel"><div class="skel-art"></div><b>Post ${i}</b><span>community feed</span></div>`).join('')}
    </div></div>
    <p class="placeholder-note"><b>Scaffold note:</b> this hub's data-carry claim waits on F-COMMUNITY (five restoration flags + row counts + the house-author repair, D14) per §2.2 — it is built against staging data until that leg closes.</p>`;
}
