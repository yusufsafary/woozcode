// GITSKIT app: bilingual UI (zh-CN default, EN toggle) + chain-driven panels.
let LANG = localStorage.getItem("wz-lang") || "zh";

const PROMPTS = {
  zh: "请用我的币安智能钱包在 BSC 上铸造一枚 WoozCode Pass（完全免费）。请按照 https://woozcode.fun/wooz-skill.md 中的说明操作：检查 mintOpen 和我是否已铸造，预览 mint(address)（如有邀请人则填其地址，否则填零地址），确认模拟干净后执行，并把交易哈希发给我。",
  en: "Mint one WoozCode Pass for me on BSC with my Binance Agentic Wallet (it is completely free). Follow the skill file at https://woozcode.fun/wooz-skill.md: check mintOpen and whether I already minted, preview mint(address) with my referrer address or the zero address, execute only if the simulation is clean, and send me the transaction hash.",
};
const CHECK = {
  zh: { bad: "地址格式不正确。", agent: "持有 Agent ID", noAgent: "未持有 Agent ID", minted: "已铸造", notMinted: "尚未铸造", invites: "成功邀请", fail: "读取失败，请稍后再试。" },
  en: { bad: "That does not look like a valid address.", agent: "holds an Agent ID", noAgent: "no Agent ID", minted: "already minted", notMinted: "not minted yet", invites: "successful invites", fail: "Read failed. Try again in a moment." },
};

function applyLang() {
  document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-zh]").forEach((el) => {
    el.textContent = LANG === "zh" ? el.dataset.zh : el.dataset.en;
  });
  const pe = document.getElementById("promptText");
  if (pe) pe.textContent = PROMPTS[LANG];
  const lb = document.getElementById("langBtn");
  if (lb) lb.textContent = LANG === "zh" ? "EN" : "中文";
}
function toggleLang() {
  LANG = LANG === "zh" ? "en" : "zh";
  localStorage.setItem("wz-lang", LANG);
  applyLang();
}

const fmt = (n) => n.toLocaleString("en-US");

async function refresh() {
  const s = await readStats();
  if (!s) return;
  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  set("ledMinted", fmt(s.minted));
  set("ledSupply", fmt(s.max));
  set("ledLeft", fmt(s.max - s.minted));
  const pill = document.getElementById("mintPill");
  if (pill) {
    if (s.minted >= s.max) {
      pill.className = "pill open";
      pill.textContent = LANG === "zh" ? "已售罄" : "SOLD OUT";
    } else if (s.open) {
      pill.className = "pill open";
      pill.textContent = LANG === "zh" ? "铸造开放中" : "MINT OPEN";
    } else {
      pill.className = "pill soon";
      pill.textContent = LANG === "zh" ? "即将开放" : "OPENING SOON";
    }
  }
}

async function checkWallet() {
  const inp = document.getElementById("walletInput");
  const out = document.getElementById("checkResult");
  const t = CHECK[LANG];
  const addr = (inp.value || "").trim();
  if (!/^0x[0-9a-fA-F]{40}$/.test(addr)) { out.textContent = t.bad; return; }
  out.textContent = "...";
  const w = await readWallet(addr);
  if (!w) { out.textContent = t.fail; return; }
  out.innerHTML = "";
  const parts = [
    w.hasAgentId ? t.agent : t.noAgent,
    w.minted > 0 ? t.minted : t.notMinted,
    fmt(w.invites) + " " + t.invites,
  ];
  out.innerHTML = parts.map((p) => "<b>" + p + "</b>").join(" · ");
}

function copyPrompt() {
  const btn = document.getElementById("copyBtn");
  navigator.clipboard.writeText(PROMPTS[LANG]).then(() => {
    const old = btn.textContent;
    btn.textContent = LANG === "zh" ? "已复制" : "Copied";
    setTimeout(() => (btn.textContent = old), 1600);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyLang();
  refresh();
  setInterval(refresh, 30000);
});
