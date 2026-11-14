// WoozCode · lapisan interaktif beranda: graf kontribusi hidup, gauge status,
// panel berkas Snippet, arsip Commit, count-up, tilt, reveal. Semua angka dari
// state live yang diterbitkan app.js (event "wz-state") atau bacaan chain sendiri.
(function () {
  const C = window.WOOZ, Z = window.WZ;
  const $ = (id) => document.getElementById(id);
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const RATES = { BROKEN: "2,500", COMPILED: "12,500", SHIPPED: "60,000" };
  let state = window.WZState || null;

  function statusOf(coders) { return coders < 25 ? "BROKEN" : coders <= 100 ? "COMPILED" : "SHIPPED"; }
  function winFrac() {
    const now = Date.now() / 1000;
    if (state && state.open && state.endTs) return Math.min(1, Math.max(0, 1 - (state.endTs - now) / 14400));
    return (now % 14400) / 14400;
  }
  function cdText() {
    if (!state || !state.open || !state.endTs) return "···";
    let s = Math.max(0, state.endTs - Math.floor(Date.now() / 1000));
    const p = (x) => String(x).padStart(2, "0");
    return `${p(Math.floor(s / 3600))}:${p(Math.floor((s % 3600) / 60))}:${p(s % 60)}`;
  }
  function utc(ts) {
    const d = new Date(ts * 1000);
    const p = (x) => String(x).padStart(2, "0");
    return `${p(d.getUTCDate())}/${p(d.getUTCMonth() + 1)} ${p(d.getUTCHours())}:${p(d.getUTCMinutes())} UTC`;
  }

  /* ---------------- contribution graph ---------------- */
  const canvas = $("graphCanvas");
  let cells = [], cols = 0, rows = 7, cellPx = 0, gapPx = 3, cw = 0, ch = 0;
  let pointer = null, ripples = [], graphVisible = false, rafId = null;

  function hash(x, y) { const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return h - Math.floor(h); }
  function rr(ctx, x, y, w, h) {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(x, y, w, h, 2); else ctx.rect(x, y, w, h);
  }

  function buildGraph() {
    if (!canvas) return;
    const w = canvas.parentElement.clientWidth - 40; // plate padding
    if (w <= 0) return;
    const target = w < 560 ? 9 : 11;
    cols = Math.max(24, Math.min(64, Math.floor((w + gapPx) / (target + gapPx))));
    cellPx = (w - (cols - 1) * gapPx) / cols;
    cw = w; ch = rows * cellPx + (rows - 1) * gapPx;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    canvas.style.height = ch + "px";
    canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    cells = [];
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const t = hash(x, y);
      cells.push({ x, y, t, zd: (Math.floor(hash(x + 91, y + 57) * 1000) >= 970) });
    }
    drawGraph(0);
  }

  function drawGraph(now) {
    if (!canvas || !cells.length) return;
    const ctx = canvas.getContext("2d");
    const f = winFrac();
    const coders = state && state.open ? state.coders : 0;
    const heat = state && state.open ? Math.min(1, coders / 110) : 0.35;
    const litLine = 0.22 + 0.78 * heat;
    const sweep = reduced ? -1 : ((now / 11000) % 1.2) - 0.1;
    ctx.clearRect(0, 0, cw, ch);
    for (const c of cells) {
      const px = c.x * (cellPx + gapPx), py = c.y * (cellPx + gapPx);
      const xf = (c.x + 0.5) / cols;
      let fill = "#e9e1cd", alpha = 1;
      if (xf <= f + 0.015 && c.t < litLine) {
        if (c.zd) {
          fill = "#caa22f";
          alpha = reduced ? 1 : 0.72 + 0.28 * Math.sin(now / 480 + c.x);
        } else if (c.t < 0.16) fill = "#141310";
        else if (c.t < 0.42) fill = "#a07c2c";
        else if (c.t < 0.72) fill = "#c9b078";
        else fill = "#ddd0ae";
        // frontier glow
        if (Math.abs(xf - f) < 0.025) alpha = Math.min(1, alpha + 0.25 + 0.2 * Math.sin(now / 300));
      }
      // pointer ripple
      let boost = 0;
      for (const r of ripples) {
        const age = now - r.t0;
        if (age > 750) continue;
        const d = Math.hypot(px + cellPx / 2 - r.x, py + cellPx / 2 - r.y);
        if (d < 78) boost = Math.max(boost, (1 - age / 750) * (1 - d / 78));
      }
      if (pointer) {
        const d = Math.hypot(px + cellPx / 2 - pointer.x, py + cellPx / 2 - pointer.y);
        if (d < 60) boost = Math.max(boost, 0.55 * (1 - d / 60));
      }
      // scan sweep
      if (sweep >= 0 && Math.abs(xf - sweep) < 0.012 && xf <= f + 0.015 && c.t < litLine) boost = Math.max(boost, 0.3);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill;
      const grow = boost * cellPx * 0.24;
      rr(ctx, px - grow / 2, py - grow / 2, cellPx + grow, cellPx + grow);
      ctx.fill();
      if (boost > 0.25 && c.t < litLine) {
        ctx.globalAlpha = boost * 0.5;
        ctx.fillStyle = "#b08d4f";
        rr(ctx, px - grow / 2, py - grow / 2, cellPx + grow, cellPx + grow);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  function graphLoop(now) {
    if (!graphVisible || document.hidden) { rafId = null; return; }
    drawGraph(now);
    rafId = requestAnimationFrame(graphLoop);
  }
  function kickGraph() {
    if (reduced) { drawGraph(0); return; }
    if (rafId === null && graphVisible && !document.hidden) rafId = requestAnimationFrame(graphLoop);
  }
  if (canvas) {
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("pointermove", (e) => { pointer = pos(e); });
    canvas.addEventListener("pointerdown", (e) => { const p = pos(e); ripples.push({ x: p.x, y: p.y, t0: performance.now() }); if (ripples.length > 10) ripples.shift(); });
    canvas.addEventListener("pointerleave", () => { pointer = null; });
    new IntersectionObserver((es) => {
      graphVisible = es[0].isIntersecting;
      if (graphVisible) kickGraph();
    }, { threshold: 0.05 }).observe(canvas);
    document.addEventListener("visibilitychange", kickGraph);
    window.addEventListener("resize", buildGraph);
    buildGraph();
  }

  /* ---------------- typed line ---------------- */
  const typedEl = $("typedLine");
  let typeTimer = null, typeKey = "";
  function stateLines() {
    if (!state || !state.open) {
      return [
        "> press is warming up · status follows unique coders",
        "> broken under 25 · compiled 25 to 100 · shipped over 100",
        "> zero day seed · seed % 1000 >= 970 · pays 250,000 WOOZ",
      ];
    }
    const s = state;
    return [
      `> commit Nº ${fmt(s.commit)} open · ${fmt(s.coders)} unique coders inside`,
      `> projected status ${s.status} · ${RATES[s.status]} WOOZ per sealed snippet`,
      `> ${fmt(s.unclaimed)} sealed snippets still unclaimed · pool pays at claim`,
      `> zero day seed · seed % 1000 >= 970 · pays 250,000 WOOZ`,
    ];
  }
  function runTyper() {
    if (!typedEl) return;
    const lines = stateLines();
    const key = lines.join("|");
    if (key === typeKey && typeTimer) return;
    typeKey = key;
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    if (reduced) { typedEl.textContent = lines[0]; return; }
    let li = 0, ci = 0, del = false;
    const step = () => {
      if (document.hidden) { typeTimer = setTimeout(step, 900); return; }
      const line = stateLines()[li % stateLines().length];
      if (!del) {
        ci++;
        typedEl.textContent = line.slice(0, ci);
        if (ci >= line.length) { del = true; typeTimer = setTimeout(step, 2600); return; }
        typeTimer = setTimeout(step, 26);
      } else {
        ci -= 3;
        if (ci <= 0) { ci = 0; del = false; li++; typedEl.textContent = ""; typeTimer = setTimeout(step, 350); return; }
        typedEl.textContent = line.slice(0, ci);
        typeTimer = setTimeout(step, 12);
      }
    };
    step();
  }

  /* ---------------- gauge ---------------- */
  function applyGauge() {
    const gc = $("gaugeCoders"), marker = $("gaugeMarker"), note = $("gaugeNote");
    if (!state || !state.open) {
      if (gc) gc.textContent = "···";
      if (note) note.textContent = "Reading the running Commit…";
      return;
    }
    const coders = state.coders, st = state.status;
    if (gc) gc.textContent = fmt(coders);
    if (marker) marker.style.left = `calc(${(Math.min(coders, 130) / 130 * 100).toFixed(1)}% - 1px)`;
    for (const [id, name] of [["bandBroken", "BROKEN"], ["bandCompiled", "COMPILED"], ["bandShipped", "SHIPPED"]]) {
      const b = $(id); if (b) b.classList.toggle("on", name === st);
    }
    if (note) {
      let msg;
      if (st === "BROKEN") msg = `<b>${25 - coders} more unique coders</b> lift this Commit into Compiled, worth 12,500 WOOZ per Snippet. Seal in <b id="gaugeSeal">${cdText()}</b>.`;
      else if (st === "COMPILED") msg = `<b>${101 - coders} more unique coders</b> carry this Commit into Shipped, worth 60,000 WOOZ per Snippet. Seal in <b id="gaugeSeal">${cdText()}</b>.`;
      else msg = `Shipped pace, past 100 unique coders. Every Snippet in this Commit claims <b>60,000 WOOZ</b> at seal, in <b id="gaugeSeal">${cdText()}</b>. A Zero Day seed still pays 250,000.`;
      if (note.dataset.st !== st || !note.querySelector("#gaugeSeal")) { note.innerHTML = msg; note.dataset.st = st; }
    }
    const gcom = $("graphCommit");
    if (gcom) gcom.textContent = `Nº ${fmt(state.commit)} · OPEN`;
  }
  setInterval(() => {
    const gs = $("gaugeSeal");
    if (gs) gs.textContent = cdText();
  }, 1000);

  /* ---------------- count-up stats ---------------- */
  function tweenNum(el, to) {
    const from = parseInt((el.dataset.counted || "0"), 10) || 0;
    el.dataset.counted = String(to);
    if (reduced || from === to) { el.textContent = fmt(to); return; }
    if (el._tw) cancelAnimationFrame(el._tw);
    const t0 = performance.now();
    const stepFn = (ts) => {
      const p = Math.min(1, (ts - t0) / 650), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e));
      if (p < 1) el._tw = requestAnimationFrame(stepFn);
      else el._tw = null;
    };
    el._tw = requestAnimationFrame(stepFn);
  }
  for (const id of ["statSnippets", "statCoders", "statUnclaimed"]) {
    const el = $(id);
    if (!el) continue;
    new MutationObserver(() => {
      if (el._tw) return;
      const n = parseInt((el.textContent || "").replace(/[^0-9]/g, ""), 10);
      if (!isNaN(n) && String(n) !== el.dataset.counted) tweenNum(el, n);
    }).observe(el, { childList: true, characterData: true, subtree: true });
  }

  /* ---------------- plate tilt ---------------- */
  const plate = document.querySelector(".plate");
  if (plate && !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    plate.addEventListener("pointermove", (e) => {
      const r = plate.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      plate.classList.add("tilting");
      plate.style.transform = `perspective(1100px) rotateX(${((0.5 - py) * 2.4).toFixed(2)}deg) rotateY(${((px - 0.5) * 3.2).toFixed(2)}deg)`;
      plate.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      plate.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    });
    plate.addEventListener("pointerleave", () => { plate.style.transform = ""; plate.classList.remove("tilting"); });
  }

  /* ---------------- snippet file tabs ---------------- */
  const FILES = {
    commit: [
      `<div class="line"><span class="no">01</span><span><span class="kw">const</span> commit = <span class="fn">open</span>(<span class="stx">"4h window, UTC boundary"</span>);</span></div>`,
      `<div class="line"><span class="no">02</span><span class="cm">// first snippet per wallet: free, Agent ID gated</span></div>`,
      `<div class="line"><span class="no">03</span><span><span class="kw">function</span> <span class="fn">price</span>(n) { <span class="kw">return</span> n == <span class="num">1</span> ? <span class="num">0</span> : n &lt;= <span class="num">5</span> ? <span class="num">0.0002</span> : <span class="num">0.0004</span>; } <span class="cm">// BNB</span></span></div>`,
      `<div class="line"><span class="no">04</span><span>cap = <span class="num">10</span> snippets per wallet, per commit;</span></div>`,
    ],
    claim: [
      `<div class="line"><span class="no">01</span><span><span class="kw">await</span> commit.<span class="fn">seal</span>(); <span class="cm">// status fixed by unique coders</span></span></div>`,
      `<div class="line"><span class="no">02</span><span><span class="fn">claim</span>(snippet) <span class="cm">pays</span> broken <span class="num">2,500</span> · compiled <span class="num">12,500</span> · shipped <span class="num">60,000</span> WOOZ;</span></div>`,
      `<div class="line"><span class="no">03</span><span>fee = <span class="num">0.0002598</span> BNB · shipped + zero day <span class="num">0.0005196</span> BNB;</span></div>`,
      `<div class="line"><span class="no">04</span><span class="cm">// snippet is not burned · one claim per snippet, ever</span></div>`,
    ],
    zero: [
      `<div class="line"><span class="no">01</span><span>seed = <span class="fn">hash</span>(snippet); <span class="cm">// drawn at reveal, on chain</span></span></div>`,
      `<div class="line"><span class="no">02</span><span><span class="kw">if</span> (seed % <span class="num">1000</span> &gt;= <span class="num">970</span>) klass = <span class="stx">"ZERO DAY"</span>;</span></div>`,
      `<div class="line"><span class="no">03</span><span>zeroDay.<span class="fn">claim</span> = <span class="num">250,000</span> WOOZ, whatever the build status;</span></div>`,
      `<div class="line"><span class="no">04</span><span class="cm">// about 3 in 100 snippets land here · gold cells on the graph</span></div>`,
    ],
  };
  const panel = $("filePanel");
  function renderFile(name) {
    if (!panel) return;
    panel.innerHTML = FILES[name].join("");
    const lines = panel.querySelectorAll(".line");
    lines.forEach((ln, i) => {
      if (reduced) ln.classList.add("show");
      else setTimeout(() => ln.classList.add("show"), 60 + i * 110);
    });
  }
  document.querySelectorAll(".ftab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".ftab").forEach((b) => b.classList.toggle("on", b === btn));
      renderFile(btn.dataset.tab);
    });
  });
  renderFile("commit");

  /* ---------------- commit archive ---------------- */
  const archGrid = $("archGrid");
  let archCommit = -1;
  async function loadArchive(cur) {
    if (!archGrid || !cur || cur === archCommit) return;
    archCommit = cur;
    const nums = [];
    for (let n = cur - 1; n >= Math.max(1, cur - 3); n--) nums.push(n);
    if (!nums.length) { archGrid.innerHTML = `<p class="note">No sealed Commits yet. The archive fills from the first seal.</p>`; return; }
    const S = C.sel;
    const calls = [];
    for (const n of nums) {
      calls.push(Z.u256(S.snippetsInCommit, n), Z.u256(S.participantsOf, n), Z.u256(S.statusOf, n), Z.u256(S.commitStart, n), Z.u256(S.commitEnd, n));
    }
    const r = await Z.batch(calls);
    let html = "";
    nums.forEach((n, i) => {
      const b = i * 5;
      const sn = Z.toInt(r[b]), cd = Z.toInt(r[b + 1]), st = Z.toInt(r[b + 2]);
      const name = C.statusNames[st] || "PENDING";
      if (name === "PENDING" || (!sn && !cd)) return;
      html += `<article class="archplate rv">
        <div class="astamp st-${name.toLowerCase()}">${name}</div>
        <div class="ano">Nº ${fmt(n)}</div>
        <div class="awin">${utc(Z.toInt(r[b + 3]))} – ${utc(Z.toInt(r[b + 4]))}</div>
        <div class="arow"><span>SNIPPETS</span><span>${fmt(sn)}</span></div>
        <div class="arow"><span>UNIQUE CODERS</span><span>${fmt(cd)}</span></div>
        <p class="arate">CLAIM RATE · <b>${RATES[name] || "·"} WOOZ</b> PER SNIPPET</p>
      </article>`;
    });
    archGrid.innerHTML = html || `<p class="note">No sealed Commits yet. The archive fills from the first seal.</p>`;
    archGrid.querySelectorAll(".archplate").forEach((p) => revealObs.observe(p));
  }

  /* ---------------- reveal ---------------- */
  const revealObs = new IntersectionObserver((es) => {
    for (const e of es) if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); }
  }, { threshold: 0.1 });
  document.querySelectorAll(".plate, .prog, .spec, .gauge, .files, section.block").forEach((el) => {
    el.classList.add("rv");
    revealObs.observe(el);
  });

  /* ---------------- state wiring ---------------- */
  function onState(s) {
    state = s;
    applyGauge();
    runTyper();
    drawGraph(performance.now());
    if (s && s.open) loadArchive(s.commit);
  }
  document.addEventListener("wz-state", (e) => onState(e.detail));
  if (state) onState(state);
  else { applyGauge(); runTyper(); }
  // Archive fallback: read current commit directly if app state is slow.
  setTimeout(async () => {
    if (archCommit < 0) {
      const cur = Z.toInt(await Z.call(C.snippets, C.sel.currentCommit));
      if (cur > 1) loadArchive(cur);
    }
  }, 6000);
})();
