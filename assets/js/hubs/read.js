/* READ (SPEC §3.3) — Bible (66 books, KJV), devotionals (209 entries), the
   Book. Scaffold shelves; reference search must return “John 3:16” whole —
   whitespace is never stripped (defect #26 does not recur). */
export function render(root) {
  root.innerHTML = `
    <p class="kicker">Read</p>
    <h1>The Word, <span class="g">wide open.</span></h1>
    <p class="lede">The full Bible with read-aloud narration, 209 devotionals, and the book — one tap from anywhere in the house.</p>
    <div class="hub-search"><input type="search" placeholder="Search the Bible — try “John 3:16”" aria-label="Search the Bible"></div>
    <div class="shelf"><h3>Today</h3><div class="cards">
      <div class="skel"><div class="skel-art"></div><b>Today's Word</b><span>daily verse & reflection</span></div>
      <div class="skel"><div class="skel-art"></div><b>Devotionals</b><span>209 entries</span></div>
      <div class="skel"><div class="skel-art"></div><b>The Book</b><span>read the sample</span></div>
    </div></div>
    <p class="placeholder-note"><b>Scaffold note:</b> chapter navigation, narration with verse highlighting, and Continue Reading land at M3; <b>/books</b> redirects to <b>/book</b> per the settled §3.3 disposition.</p>`;
}
