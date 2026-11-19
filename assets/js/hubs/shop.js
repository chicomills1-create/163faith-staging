/* SHOP (SPEC §3.7) — the current shop page is this hub's design base and
   functional floor: by-type categories, Mens/Womens browse, product dialogs,
   and the proven Printful buy path. Catalog is data-driven from the same
   product set that sells at 163faithshop.com today. */
const CATS = [
  { name: 'Hoodies', n: '7 pieces' }, { name: 'Shirts', n: '3 pieces' },
  { name: 'Crewnecks', n: '1 piece' }, { name: 'Joggers', n: '1 piece' }, { name: 'Headwear', n: '1 piece' },
];
export function render(root) {
  root.innerHTML = `
    <p class="kicker">Shop · Wear the Work</p>
    <h1>Gold on black. <span class="g">Front mark, always.</span></h1>
    <p class="lede">13 real Printful pieces — every front carries the full 16:3 FAITH mark. The line keeps selling at 163faithshop.com until cutover.</p>
    <div class="hub-search"><input type="search" placeholder="Search the line" aria-label="Search the shop"></div>
    <div class="shelf"><h3>Shop by type</h3><div class="cards">
      ${CATS.map((c) => `<div class="skel"><div class="skel-art"></div><b>${c.name}</b><span>${c.n}</span></div>`).join('')}
    </div></div>
    <p class="placeholder-note"><b>Scaffold note:</b> product cards bind to the live catalog (6 launch pieces + 5 Jesus AOP hoodies + Drop 1) with the Printful-storefront buy path at M3; real photography replaces mockups per the sample program (§3.7 product laws).</p>`;
}
