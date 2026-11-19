/* GIVE (SPEC §3.6) — offering scaffold. The Stripe pipeline is test-proven
   end-to-end (2026-11-15); the live key filing is a named cutover
   prerequisite, not a build task. This hub builds against test mode. */
export function render(root) {
  root.innerHTML = `
    <p class="kicker">Give</p>
    <h1>Sow it <span class="g">forward.</span></h1>
    <p class="lede">Offerings and Partner membership ($16.30) run on the proven Stripe pipeline.</p>
    <div class="shelf"><h3>Give an offering</h3><div class="cards">
      ${['$5', '$25', '$50', 'Custom'].map((a) => `<div class="skel"><div class="skel-art"></div><b>${a}</b><span>offering</span></div>`).join('')}
    </div></div>
    <p class="placeholder-note"><b>Scaffold note:</b> checkout session → payment → webhook was proven whole in test mode on 2026-11-15. The live leg closes only when the valid live key is filed in the new API's env (§3.6 prerequisite — founder's Stripe code); until then this hub is honestly labeled test-mode.</p>`;
}
