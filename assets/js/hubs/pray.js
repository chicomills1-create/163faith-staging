/* PRAY (SPEC §3.4) — the Prayer Room scaffold. Wall totals share the one
   counter source (§2 D4); members-only controls state their gate BEFORE the
   click (defect #27 does not recur). */
export function render(root) {
  root.innerHTML = `
    <p class="kicker">Pray · The Prayer Room</p>
    <h1>Leave it <span class="g">on the wall.</span></h1>
    <p class="lede">84 requests open now · 19 prayers lifted. Post yours, lift somebody else's.</p>
    <div class="shelf"><h3>The wall</h3><div class="cards">
      ${[1, 2, 3].map((i) => `<div class="skel"><div class="skel-art"></div><b>Prayer request ${i}</b><span>wall entry</span></div>`).join('')}
    </div></div>
    <div style="margin-top:22px;display:flex;gap:12px;flex-wrap:wrap">
      <button class="btn-gold" type="button">Share your prayer</button>
      <button class="btn-ghost" type="button" disabled title="Members lift prayers — sign-in required">Pray for this · members</button>
    </div>
    <p class="placeholder-note"><b>Scaffold note:</b> posting is server-side and sign-in-gated with the gate visible up front (§3.4); load-more pagination lands at M3.</p>`;
}
